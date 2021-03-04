const http = require('http');
const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/index': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCss,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notReal,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notReal,
  },
  POST: {
    '/addUser': jsonHandler.addUser,
  },
};

const handleEndpoint = (request, response, type, responseHandle) => {
  if (type === 'POST') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      responseHandle(response, bodyParams);
    });
  } else {
    responseHandle(response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const controllerMethod = urlStruct[request.method][parsedUrl.pathname];

  if (controllerMethod) {
    handleEndpoint(request, response, request.method, controllerMethod);
  } else {
    jsonHandler.getDoesNotExist(response);
  }
};

http.createServer(onRequest).listen(port);
