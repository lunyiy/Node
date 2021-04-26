var mongoose = require('mongoose')

var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true})

var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String
    }
})

module.exports = mongoose.model('Student', studentSchema)












// 查询所有学生信息
// exports.find = function (callback) {
//     fs.readFile(dbPath, 'utf8', function (err, data) {
//         if (err) {
//             return callback(err)
//         }
//         callback(null, JSON.parse(data).students)
//     })
// }

// // 保存学生信息
// exports.save = function (student, callback) {
//     fs.readFile(dbPath, 'utf8', function (err, data) {
//         if (err) {
//             return callback(err)
//         }
//         var students = JSON.parse(data).students
//         if (students.toString() === '') {
//             var newId = 1
//         } else {
//             var newId = students[students.length - 1].id + 1
//         }
//         student.id = newId
//         students.push(student)
//         var fileData = JSON.stringify({
//             students: students
//         })
//         fs.writeFile(dbPath, fileData, function (err) {
//             if (err) {
//                 return callback(err)
//             }
//             callback(null)
//         })
//     })
// }

// // 根据 id 寻找学生信息
// exports.findById = function (id, callback) {
//     fs.readFile(dbPath, 'utf8', function (err, data) {
//         if (err) {
//             return callback(err)
//         }
//         var students = JSON.parse(data).students
//         var student = students.find(function (items) {
//             return items.id === parseInt(id)
//         })
//         callback(null, student)
//     })
// }

// // 根据 id 修改学生信息并保存
// exports.updateById = function (student, callback) {
//     fs.readFile(dbPath, 'utf8', function (err, data) {
//         if (err) {
//             return callback(err)
//         }
//         student.id = parseInt(student.id)
//         var students = JSON.parse(data).students
//         var stuId = students.findIndex(function (items) {
//             return items.id === student.id
//         })

//         for (var key in students[stuId]) {
//             students[stuId][key] = student[key]
//         }
//         var fileData = JSON.stringify({
//             students: students
//         })
//         fs.writeFile(dbPath, fileData, function (err) {
//             if (err) {
//                 return callback(err)
//             }
//             callback(null)
//         })


//     })
// }

// // 根据 id 删除学生信息
// exports.deleteById = function (id, callback) {
//     fs.readFile(dbPath, 'utf8', function (err, data) {
//         if (err) {
//             return callback(err)
//         }
//         var students = JSON.parse(data).students
//         var deleteId = students.findIndex(function (items) {
//             return items.id === parseInt(id)
//         })
//         students.splice(deleteId, 1)
//         var fileData = JSON.stringify({
//             students: students
//         })
//         fs.writeFile(dbPath, fileData, function (err) {
//             if (err) {
//                 return callback(err)
//             }
//             callback(null)
//         })
//     })
// }











// {
//     "students": [
//         {"id": 1,"name": 1, "age": 18, "hobbies": "coding、羽毛球、lol"},
//         {"id": 2,"name": 2, "age": 18, "hobbies": "coding、羽毛球、lol"},
//         {"id": 3,"name": 3, "age": 18, "hobbies": "coding、羽毛球、lol"},   
//         {"id": 4,"name": 4, "age": 18, "hobbies": "coding、羽毛球、lol"},
//         {"id": 5,"name": 5, "age": 18, "hobbies": "coding、羽毛球、lol"},       
//         {"id": 6,"name": 6, "age": 18, "hobbies": "coding、羽毛球、lol"} 
//     ]

// }