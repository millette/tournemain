"use strict"

// self
const srv = require(".")
// pretend we're a db
// const pages = require("./pages.json")

// const port = 3000
// const hostname = process.env.HOSTNAME
// const logger = true

// srv(pages, { port, hostname, logger }).catch(console.error)

srv({
  config: {
    trustProxy: "127.0.0.1",
    logger: true,
    port: 3000,
    hostname: process.env.HOSTNAME,
  },
  docs: require("./out-pretty.json"),
}).catch(console.error)
