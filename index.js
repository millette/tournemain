// use strict
const fastify = require('fastify')()

const dev = process.env.NODE_ENV !== 'production'

fastify
  .register(require('fastify-react'), { dev })
  .after(() => {
    fastify.next('/')
  })

fastify.listen(3000, process.env.HOSTNAME)
  .then((address) => console.log('Server listening on', address))
  .catch(console.error)
