var app = require('../../app.js');
var request = require('supertest');


describe("site routes", function(){

  it ("should respond 200 for root", function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(done)
      console.log('test passed!')
  })
})