// npm
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob")
const withCSS = require("@zeit/next-css")

module.exports = withCSS({
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (dev || isServer) return config
    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader?sourceMap",
      }),
    })
    config.plugins.push(
      new ExtractTextPlugin("[name].css?[hash]"),
      new PurgecssPlugin({
        paths: glob.sync("*(components|pages)/*"),
      }),
    )
    return config
  },
})
