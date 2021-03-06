// npm
const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const { PHASE_PRODUCTION_BUILD } = require("next/constants")

// const whitelistPatterns = () => [/^md-/, /^public-Draft/, /^DraftEditor-/]

module.exports = (phase) => {
  return phase === PHASE_PRODUCTION_BUILD
    ? // ? withCSS(withPurgeCss({ purgeCss: { whitelistPatterns } }))
      withCSS(withPurgeCss())
    : withCSS()
}
