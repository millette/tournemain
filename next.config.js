// npm
const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
// const withBundleAnalyzer = require("@zeit/next-bundle-analyzer")
const { PHASE_PRODUCTION_SERVER } = require("next/constants")

const whitelistPatterns = () => [/^md-/]

module.exports = (phase) => {
  return phase === PHASE_PRODUCTION_SERVER
    ? withCSS(withPurgeCss({ purgeCss: { whitelistPatterns } }))
    : withCSS()
  /*
  const nextConfig = {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: '../bundles/server.html'
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: '../bundles/client.html'
        }
      },
      webpack: (config) => config

    }
    return withBundleAnalyzer(nextConfig)
  */
}
