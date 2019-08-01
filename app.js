var express = require('express');
var app = express();
const pug = require('pug');
const data= require('./data.json');
const path= require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')


app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {projects: data.projects})
})

// console.log(data);

app.get('/about', function (req, res) {
  res.render('about')
})

// app.get('/index', function (req, res) {
//   res.render('index', {projects: data.projects});
// })


app.get('/project/:id', function (req, res, next) {
  res.render('project', 
   {
    project_name: data.projects [req.params.id].project_name,
    description: data.projects [req.params.id].description,
    technologies: data.projects [req.params.id].technologies,
    image_urls : data.projects [req.params.id].imageurl
  });
}); 


app.listen(3000, ()=>{
  console.log('running on port 3000')
})
