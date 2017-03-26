const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Recipes', function() {
  //before testing start server
  before(function(){
    return runServer();
  });
  //after testing return promise for closing the server
  after(function(){
    return closeServer();
  });

  
});
