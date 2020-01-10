// webpack 是 node 写出来的
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离 css 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {		
	// mode: 'development', // 模式有两种： development production
	entry: './src/index.js', // 入口
	output: {
		filename: 'bundle.[hash:8].js', // 打包后的文件名
		path: path.resolve(__dirname, 'dist'), // 绝对路径
		// publicPath: 'http://localhost:8080'
	},
	plugins: [ // 存放所有的 webpack 插件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',			
			// minify: {
			// 	removeAttributeQuotes: true,
			// 	collapseWhitespace: true,
			// },
			// hash: true
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new CleanWebpackPlugin(), // 不传参时默认删除的就是 output.path 
		// new CopyWebpackPlugin([
		// 	{
		// 		from: './src/copy.js',
		// 		to: '', // 默认是 output.path
		// 		ignore: ['./node_modules/'], 
		// 	}
		// ]),
		new webpack.DefinePlugin({
			DEV: JSON.stringify(true) 
		}),
		// 这里会忽略 moment 引入的 locale 文件，可以在需要的地方单独引入（import 'moment/locale/zh-cn'）
		new webpack.IgnorePlugin(/\.\/locale/, /moment/), 
	],
	// 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置 externals
	externals: {
		jquery: '$'
	},	 
	// 监听文件变化，当它们修改后会重新编译, webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启
	// watch: true,
	// watchOptions: { 
	// 	poll: 1000, // 每秒询问1次
	// 	aggregateTimeout: 100, // 防抖
	// 	ignored: /node_modules/, // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用。这个选项可以排除一些巨大的文件夹
	// },
	// 解析第三方包 common
	resolve: {
		// Tell webpack what directories should be searched when resolving modules
		modules: [path.resolve('node_modules')],
		// 别名
		alias: {  },
		// Attempt to resolve these extensions in order.
		extensions: ['.wasm', '.mjs', '.js', '.json'],
		plugins: []
	},
	module: { 
		noParse: /jQuery/, // 不去解析 jquery 中的依赖项
		// loader 的执行顺序是从右往左，从下往上
		// loader 的特点：单一
		rules: [
			{
		        test: /\.(htm|html)$/i,
		        loader: 'html-withimg-loader'
		    },
		    // 做一个限制 当图片小于多少K的时候用 base64 来转化
		    // 否则用 file-loader 产生真实的图片
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						minetype: 'image/png',
						outputPath: 'imgs/'
					}
				}
			},
			{
				test: require.resolve('jquery'),
				use: [
					{
						loader: 'expose-loader',
						options: '$'
					},
					{
						loader: 'expose-loader',
						options: 'jQuery'
					}
				]
			},
			// {
			// 	test: /\.js|jsx$/,
			// 	use: {
			// 		loader: 'eslint-loader',
			// 		options: {
			// 			enforce: 'pre', // previous 放在 normal loader 之前执行，对应的有 post 放在后面执行 
			// 		}					
			// 	}
			// },
			{
				test: /\.js|jsx$/, // normal 普通的 loader
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
						    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器转化
						    ["@babel/plugin-proposal-class-properties", { "loose" : true }], // class 语法转化
						    "@babel/plugin-transform-runtime"
						]	
					},	

				},
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/ 	
			},
			// 规则 css-loader 接续 @import 这种语法的
			// style-loader 它是把 css 插入到 head 的标签中			
			{
				test: /\.css$/,
				use: [
					// {
					// 	loader: 'style-loader',
					// 	options: {
					// 		// insert: 'head'
					// 	}
					// }, 
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader', // 自动添加前缀
				]
			},
			// 可以处理 less 文件 sass stylus node-sass sass-loader
			// stylus stylus-loader
			{
				test: /\.less$/,
				use: [
					// {
					// 	loader: 'style-loader',
					// 	options: {
					// 		// insert: 'head'
					// 	}
					// }, 
					MiniCssExtractPlugin.loader,
					'css-loader', // @import 解析路径
					'postcss-loader',
					'less-loader' // 把 less 解析成 css
				]
			}
		]
	}
}