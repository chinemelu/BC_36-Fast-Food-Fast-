import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('GET: /api/v1/orders', () => {
  describe('Successful request', () => {
    it('it should indicate if there are no orders in the database', (done) => {
      chai.request(server)
        .get('/api/v1/orders')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('There are no available food orders');
          done();
        });
    });
    it('it should fetch all food orders if database has orders', (done) => {
      chai.request(server)
        .get('/api/v1/cart/add-to-cart/51')
        .end(() => {
          chai.request(server)
            .get('/api/v1/add-to-cart/52')
            .end(() => {
              chai.request(server)
                .post('/api/v1/add-to-cart/53')
                .end(() => {
                  chai.request(server)
                    .post('/api/v1/orders')
                    .end(() => {
                      chai.request(server)
                        .get('/api/v1/orders')
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a('array');
                          res.body[0].should.have.property('id');
                          res.body[0].should.have.property('status');
                          res.body[0].should.have.property('cart');
                          res.body[0].id.should.eql(1);
                          res.body[0].status.should.eql('pending');
                          res.body[0].cart[0].item.id.should.eql(51);
                          res.body[0].cart[0].item.name.should.eql('Spaghetti');
                          res.body[0].cart[0].item.unitPrice.should.eql(650);
                          res.body[0].cart[0].quantity.should.eql(2);
                          res.body[0].cart[1].item.id.should.eql(52);
                          res.body[0].cart[1].item.name.should.eql('Chicken burrito');
                          res.body[0].cart[1].item.unitPrice.should.eql(250);
                          res.body[0].cart[2].item.id.should.eql(53);
                          res.body[0].cart[2].item.name.should.eql('Coke');
                          res.body[0].cart[2].item.unitPrice.should.eql(100);
                          done();
                        });
                    });
                });
            });
        });
    });
  });
});
