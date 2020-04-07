// importing express package
const express = require('express');

// creating the app
const app = express();

// must come before all methods
app.use(express.json());

// no DB
const projectsDS = [];

// route control
app.get('/projects', (request, response) => {
  //const [queryParams] = request.query;
  //console.log(queryParams);

  const { title, owner } = request.query;
  console.log(title);
  console.log(owner);

  return response.json([
    'Project 1',
    'Project 2',
    'Project 3'
  ]);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  console.log(title);
  console.log(owner);

  response.json([
    'Project 1',
    'Project 2',
    'Project 3',
    'Project 4',
  ]);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  console.log('put: ' + id);

  response.json([
    'Project 12',
    'Project 2',
    'Project 3',
    'Project 4',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  response.json([
    'Project 12',
    'Project 2',
    'Project 4',
  ]);
});

// listen to port
app.listen(3333, ()=> {
  console.log('🚀 Back-end started!');
});