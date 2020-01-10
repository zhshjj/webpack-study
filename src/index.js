// import $ from 'jquery'
// window.$ 是 undefined 可以用expose-loader 暴露全局的 loader 即内联 loader 
// pre 前面执行的loader > normal 普通的loader  > 内联loader > postloader 后置loader
// console.log('jquery-----', $)

require('./index.css')
require('./index.less')

// babel 转换高级语法测试
// const fn = () => {
// 	console.log(111)
// }
// fn()

// // 装饰器
// @log
// class A {
// 	a = 22
// }

// let b = new A()

// console.log(b.a)

// function log(target) {
// 	console.log(target, 333)
// }

// 'aaa'.includes('a')

// webpack 打包我们的图片
// 1) 在 js 中创建图片来引入
import bg from './imgs/bg.jpg' // 返回的是一个新的图片地址
let image = new Image()
image.src = bg
document.body.appendChild(image)
// 2) 在 css 文件中引入 background: url(); 使用 file-loader
import './index.css'
// 3) 使用 <img src=""/> 标签

// 跨域
var xhr = new XMLHttpRequest()
xhr.open('GET', '/user', true)
xhr.onload = () => {
	console.log('xhr----------', xhr.response)
}
xhr.send()

if (DEV) {
	console.log('dev-------')
}