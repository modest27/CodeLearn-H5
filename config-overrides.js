const px2viewport = require('postcss-px-to-viewport')

const path = require('path')
const { override, addWebpackAlias, addPostcssPlugins } = require('customize-cra')

const webpackAlias = addWebpackAlias({
  '@': path.resolve(__dirname, 'src'),
  '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
})

const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375
  })
])

// 导出要进行覆盖的 webpack 配置
module.exports = override(webpackAlias, postcssPlugins)
