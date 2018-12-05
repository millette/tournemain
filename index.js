"use strict"

// npm
const fastify = require("fastify")()
const abstractCache = require("abstract-cache")
const fastifyCaching = require("fastify-caching")

// core
const { writeFileSync } = require("fs")

const dev = process.env.NODE_ENV !== "production"

// pretend we're a db
const pages = require("./pages.json")

let dirty = false
setInterval(() => {
  if (!dirty) return
  const json = JSON.stringify(pages)
  writeFileSync("pages.json", json)
  dirty = false
}, 1 * 60 * 1000)

const TTL = dev ? 30 : 86400000 * 30
const cacheOptions = { driver: { options: {} } }
if (dev) cacheOptions.driver.options.maxItems = 10
const cache = abstractCache(cacheOptions)
fastify.register(require("fastify-response-time"))
fastify.register(fastifyCaching, {
  expiresIn: TTL,
  privacy: fastifyCaching.privacy.PUBLIC,
  cache,
})

const getPromise = (key) =>
  new Promise((resolve, reject) =>
    fastify.cache.get(key, (err, cached) =>
      err ? reject(err) : resolve(cached),
    ),
  )

const setPromise = (key, html) =>
  new Promise((resolve, reject) => {
    const date = new Date().toUTCString()
    const etag = `"${key.replace(/[^a-z0-9]/g, "")}${html.length}"`
    const obj = { html, date, etag }
    fastify.cache.set(key, obj, TTL, (err) =>
      err ? reject(err) : resolve(obj),
    )
  })

const cacheSend = async (app, req, reply, opts, path) => {
  const cached = await getPromise(req.url)
  if (cached && cached.item && cached.item.html) {
    reply.etag(cached.item.etag).type("text/html")
    return cached.item.html
  }

  const html = await app.renderToHTML(req, reply.res, path || req.url, opts)
  const { etag, date } = await setPromise(req.url, html)
  reply
    .etag(etag)
    .type("text/html")
    .header("x-backend", process.env.HOSTNAME)
  return html
}

fastify.get("/api/page/:page", async (req, reply) => {
  if (!pages[req.params.page]) {
    reply.code(404)
    throw new Error("API: Niet")
  }
  reply.etag()
  return pages[req.params.page]
})

fastify.put("/api/page/:page", async (req, reply) => {
  if (!pages[req.params.page]) {
    reply.code(404)
    throw new Error("API#put: Niet")
  }
  pages[req.params.page].content = req.body.html
  dirty = true
  return { ok: true, page: req.params.page }
})

fastify.get("/favicon.ico", async (req, reply) => {
  reply.code(404)
  throw new Error("Niet")
})

const addCoreRoutes = (reserverd) =>
  reserverd.forEach((p) => fastify.next(`/${p}`))

// from the database
const unknownPage = (p) => !pages[p]

fastify.register(require("fastify-react"), { dev }).after(() => {
  // hardcoded, could be read from /pages/*.js or nextjs' API (tbd)
  addCoreRoutes(["other", "about", "contact"])
  fastify.next(
    "/:page",
    async (app, { req, query, params: { page } }, reply) => {
      if (unknownPage(page)) return app.render404(req, reply.res)
      return cacheSend(app, req, reply, { ...query, page }, "/page")
    },
  )
})

fastify
  .listen(3000, process.env.HOSTNAME)
  .then((address) => console.log("Server listening on", address))
  .catch(console.error)
