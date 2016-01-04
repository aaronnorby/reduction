// loading babel-register before everything else lets us use es6 import statements
// in the rest of our server code
require('babel-register');
require('./server.js');
