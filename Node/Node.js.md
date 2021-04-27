# Node.js

## 1.Node.js介绍

### 1.1. Node.js是什么

​		Node.js是一个JavaScript运行时环境，简单点讲就是可以解析和之星JavaScript代码

​		Node.js中没有BOM和DOM，干服务端的活，例如文件读写、网络服务的构建、网络通信、http服务器...  

​		事件驱动、非阻塞IO模型（异步）、轻量高效

### 1.2. Node.js能做什么

​		Web服务器后台

​		命令行工具（前端开发接触最多）

​		...

### 1.3. 一些资源

​		《深入浅出Node.js》

​		...

### 1.4. 学到什么

​		B/S编程模型（Browser - Server）

​		模块化编程

​		Node常用API

​		异步编程

​		Express开发框架

​		ES6

​		...

## 2. 起步

### 2.1. hello world

### 2.2. 读取文件

fs是file-system的简写，文件系统

在Node中要进行文件操作，必须引入fs核心模块

1.使用require方法加载fs核心模块

var fd = require('fs')

2.读取文件

```javascript
fs.readFile('/data/hello.txt', function (error, data) {
		console.log(data.toString())
})
```

第一个参数是要读取文件的路径

第二个参数是一个回调函数

成功

data 二进制数据		error null

失败

data undefined		error 错误对象

### 2.3. 写文件

```javascript
var fs = require('fs')
	fs.writeFile('./data/hello.txt', 'hello 大家好', function (error){
		console.log('文件写入成功')
})
```

### 2.4. http

服务器要干嘛

提供服务：对数据的服务

发送请求、接收请求、处理请求、给予反馈（发送响应）

当客户端请求过来，就会自动触发服务器的request请求时间，然后执行第二个参数；回调处理

```javascript
var http = require('http')
var server = http.createServer()
server.on('request', function(){
    console.log('收到客户端请求了')
})
server.listen(3000, function(){
    console.log('http://127.0.0.1:3000可以访问了')
})
```

```javascript
server.listen(3000, function(){
    console.log('http://127.0.0.1:3000可以访问了')
})
//根据内容响应
server.on('request', function(req, res){
    var products = [
        {
            name: '苹果 x'，
            price: '8888'
        },
        {
            name: '香蕉 x',
            price: '5000'
        }
    ]
    if(req.url === '/'){
        res.end('index page') //
    }else if(req.url === 'login'){
        res.end('login page')
    }else if(req.url === '/products'){
        res.end(JSON.stringify(products)) //或者JSON.prase()
    }else {
        res.end('<p>404 Not Found</p>')
    }
})
```

中文字符乱码解决方法

```javascript
res.setHeader('Content-Type','text/plain; charset=utf-8') //优先发送，text/plain 普通文本，如果是html字符串，则用 text/html，图片不需要设定编码
//Content-Type, http://tool.oschina.net/commons
```



## 3. Node中的js

### 3.1. EcmaScript

没有DOM，BOM

### 3.2. 核心模块

Node为JavaScript提供了很多服务器级别的API，这些API绝大多数都被包装到一个具体的核心模块中，例如文件操作系统的`fs`核心模块，http服务构建的`http`模块，`path`路径操作模块，`os`操作系统模块...

### 	3.3. 模块化编程

```javascript
require('./b.js') //调用b.js，但是这无法使两个模块进行交互
```

Node中没有全局作用域，只有模块作用域

每个文件模块中都提供了一个空对象： exports ，类似于返回对象

```javascript
//a.js
var result = require('./b,js')
console.log(ret) //输出对象{foo: 'aaa'}

//b.js
var foo = 'aaa'
exports.foo = foo

//接口问题
//导出多个
exports.foo = 'hello'
exports.add = function add (x, y) {}
//or
module.exports = {
    str: 'hello'
    add: function () {		}
}
//其他文件访问
var bExports = require('./b.js') //bExports {foo: 'hello', add: [Function: add]}

//非挂载，直接导出，只能导出一个
module.exports = 'hello'
var bExports = require('./b.js') //bExports hello
```

### 3.4. ip地址和端口号

```javascript
//此处的res为server.on('resuest', function(req, res){})
//可通过局域网进行访问建立的网站
res.soket.remoteAddress //发送请求的客户端的ip地址
res.soket.remotePort //端口号
```

端口号是0 ~ 65536，部分默认端口不要占用，例如http的端口80

### 3.5 服务端与文件读取结合，初步

```javascript
server.listen(3000, function(){
    console.log('http://127.0.0.1:3000可以访问了')
})
//根据内容响应
server.on('request', function(req, res){
    if(req.url === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍后再试')
            }else {
                res.setHeader('content-Type', 'text/html; charset=utf-8')
                res.end(data) //动态读取，直接修改html文件就可以修改显示内容
            }
        })
    }else {
        res.end('<p>404 Not Found</p>')
    }
})
```

### 3.6. 代码规范

​		缩进2空格

```javascript
var foo = 'hello' //用单引号
function add (x, y) {} //空格
//使用全等号
```

## 4. 初步实现Apache功能

```javascript
var http = require('http')
var fs = require('fs')
var server = http.createServer()

server.on('request', function (req, res) {
  var url = req.url
  var www = 'E:/vscode/nodejs/02/番茄数据库'

  if (url === '/' || url === '/index/') {
    fs.readFile(www + '/index/index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        return res.end('<p style="font-size: 50px;"> 404 Not Found</p>')
      } else {
        res.end(data)
      }
    })
  } else {
    fs.readFile(www + url, function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        return res.end('<p style="font-size: 50px;"> 404 Not Found</p>')//return结束
      } else {
        res.end(data)
      }
    })
   }
})

server.listen(8080, function () {
  console.log('http://192.168.24.1:8080')
})
```

```javascript
fs.readdir('./', function (err, files) {}) //读取目录
//反引号内的字符串（html内）自动换行
```

## 5. Node中的模板引擎

```shell
npm install art-template
```

```javascript
var template = require('atr-template')
vat ret = template.render('hello {{name}}', {
    name: 'jack'
})
```

### 5.1. eg: 服务端渲染01.js && 服务端渲染.html

带有外链属性的src和link的href服务端会自动发送请求

在进行网站开发的时候要设置一个公共目录，里面放静态资源，eg: `/public/` ，当网页发送请求静态资源的时候`indexOf()`判断url路径开头是否是 `/public/` ，如果是直接打开用 `.`号拼接上url路径请求资源

下方为错误实例，会导致隐私信息泄露

```javascript
var template = require('art-template')
var fs = require('fs')

fs.readdir('E:/vscode/', function (err, files) {
  if (err) {
    console.log('读取目录失败')
  } else {
    fs.readFile('E:/VScode/nodejs/02/客户端渲染.html', function (err, data) {
      if (err) {
        console.log('读取文件失败')
      } else {
        var htmlStr = template.render(data.toString(), {
          files: files
        })
        console.log(htmlStr)
      }
    })
  }
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    {{ each files }}
    <p>{{ $value }}</p>
    {{ /each }}
</body>
</html>
```

### 5.2. 服务端渲染与客户端渲染的区别

​		服务端渲染：

​								说白了就是在服务端使用模板渲染

​								可以被爬虫爬取

​		客户端渲染：

​								客户端渲染不利于SEO搜索引擎优化

​								客户端异步渲染很难被爬虫抓取

​								网站都是两者结合来做

​		eg： 京东的商品列表采用服务端渲染，目的是为了SEO搜索引擎优化，而商品评论列表为了用户体验，也不需要SEO优化，采用客户端渲染

### 5.3. 处理网站中的静态资源

带有外链属性的src和link的href服务端会自动发送请求

在进行网站开发的时候要设置一个公共目录，里面放静态资源，eg: `/public/` ，当网页发送请求静态资源的时候`indexOf()`判断url路径开头是否是 `/public/` ，如果是直接打开用 `.`号拼接上url路径请求资源

```javascript
var template = require('art-template')
var fs = require('fs')
var http = require('http')

http
	.creatSever(function (req, res) {
    var url = req.url
    if (url === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }else {
                res.end(data)
            }
        })
    } else if (url.indexOf('/public/') === 0) {
        fs.readFile('.' + url, function (err, data) {
            if (err) {
                return res.end('404 Not Found')
            }else {
                res.end(data)
            }
        })
    }
})
	.listen(8080, function () {
    console.log('http://192.168.24.1:8080')
})
```

## 6. 留言簿

### 6.1. 处理表单get请求

在表单提交(`get`请求)中，路径后面会跟一串查找字符串，会影响到路径判断

模块`url`中，有专门处理请求路径的函数 `url.parse()`

```javascript
var url = require('url')

var pathResult = url.parse('https://www.bilibili.com/video/index.html?p=32&spm_id_from=pageDriver', true) // 加上参数 true 可以使 query 转换成对象
console.log(pathResult)

// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: null,
//     host: 'www.bilibili.com',
//     port: null,
//     hostname: 'www.bilibili.com',
//     hash: null,
//     search: '?p=32&spm_id_from=pageDriver',
//     query: [Object: null prototype] { p: '32', spm_id_from: 'pageDriver' },
//     pathname: '/video/index.html',
//     path: '/video/index.html?p=32&spm_id_from=pageDriver',
//     href: 'https://www.bilibili.com/video/index.html?p=32&spm_id_from=pageDriver'
//   }
```

### 6.2. 表单重定向

在发表评论界面提交表单后，将数据重定向（`302`临时重定向）到首页

```javascript
res.statusCode = 302 //临时重定向
res.setHeader('Location', '/') //在响应头中通过Location告诉客户端往哪重定向
res.end()
```

eg:  留言簿code

```javascript
//./app.js
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var contents = [{
        content: 'world'
    },
    {
        content: 'mmm'
    }
]
http
    .createServer(function (req, res) {
        var parseObj = url.parse(req.url, true)
        var pathUrl = parseObj.pathname

        if (pathUrl === '/') {
            fs.readFile('./index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                } else {
                    res.end(template.render(data.toString(), {
                        contents: contents
                    }))
                }
            })
        } else if (pathUrl.indexOf('/public/') === 0) {
            fs.readFile('.' + pathUrl, function (err, data) {
                if (err) {
                    return res.end('404')
                } else {
                    res.end(data)
                }
            })
        } else if (pathUrl === '/pinlun') {
            var content = parseObj.query

            contents.push(content)
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        } else {
            return res.end('404 Not Found.')
        }
    })
    .listen(8080, function () {
        console.log('http://127.0.0.1:8080')
    })
```

```html
<!-- ./index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p style="font-size: 50px;">hello <a href="/public/write.html">写评论</a></p>

    {{each contents}}
    <p>{{$value.content}}</p>
    {{/each}}
</body>
</html>
```

```html
<!-- ./public/write.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form action="/pinlun" method="GET">
        <div>
            <input type="text" name="content" required style="width: 200px;height: 50px;">
        </div>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```

## 7. 第三方包

### 7.1. `require`加载规则

优先从缓存加载

```javascript
//main.js
require('./a.js')
var fn = require('./b.js') //在b.js中已经加载过了，不会再次读取文件加载，直接从缓存中加载，获取接口,这样做是为了提高加载效率
console.log(fn)

//a.js
console.log('a.js被加载了')
var fn = require('./b.js')
console.log(fn)

//b.js
console.log('b.js被加载了')
module.exports = function add (x,y) {}

//输出
//a.js被加载了
//b.js被加载了
//[Function]
//[Function]
```

### 7.2.` package.json`

npm	node package manger

是安装的package的说明，在`npm`下载的时候加`--save`自动生成，或者命令行界面`npm init`会有向导引导创建，在删除了package后可以直接通过`npm install`安装package,最好是在项目录的根目录下安装依赖包

### 7.3. npm 常用命令

```shell
npm init
npm init -y //跳过向导，快速生成
npm --help
npm 命令 --help //查看指定命令的帮助
npm --version
npm install
npm install package //简写 npm i package
npm install --save package //简写 npm i -S package
npm uninstall package //删除包，但是包的依赖项会保留
npm uninstall --save package //同时删除依赖项，简写 npm un -S package
```

### 7.4. 解决npm被墙问题

npm 存储包文件的服务器在国外，有时候会被墙，淘宝的开发团队把npm在国内做了一个镜像（http://npm.taobao.org/）

如果要使用需要安装淘宝的`cnpm`:

```shell
npm install --global cnpm #任意目录下运行
```

命令行界面用`cnpm`代替`npm`，如果不想cnpm又想使用淘宝的服务器来下载：

```shell
npm install jquery --registry=https://registry.npm.taobao.org
#or 把其加入到配置文件中
npm config set registry https://registry.npm.taobao.org
npm config list //查看配置
```

### 7.5. `package.json` & `package-lock.json`

npm 5+ 的版本不需要加 `--save`，自动保存

`package-lock.json`里面有全部第三方包的依赖信息（包括依赖包的依赖包），还可以用来锁定版本号，当`npm install`的时候只有`package.json`，下载的依赖包会自动更新到最新版，有`package-lock.json`就可以锁住版本，不会自动更新

## 8. Express

### 8.1. Express 基本使用

开放静态资源目录，可以直接通过 /public/xxx 的方式访问 public 目录下的所有资源

```javascript
app.use('/public/', express.static('./public/')) //127.0.0.1:8080/public/index.html
app.use('/files/', express.static('./public/')) //127.0.0.1:8080/files/index.html
app.use(express.static('./public')) //127.0.0.1:8080/index.html 省略了url标识符

app.use('/static/', express.static(path.join(__dirname, 'public'))) 
```

express 可以 和 art-template 结合使用，更方便。[art-tempalte 文档 ](https://aui.github.io/art-template/express/)

安装

```shell
npm i -S art-template express-art-template #两个第三方包
```

配置

```javascript
var express = require('express')
var app = express()
app.engine('html', require('express-atr-template')) //设定渲染html文件，可修改
//add.set('views', 'public') //将默认渲染文件路径从views目录改为public目录
```

使用

```javascript
app.get('/', function (req, res) {
    res.render('404.html', {
        title: '文件'
    })
})
//直接渲染文件，无需读取；实际上是./views/404.html

//express 重定向
res.redirect('/')
```



在使用`res.end()`时用`res.send()`代替

### 8.2. hello world

```shell
npm i -S express
```

```javascript
var express = require('express')

var app = express() //创建服务器应用程序，相当于http.creatServer
app.get('/', function (req, res) {
    res.send('hello world')
}) //服务器收到 get 请求 '/' 的时候，执行回调函数

app.get('/about', function (req, res) {
    res.send('about us')
}) 

app.listen(8080, function () {
    console.log('app is running at port 8080.')
}) //相当于server.listen
```

### 8.3. express 处理post请求

express 没有直接处理post请求体的功能，需要安装第三方插件`body-parser` [body-parser 官方文档](https://www.expressjs.com.cn/resources/middleware/body-parser.html)

安装

```shell
npm i -S body-parser
```

配置

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false })) //这两行直接加
app.use(bodyParser.json())
```

使用

```javascript
app.post('/' , (req , res)=>{
	res.send(req.bofdy)
})
```

### 8.4. express 重写留言簿（post）

```java
// ./app.js
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var contents = [{
        content: 'hello world'
    },
    {
        content: 'niuniuniu'
    }
]

app.get('/', (req, res) => {
    res.render('index.html', {
        contents: contents
    })
})

app.get('/pinlun', function (req, res) {
    var content = req.query
    contents.push(content)
    res.redirect('/')
})

app.get('/write.html', (req, res) => {
    res.render('write.html')
})

app.post('/pinlun', (req, res) => { //接收post请求
    var content = req.body
    contents.push(content)
    res.redirect('/')
})

app.listen(8080, function () {
    console.log('http://127.0.0.1:8080')
})
```

```html
<!-- ./views/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p style="font-size: 50px;">hello <a href="write.html">写评论</a></p>

    {{each contents}}
    <p class="cont">{{$value.content}}</p>
    {{/each}}
</body>
</html>html
```

```html
<!-- ./views/write.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    GET:
    <form action="/pinlun" method="GET">
        <div>
            <input type="text" name="content" required>
        </div>
        <input type="submit" value="提交">
    </form>
    <br>
    POST:
    <form action="/pinlun" method="POST">
        <div>
            <input type="text" name="content" required>
        </div>
        <input type="submit" value="提交">
    </form>
</body>
</html>
```

### 8.5. Session

#### 8.5.1. 基本使用

类似于Cookie，但是是保存在服务端。服务器一旦重启会丢失，还需要进一步处理进行持久化。

需要配置中间件`express-session`

安装：

```shell
npm i express-session
```

配置：

```javascript
var session = require('express-session')
app.use(seesion({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
})) //在app.use(router)之前
```

配置好这个中间件后，可以通过`req.session`来访问和设置Session成员

```javascript
//添加session数据
req.session.foo = 'bar'
//访问session数据
req.session.foo
```

#### 8.5.2. session 配合 md5 加密

```js
app.use(seesion({
    secret: 'keyboard', //此处配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密，增加安全性
    resave: false,
    saveUninitialized: true //无论是否使用session，默认分配一把钥匙，可以为 false
})
```



## 9. crud 增删改查

### 9.1. 创建路由 router.js

```javascript
//app.js
var router = require('./router.js')
//先配置其他配置信息，最后再挂载路由
app.use(router)
```

```javascript
//router.js
//需要什么模块还是要加载什么模块,express是必须要的
var router = express.Router()
...
module.exports = router
```

### 9.2. crud实现

[crud代码实现(github)](https://github.com/lunyiy/Web/tree/main/Node/file_crud)

下载到本地后直接运行 `main.js` ，node_modules 文件夹需要自己下载 `pip install`,`package.json`文件中有依赖包记录

## 10. MongoDB

### 10.1. 下载 & 安装

[MongoBD下载地址](https://www.mongodb.com/try/download/community)

直接安装，修改安装位置后，默认就行

```shell
mongod --dbpath "G:\data\db" #修改数据库路径，虽然我没成功。。。
```

### 10.2. 连接和退出数据库

连接：

```shell
mongo #连接本机数据库
#成功后可在http://127.0.0.1:27017查看
```

退出：

```shell
exit #退出连接
```

### 10.3. 基本命令

基本命令：

```shell
#查看显示所有数据库
show dbs
#查看当前操作的数据库
db
#切换到指定的数据（如果没有则会创建）
use 数据库名称
#给students集合插入数据
db.students.insertOne({"name": "jack"})
#显示所有集合
show collections
#查询集合内所有的信息
db.students.find()

```

### 10.4. 在Node中操作MongoDB数据

#### 10.4.1. mongoose

[mongoose 5 中文文档](http://www.mongoosejs.net/docs/index.html)

安装：

```shell
npm i mongoose
```

hello world：

```javascript
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true})

mongoose.Promise = global.Promise

//创建模型
var Cat = mongoose.model('Cat', {name: String})

// 实例
var kitty = new Cat({name: 'miaomiao1'})

//保存,可以去Mongo数据库查找
kitty.save(function (err) {
    if (err) {
        return console.log(err)
    } else {
        console.log('miao')
    }
})
```

#### 10.4.2. 官方指南

personal [mongoose 官方指南](https://github.com/lunyiy/Web/tree/main/Node/mongoDB_crud)

连接数据库：

```javascript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true})

```

设计文档结构：

```javascript
//设计集合结构
var userScheam = new Schema ({
    name: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    content: String
})

```

创建方法：

```javascript
//methods
//得在创建model之前创建方法
userScheam.methods.speak = function () {
    var greeting = this.name ? "My name is " + this.name : "I don't have a name"
    console.log(greeting)
}
```

将文档结构转换成模型：

```javascript
//将文档结构发布为模型,返回模型构造函数
var User = mongoose.model('User', userScheam)

```

创建实例：

```javascript
//使用模型
var admin = new User({
    name: 'admin',
    passwd: '123456',
    content: 'hello world'
})
```

调用方法：

```javascript
//只有有实例之后才能调用methods
admin.speak()
```

保存数据：

```javascript
//保存数据
admin.save(function (err, admin) { //第二个参数实际就是需要传入的model
    if (err) {
        return console.log(err)
    }
    admin.speak()
    console.log(admin)
})
```

查询数据：

```javascript
//查询name开头为a的数据，省略第一个参数为查询全部（第一个参数为查询条件）
User.find({name: /^a/}, function (err, ret) {
    if (err) {
        return console.log(err)
    } else {
        console.log(ret)
    }
})

User.findOne({condition}, callback) //查询遇到的第一个符合条件的
```

删除数据：

```javascript
User.remove({condition})
User.findByIdAndDelete()
```

更新数据：

```javascript
User.findByIdAndUpdate('id', {update data}, calback) 
User.update({conditions}, doc, [option], callback) //更新所有
User.findOneAndUpdate({condition}, {update}, [option], callback) //找到并更新
```

### 10.5. MongoDB实现crud

[实现代码 （github）](https://github.com/lunyiy/Web/tree/main/Node/mongoDB_crud/crud)

实际与文件操作的crud相比，只修改了`students.js`以及`router.js`，以及`index.html`中的索引，其他没有改变

## 11. Promise

解决回调嵌套地狱，promise ES6

### 11.1. 基本语法

#### 11.1.1. 基本使用

```javascript
var fs =require('fs')

var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./a.txt', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

p1
  .then(function(data) {
    console.log(data)
}, function(err) {
    console.log('读取文件失败', err)
})
```

#### 11.1.2. 解决回调地狱

```javascript
var fs = require('fs')

var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./a.txt','utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

var p2 = new Promise(function (resolve, reject) {
    fs.readFile('./b.txt','utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

p1
  .then(function (data) {
      console.log(data)
      return p2 //数据指向后面的then方法
  }, function (err) {
      console.log('读取a文件失败\n' + err)
  })
  .then(function (data) {  //这个它then的数据来自于上面 return 的 p2
    console.log(data)
  }, function (err) {
    console.log('读取b文件失败' + err)
  })
```

## 12. path路径模块

```shell
#获取文件名
path.basename("c:/a/b/c/index.js") #index.js
#获取路径
path.dirname("c:/a/b/c/index.js") #c:/a/b/c/
#获取扩展名
path.extname("c:/a/b/c/index.js") #.js
#解析成对象
path.parse("c:/a/b/c/index.js") 
#{
#  root: 'c:/',
#  dir: 'c:/a/b/c',
#  base: 'index.js',
#  ext: '.js',
#  name: 'index'
#}
#拼接路径
path.join("c:/a/b", "c") #c/a/b/c
#判断是否是绝对路径
path.isAbsolute()
```

## 13. art-template模板继承

### 13.1. [01代码地址](https://github.com/lunyiy/Web/blob/main/Node/art-template%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF/01)

```javascript
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    {{ include './header.html' }}
    <p>hello</p>
    {{ include './footer.html' }}
</body>
</html>

//header.html
这是公共头部
//footer.html
这是公共尾部
```

### 13.2. [02代码地址](https://github.com/lunyiy/Web/tree/main/Node/art-template%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF/02)

```html
<!-- template.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>hello</p>
    <p>
        world
    </p>
    {{ block 'content' }}默认内容{{ /block }}
</body>
</html>
<!-- index.html -->
{{ extend './template.html' }}

{{ block 'content' }}这里是替换内容{{ /block }}
```

### 13.3. 模板使用

```html
<!-- 遍历 -->
{{each users}}
  ...
  {{$value.id}}
  {{$value.name}}
  ...
{{/each}}

<!-- if else -->
{{if user}}
 ...
 {{else}}
...
{{/if}}

```

## 14. Ajax

```html
<p>test</p>
    <button onclick="ajax1()">点击1</button>
    <div id="mydiv1"> </div>
<script>
    function ajax1() {
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                document.getElementById('mydiv1').innerHTML = xmlHttp.responseText
                document.getElementById('mydiv2').innerHTML = ''
            }
        }
        xmlHttp.open('get', './test.html', false)
        xmlHttp.send()
    }
</script>
```

`jQuery` 下的`ajax`

```html
<script src=".../.../jquery.js"></script>
<script>
	$.ajax({
    url: '/register',
    type: 'post', //or get
    data: data,
    dataType: 'json',
    success: function (data) {
      
    }
  })
</script>
```





## n. 其他

### n.1. 修改代码后自动重启

`nodemon`第三方工具，自动监听代码情况，修改代码自动重启服务

```shell
npm install --global nodemon
nodemon app.js
```

### n.2. Node中的其他成员

在每个模块中，除了`require`、 `exports`  等模块相关 API 以外，还有两个特殊的成员：

`__dirname` **动态获取**当前文件模块所属目录的绝对路径

`__filename` **动态获取**当前文件的绝对路径

`__dirname`和`__filename`再加上`path.join()`完美解决路径问题

在文件操作中，使用相对路径是不可靠的，因为在 Node 中文件操作的路径被设计为相对于执行 node 命令所处的路径，为了解决这个问题，需要把相对路径改为绝对路径。

### n.3. md5 加密

最好对密码进行二次加密

`md5(md5(passwd))`