const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const cssFile = fs.readFileSync(`${__dirname}/../client/style.css`);

/*
============ Route Functions ============
*/

const getIndex = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssFile);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
