"use strict"

// npm
const fastify = require("fastify")()

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

fastify.register(require("fastify-response-time"))

fastify.get("/api/page/:page", async (req, reply) => {
  if (!pages[req.params.page]) {
    reply.code(404)
    throw new Error("API: Niet")
  }
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
      const html = await app.renderToHTML(
        req,
        reply.res,
        "/page",
        page ? { ...query, page } : {},
      )
      reply.type("text/html")
      return html
    },
  )
})

fastify
  .listen(3000, process.env.HOSTNAME)
  .then((address) => console.log("Server listening on", address))
  .catch(console.error)
