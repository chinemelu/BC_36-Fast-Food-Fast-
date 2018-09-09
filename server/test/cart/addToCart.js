import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/cart/add-to-cart/itemId API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if id is not an integer', (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/a')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('Object');
          res.body.errors.should.have.property('id');
          res.body.errors.id.should.be.a('string');
          res.body.errors.id.should.eql('Invalid Id');
          done();
        });
    });
  });
  describe('Item not found', () => {
    it("should respond with an error message if item doesn't exist", (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/0')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Item not found');
          done();
        });
    });
  });
  describe('No errors', () => {
    it('it should add an item to cart', (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/51')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('items');
          res.body.items.should.have.property('51');
          res.body.items['51'].should.be.a('object');
          res.body.items['51'].item.unitPrice.should.eql(650);
          res.body.items['51'].item.name.should.eql('Spaghetti');
          done();
        });
    });
  });
});
