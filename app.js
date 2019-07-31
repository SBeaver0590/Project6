var express = require('express');
var app = express();
const pug = require('pug');
const data= require('./data.json');
const path= require('path');

app.set('view engine', 'pug')


app.use(express.static(path.join('public')));

app.get('/', function (req, res) {
  res.render('index', {projects: data.projects})
})


app.get('/about', function (req, res) {
  res.render('about')
})

// app.get('/index', function (req, res) {
//   res.render('index', {projects: data.projects});
// })


app.get('/project/:id', function (req, res, next) {
  const pro = parseInt(req.params.id);
  const project = projects[pro];

  if(Number.isInteger(pro) && pro < projects.length && pro >= 0){
  return res.render('project', {project});
  }else{
    let err = new Error("This project doesn't exist");
    next(err);
  }
}); 


app.listen(3000, ()=>{
  console.log('running on port 3000')
})
