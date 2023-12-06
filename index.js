const express = require('express')
const routes = require('./routes/api')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//connect monggo
mongoose.connect('mongodb://localhost/ninjago')
mongoose.Promise = global.Promise
app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/api',routes)
//error handler middleware
app.use(function(err,req,res,next){
    res.send({error:err.message})
})

app.get('/api', function(req, res){
    res.send({name:'galen'})
})

//lisent request
app.listen(process.env.port || 4000, function(){

})