const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/e-commerce').then(()=>{
console.log('mongodbconnected')
}).catch(()=>{
    console.log('connecion err')
})