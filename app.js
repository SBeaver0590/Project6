var express = require('express')
var app = express()
const pug = require('pug');

app.set('view engine', 'pug')



app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, ()=>{
  console.log('running on port 3000')
})
