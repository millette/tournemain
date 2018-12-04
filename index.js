// use strict
const fastify = require('fastify')()

const dev = process.env.NODE_ENV !== 'production'

fastify.get('/favicon.ico', async (req, reply) => {
  reply.code(404)
  throw new Error('Niet')
})

const addCoreRoutes = (reserverd) => reserverd.forEach((p) => fastify.next(`/${p}`))

// from the database
const unknownPage = (p) => (['', 'page-2', 'page-3']).indexOf(p) === -1

fastify
  .register(require('fastify-react'), { dev })
  .after(() => {
    // hardcoded, could be read from /pages/*.js or nextjs' API (tbd)
    addCoreRoutes(['other', 'about', 'contact'])
    fastify.next('/:page', async (app, { req, query, params: { page } }, reply) => {
      if (unknownPage(page)) return app.render404(req, reply.res)
      const html = await app.renderToHTML(req, reply.res, '/page', page ? { ...query, page } : {})
      reply.type('text/html')
      return html
    })
  })

fastify.listen(3000, process.env.HOSTNAME)
  .then((address) => console.log('Server listening on', address))
  .catch(console.error)
