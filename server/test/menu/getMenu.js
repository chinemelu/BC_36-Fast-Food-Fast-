import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import db from '../../models/db';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/menu API route', () => {
  beforeEach((done) => {
    db('DELETE from food_items', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE from users', () => {
      done();
    });
  });
  afterEach((done) => {
    db('DELETE from food_items', () => {
      done();
    });
  });
  beforeEach((done) => {
    db('DELETE from users', () => {
      done();
    });
  });
  describe('Empty database response', () => {
    it("should indicate if there's no food item", (done) => {
      chai.request(server)
        .get('/api/v1/menu')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.should.have.property('message');
          res.body.message.should.eql('There are no available food items');
          done();
        });
    });
  });
});
