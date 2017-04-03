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
  });//end of GET test

  //normal case for post request
  it('should add an item on POST', function() {
    const newRecipe = {name: 'fish stew', ingredients: ['fish', 'broth']};
    return chai.request(app)
      .post('/recipes')
      .send(newRecipe)
      .then(res => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('name', 'ingredients');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newRecipe, {id: res.body.id}));
      });
  }); //end of POST test

  //normal case for put request
  it('should update item on PUT', function() {

  }); //end of PUT test

  //normal case for delete request
  it('should detele item on DELETE', function() {

  }); //end of DELETE test
}); //end of describe block
