var fs = require('fs')
var express = require('express')
var Students = require('./students')
const {
    json
} = require('body-parser')
const {
    render
} = require('art-template')

var router = express.Router()

var headers = [{
        "label": "苹果"
    },
    {
        "label": "香蕉"
    },
    {
        "label": "桃子"
    }
]

// 请求主页面
router.get('/', (req, res) => {

    Students.find(function (err, data) {
        if (err) {
            return res.status(500).send('Server Error')
        } else {
            res.render('index.html', {
                headers: headers,
                students: data
            })
        }
    })

})

// 请求添加学生界面
router.get('/new/', function (req, res) {
    res.render('write.html')
})

// 提交添加学生的数据
router.post('/new', function (req, res) {

    Students.save(req.body, function (err) {
        if (err) {
            return res.send(window.alert('添加失败'))
        }
    })
    res.redirect('/')

})

// 请求编辑页面
router.get('/edit', function (req, res) {

    Students.findById(req.query.id, function (err, data) {
        if (err) {
            return res.status(500).send('Server Error')
        }
        var student = data
        res.render('edit.html', {
            student: student
        })
    })

})

router.post('/edit', function (req, res) {

    Students.updateById(req.body, function (err) {
        if (err) {
            console.log(window.alert('添加失败'))
            return res.send()
        }
    })
    res.redirect('/')

})

router.get('/delete', function (req, res) {

    Students.deleteById(req.query.id, function (err) {
        if (err) {
            console.log(window.alert('删除失败'))
            return res.send()
        }
    })
    res.redirect('/')
    
})


module.exports = router