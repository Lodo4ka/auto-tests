const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
let should = chai.should();

describe('Testing another API', function() {

  let token = {'test': 'test'};

  it('first test', function(done) {
    chai.request('http://crm2.local/')
      .get('sections/sales/resident')
      .end((error, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        done();
      }); 
  });
});