const px2viewport = require('postcss-px-to-viewport')

const path = require('path')
const { override, addWebpackAlias, addPostcssPlugins, addWebpackExternals } = require('customize-cra')

const webpackAlias = addWebpackAlias({
  '@': path.resolve(__dirname, 'src'),
  '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
})

const postcssPlugins = addPostcssPlugins([
  px2viewport({
    viewportWidth: 375
  })
])

// 配置cdn加速
const obj =
  process.env.NODE_ENV === 'production'
    ? {
        react: 'React',
        'react-dom': 'ReactDom'
      }
    : {}
const externals = addWebpackExternals(obj)

// 导出要进行覆盖的 webpack 配置
module.exports = override(externals, webpackAlias, postcssPlugins)
