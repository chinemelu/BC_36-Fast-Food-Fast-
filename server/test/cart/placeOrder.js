import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/orders API route', () => {
  describe('Bad request', () => {
    it('it should respond with an error message if there is no userId', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: '',
          items: [{
            itemId: 55,
            name: 'Sandwich',
            quantity: 3,
            price: 450
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('userId field is required');
          done();
        });
    });
    it('it should respond with an error message if userId is not an integer', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 'a',
          items: [{
            itemId: 55,
            name: 'Sandwich',
            quantity: 3,
            price: 450
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Invalid id');
          done();
        });
    });
    it('it should respond with an error message if items field is not an array', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: {}
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Items field must be an array');
          done();
        });
    });
    it('it should respond with an error message if items field is empty', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: []
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Items field must contain at least one food item');
          done();
        });
    });
    it('it should respond with an error message if at least one item is not an object', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, 1, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('item must be an object');
          done();
        });
    });
    it('it should respond with an error message if at least one item is empty', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {}, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Item must not be empty');
          done();
        });
    });
    it('it should respond with an error message if the name property of at least one item is empty or undefined', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: '',
            quantity: 24,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Name field is required');
          done();
        });
    });
    it('it should respond with an error message if the price property of at least one item is empty or undefined', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Price field is required');
          done();
        });
    });
    it('it should respond with an error message if the quantity property of at least one item is empty or undefined', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: '',
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Quantity field is required');
          done();
        });
    });
    it('it should respond with an error message if the itemId of at least one item is empty or undefined', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 20,
            price: 700
          }, {
            itemId: '',
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('itemId field is required');
          done();
        });
    });
    it('it should respond with an error message if the name property of any item consists of non-alphabets', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito12',
            quantity: 20,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 200
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Name must consist of alphabets with no space at the beginning or end of name');
          done();
        });
    });
    it('it should respond with an error message if the price property of at least one item is not an integer', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 'a'
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Price must be an integer');
          done();
        });
    });
    it('it should respond with an error message if the quantity property of at least one item is not an integer', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 51,
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 'a',
            price: 250
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('Quantity must be an integer');
          done();
        });
    });
    it('it should respond with an error message if the itemId property of at least one item is not an integer', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 'a',
            name: 'burrito',
            quantity: 24,
            price: 700
          }, {
            itemId: 53,
            name: 'Truffles',
            quantity: 1,
            price: 250
          }]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('itemId must be an integer');
          done();
        });
    });
  });
  describe('A successful order', () => {
    it('it should order if there are no errors', (done) => {
      chai.request(server)
        .post('/api/v1/orders')
        .send({
          userId: 20,
          items: [{
            itemId: 56,
            name: 'pancake',
            quantity: 3,
            price: 400
          }, {
            itemId: 57,
            name: 'Fried rice',
            quantity: 5,
            price: 1500
          }]
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.eql('You have successfully ordered the item(s)');
          res.body.should.have.property('newOrder');
          res.body.newOrder.should.have.property('id');
          res.body.newOrder.should.have.property('status');
          res.body.newOrder.should.have.property('total');
          res.body.newOrder.should.have.property('userId');
          res.body.newOrder.should.have.property('items');
          res.body.newOrder.id.should.eql(3);
          res.body.newOrder.status.should.eql('pending');
          res.body.newOrder.total.should.eql(8700);
          res.body.newOrder.userId.should.eql(20);
          res.body.newOrder.items[0].itemId.should.eql(56);
          res.body.newOrder.items[0].name.should.eql('pancake');
          res.body.newOrder.items[0].price.should.eql(400);
          res.body.newOrder.items[0].quantity.should.eql(3);
          res.body.newOrder.items[1].itemId.should.eql(57);
          res.body.newOrder.items[1].name.should.eql('Fried rice');
          res.body.newOrder.items[1].price.should.eql(1500);
          res.body.newOrder.items[1].quantity.should.eql(5);
          done();
        });
    });
  });
});
