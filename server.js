"use strict"

// self
const srv = require(".")
// pretend we're a db
const pages = require("./pages.json")

srv(pages, { port: 3000, hostname: process.env.HOSTNAME, logger: true }).catch(
  console.error,
)

/*
// npm
const fastify = require("fastify")({ logger: true, pluginTimeout: 60000 })
const abstractCache = require("abstract-cache")
const fastifyCaching = require("fastify-caching")
const nodeFetch = require("node-fetch")

// core
// const { writeFileSync } = require("fs")

const dev = process.env.NODE_ENV !== "production"
*/

// pretend we're a db
// const pages = require("./pages.json")
/*
let pages
try {
  pages = require("/tmp/pages.json")
} catch (e) {
  pages = require("./pages.json")
}
*/

/*
let dirty = false
setInterval(() => {
  if (!dirty) return
  const json = JSON.stringify(pages)
  writeFileSync("/tmp/pages.json", json)
  dirty = false
}, 1 * 60 * 1000)
*/

/*
const TTL = dev ? 30 : 86400000 * 30
const cacheOptions = { driver: { options: {} } }
if (dev) cacheOptions.driver.options.maxItems = 10
const cache = abstractCache(cacheOptions)
fastify.register(require("fastify-response-time"))
fastify.register(fastifyCaching, {
  // expiresIn: TTL,
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
    reply
      // .etag(cached.item.etag)
      .header("x-ss-cache", "hit")
      .type("text/html")
    return cached.item.html
  }

  const html = await app.renderToHTML(req, reply.res, path || req.url, opts)
  const { etag, date } = await setPromise(req.url, html)
  reply
    // .etag(etag)
    .header("x-ss-cache", "miss")
    .type("text/html")
  if (process.env.HOSTNAME) reply.header("x-backend", process.env.HOSTNAME)
  return html
}

fastify.get("/api/page/:page", async (req, reply) => {
  if (!pages[req.params.page]) {
    reply.code(404)
    throw new Error("API: Niet")
  }

  // reply.header("Vary", "Accept-Encoding")
  // .etag()
  return pages[req.params.page]
})
*/

/*
fastify.put("/api/page/:page", async (req, reply) => {
  const page = req.params.page
  if (!pages[page]) pages[page] = { title: "Titre à venir" }
  pages[page].content = req.body.html
  dirty = true
  // TODO: delete api etag
  const cached = await getPromise(`/${page}`)

  if (cached && cached.item) {
    if (cached.item.etag)
      fastify.cache.delete(
        { id: cached.item.etag, segment: "fastify-caching" },
        (err) => err && console.error("DELETE-err#2:", err),
      )

    fastify.cache.delete(
      `/${page}`,
      (err) => err && console.error("DELETE-err#1:", err),
    )
  }

  return { ok: true, page }
})
*/

/*
fastify.get("/favicon.ico", async (req, reply) => {
  reply.code(404)
  throw new Error("Niet favicon")
})

const addCoreRoutes = (reserved) =>
  reserved.forEach((p) =>
    fastify.next(`/${p}`, async (app, { req }, reply) =>
      cacheSend(app, req, reply),
    ),
  )

// from the database
const unknownPage = (p) => !pages[p]

const coreRoutes = ["other", "about", "contact"]

fastify.register(require("fastify-react"), { dev }).after((err, f, next) => {
  if (err) return next(err)
  addCoreRoutes(coreRoutes)
  f.next("/:page", async (app, { req, query, params: { page } }, reply) => {
    if (unknownPage(page)) return app.render404(req, reply.res)
    return cacheSend(app, req, reply, { ...query, page }, "/page")
  })
  next()
})

fastify
  .listen(3000, process.env.HOSTNAME)
  .then((address) =>
    Promise.all([
      ...[...Object.keys(pages), ...coreRoutes].map((p) =>
        nodeFetch(`${address}/${p}`),
      ),
      address,
    ]),
  )
  .then((stuff) => {
    const address = stuff.pop()
    fastify.log.info(`Pre-heated ${stuff.length} pages`)
    fastify.log.info(`Server listening on ${address}`)
    return address
  })
  .catch(console.error)
*/
