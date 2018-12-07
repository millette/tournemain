// npm
const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const whitelistPatterns = () => [/^md-/]

module.exports = (phase) => {
  console.log("PHASE:", phase)
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withCSS()
  }
  return withCSS(withPurgeCss({ purgeCss: { whitelistPatterns } }))
}
