"use strict"

// self
const srv = require(".")
// pretend we're a db
const pages = require("./pages.json")

const port = 3000
const hostname = process.env.HOSTNAME
const logger = true

srv(pages, { port, hostname, logger }).catch(console.error)
