const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin') // 现在可以用 ‘terser-webpack-plugin’ 插件代替
// const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css，这里回影响到 js 的压缩，所以要使用下面的插件

module.exports = smart(base, {
	mode: 'production',
	// 优化项（压缩成一行）
	optimization: {
		minimizer: [
			new UglifyjsWebpackPlugin({
				cache: true, // 是否使用缓存
				parallel: true, // 压缩多个
				sourceMap: true, // es6 -> es5 的时候可以源码映射，更好的调试
			}),
			// new TerserJSPlugin({}), 
			new OptimizeCSSAssetsPlugin()
		],
		// 分割代码块
		splitChunks: {
			cacheGroups: {
				// 多页面打包时抽离自己写的公共模块
				common: {
					chunks: 'initial',
					minSize: 0, // 文件的大小
					minChunks: 2, // 使用的次数
				}
			},
			// 抽离第三方插件
			// vendor: {
			// 	priority: 1,
			// 	test: /node_modules/, // 抽离出来
			// 	chunks: 'initial',
			// 	minSize: 1,
			// 	minChunks: 2,
			// }
		}			
	}
})