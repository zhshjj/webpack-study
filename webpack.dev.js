const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = smart(base, {
	mode: 'development',
	devServer: { // 开发服务器的配置
		// port: 3000,		
		// open: true, // 直接打开浏览器
		// progress: true,
		// contentBase: './build',
		// compress: true,
		// hot: true,
		// 解决跨域
		// 1) 配置代理
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:3000',
		// 		pathRewrite: { '/api': '' }, // 重写的方式把请求代理到 express 服务器上
		// 	} 
		// }
		// 2) 前端模拟数据
		// before(app) {
		// 	app.get('/user', (req, res) => {
		// 		res.json({
		// 			name: 'tom'
		// 		})
		// 	})
		// }
		// 3) 在服务端启动 webpack，端口使用服务端端口
		// contentBase: './dist',
	},
	// devtool 类型及作用
	// 1) 源码映射，会单独生成一个 sourcemap 文件，出错了会标识出错的列和行，方便调试代码
	// devtool: 'source-map', 
	// 2) 不会产生单独的文件，但是可以显示行和列
	// devtool: 'eval-source-map',
	// 3) 产生一个映射文件，不会产生列
	// devtool: 'cheap-module-source-map', 
	// 4) 不会产生文件，集成在打包后的文件中，不会产生列
	devtool: 'cheap-module-eval-source-map',
})