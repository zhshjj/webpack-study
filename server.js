// express
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

const app = express()
const compiler = webpack(config)
app.use(WebpackDevMiddleware(compiler, 
	// {
	// 	publicPath: config.output.publicPath
	// }
))

app.get('/user', (req, res) => {
	res.json({
		name: 'tom'
	})
})  

app.listen(3000, () => {
	console.log('Example app listening on port 3000!\n')
})