// npm
const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const { PHASE_PRODUCTION_SERVER } = require("next/constants")

const whitelistPatterns = () => [/^md-/]

module.exports = (phase) => {
  return phase === PHASE_PRODUCTION_SERVER
    ? withCSS(withPurgeCss({ purgeCss: { whitelistPatterns } }))
    : withCSS()
}
