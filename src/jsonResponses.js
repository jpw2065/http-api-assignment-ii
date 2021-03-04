const users = { users: {} };

/*
============ Helper Functions ============
*/

const respond = (response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondMeta = (response, status) => {
  response.writeHead(status, {});
  response.end();
};

const objectToJson = (content) => JSON.stringify(content);

const respondWithJson = (response, content, status) => {
  respond(response, objectToJson(content), status, 'application/json');
};

/*
============ Route Functions ============
*/
const getUsers = (response) => {
  respondWithJson(response, users, 200);
};

const getUsersMeta = (response) => {
  respondMeta(response, 200);
};

const notReal = (response) => {
  const error = {
    id: 'badRequest',
    message: 'Missing valid query parameter set to true',
  };

  respondWithJson(response, error, 404);
};

const notRealMeta = (response) => {
  respondMeta(response, 404);
};

const addUser = (response, body) => {
  const error = {
    id: 'missingParams',
    message: 'Name, and age are both required!',
  };

  const success = {
    message: 'Succesfully added user!',
  };

  if (!body.name || !body.age) {
    return respondWithJson(response, error, 404);
  }

  let responseCode = 201;
  if (users.users[body.name]) {
    responseCode = 204;
  } else {
    users.users[body.name] = {};
  }

  users.users[body.name].name = body.name;
  users.users[body.name].age = body.age;

  if (responseCode === 201) {
    return respondWithJson(response, success, responseCode);
  }

  return respondMeta(response, responseCode);
};

const getDoesNotExist = (response) => {
  const message = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  respondWithJson(response, message, 404);
};

module.exports.getUsers = getUsers;
module.exports.getUsersMeta = getUsersMeta;
module.exports.notReal = notReal;
module.exports.notRealMeta = notRealMeta;
module.exports.addUser = addUser;
module.exports.getDoesNotExist = getDoesNotExist;
