// importing packages
const express = require('express'); // all content

const { uuid, isUuid } = require('uuidv4'); // specific function

// creating the app
const app = express();

// must come before all methods
app.use(express.json());

// no DB
const projectsDS = [];

// Middlewares
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  // without the next the request is interrupted, the route
  // is not reach or executed
  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({error: 'Invalid project ID.'});
  }

  return next();
}

// for all routes
app.use(logRequests);

// for specific routes
app.use('/projects/:id', validateProjectId);

// route control
app.get('/projects', (request, response) => {
  const { title } = request.query;
  
  const results = title 
    ? projectsDS.filter(projects => projects.title.includes(title))
    : projectsDS;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const projectInfo = { id: uuid(), title, owner };
  
  // adding created project to the Projects array
  projectsDS.push(projectInfo);
  
  response.json(projectInfo);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projectsDS.findIndex(projects => projects.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'});
  }

  const newProjectInfo = {
    id,
    title,
    owner
  };

  projectsDS[projectIndex] = newProjectInfo;

  response.json(newProjectInfo);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  
  const projectIndex = projectsDS.findIndex(projects => projects.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.'});
  }

  projectsDS.splice(projectIndex, 1);

  response.status(204).send();
});

// listen to port
app.listen(3333, ()=> {
  console.log('🤖 Back-end started!');
});