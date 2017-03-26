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

  //normal case for get request
  it('should return list of recipes on GET', function() {
      //return a promise
      return chai.request(app)
        .get('/recipes')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.at.least(1);
          //checking for expected keys
          const expectedKeys = ['id', 'name', 'ingredients'];
          res.body.forEach(recipe => {
            recipe.should.be.a('object');
            recipe.should.include.keys(expectedKeys);
            recipe.ingredients.should.be.a('array');
          });
        });//end of then
  });//end of it

  //normal case for post request

  //normal case for put request

  //normal case for delete request

});
