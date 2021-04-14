const { Callbacks } = require('jquery')
var mongoose = require('mongoose')

var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true})

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

//创建方法methods
userScheam.methods.speak = function () {
    var greeting = this.name ? "My name is " + this.name : "I don't have a name"
    console.log(greeting)
}

//将文档结构发布为模型,返回模型构造函数
var User = mongoose.model('User', userScheam)

//使用模型
var admin = new User({
    name: 'bnoth',
    passwd: '123456',
    content: 'hello world'
})

//调佣speak方法
// admin.speak()


// 保存数据
admin.save(function (err, admin) { //第二个参数实际就是需要传入的model
    if (err) {
        return console.log(err)
    }
    admin.speak()
    console.log(admin)
})

//查询数据
User.find( function (err, ret) {
    if (err) {
        return console.log(err)
    } else {
        console.log(ret)
    }
})

//删除数据
User.remove({name: /^b/}, function (err, ret) {
    if (err) {
        return console.log(err)
    } else {
        console.log(ret)
    }
})

//更新数据
User.findByIdAndUpdate('6076c79bdfdb684370b5acf5', {
    passwd: '1111'
}, function (err, ret) {
    if (err) {
        return console.log(err)
    } else {
        console.log(ret)
    }
})
