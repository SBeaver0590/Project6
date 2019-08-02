var express = require('express');
var app = express();
const pug = require('pug');
const data= require('./data.json');
const path= require('path');


//Set the view engine to pug
app.set('view engine', 'pug')

//Show static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Show static in the images folder
app.use(express.static(path.join(__dirname, '/images/')));

//Sets the index route to render to the home page w/ data from projects.
app.get('/', function (req, res) {
  res.render('index', {projects: data.projects})
})

//Set the about route to render to the about page.
app.get('/about', function (req, res) {
  res.render('about')
})

//Set dynamic routes for projects based on their id an render a customized version of each project.
app.get('/project/:id', function (req, res, next) {
  res.render('project', 
   {
    project_name: data.projects [req.params.id].project_name,
    description: data.projects [req.params.id].description,
    technologies: data.projects [req.params.id].technologies,
    image_urls : data.projects [req.params.id].imageurl
  });
});

//The static folder is set to the public
app.use('/static', express.static(path.join(__dirname, 'public')));
//The images folder is set to the public
app.use('/imagess', express.static(path.join(__dirname, '/images/')));


//Sets index route for app
app.get('/index', function (req, res) {
  res.render('index', {projects: data.projects});
})

//Sets the project route for the app
app.get('/project', function(req, res) {
  let projectIndex = req.query.id;
  res.render('project', {project: data.projects[projectIndex]});
});

// Error handling middleware to utilize static
app.use(function (req, res, next) {
  const err = new Error('Server error: Sorry your requested page can not be found.');
  err.status = 404;
  next(err);
});

//Handle errors in the app
app.use(function (err, req, res,next) {
  res.locals.error = err;
  res.render('error', { error: err});
  console.log("Server error: Sorry your requested page can not be found.")

})

// Server listens for the app
app.listen(3000, ()=>{
  console.log('running on port 3000')
})
