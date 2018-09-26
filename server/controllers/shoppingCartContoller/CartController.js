import db from '../../models/db';

/**
 * @class CartController
 */
class CartController {
/**
   * @description add food item to cart
   * @param {object} req http request
   * @param {object} res http response
   * @returns {JSON} returns a JSON object
   */
  static addItem(req, res) {
    const itemId = req.item.id;
    const { userId } = req.decoded;

    const text1 = 'SELECT * FROM carts WHERE user_id = $1 AND paid_for = $2';
    const params1 = [userId, false];

    db(text1, params1, (err, cart) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (!cart.rows.length) {
        const text2 = 'INSERT INTO carts(user_id, total_price, total_quantity) VALUES ($1, $2, $3) RETURNING \n'
          + 'id, total_quantity, total_price, user_id, paid_for';
        const params2 = [userId, parseFloat(req.item.price, 10), 1];
        db(text2, params2).then((newCart) => {
          const text7 = 'INSERT INTO carts_items(cart_id, item_id, item_quantity) VALUES ($1, $2, $3) RETURNING \n'
          + 'cart_id, item_id, item_quantity';
          const params7 = [newCart.rows[0].id, itemId, 1];
          db(text7, params7, (err) => {
            if (err) {
              return res.status(500).json({ error: err.stack });
            }
            res.status(200).json({
              message: `${req.item.name} added to cart`
            });
          });
        }).catch(e => setImmediate(() => { throw e; }));
      } else {
        const text3 = 'SELECT * FROM carts_items WHERE cart_id = $1 AND item_id = $2';
        const params3 = [cart.rows[0].id, itemId];
        db(text3, params3, (err, item) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
          if (!item.rows.length) {
            const text6 = 'UPDATE carts SET total_quantity = $1, total_price = $2 WHERE id = $3 RETURNING \n'
            + 'id, total_quantity, total_price, paid_for';
            
            const params6 = [
              cart.rows[0].total_quantity + 1,
              parseFloat(cart.rows[0].total_price, 10) + parseFloat(req.item.price, 10),
              cart.rows[0].cart_id
            ];
            db(text6, params6, (err, results) => {
              if (err) {
                return res.status(500).json({ error: err.stack });
              }
            });

            const text4 = 'INSERT INTO carts_items(cart_id, item_id, item_quantity) VALUES ($1, $2, $3) RETURNING \n'
          + 'cart_id, item_id, item_quantity';
            const params4 = [cart.rows[0].id, itemId, 1];
            db(text4, params4, (err) => {
              if (err) {
                return res.status(500).json({ error: err.stack });
              }
              res.status(200).json({
                message: `${req.item.name} added to cart`
              });
            });
          } else {
            const text4 = 'UPDATE carts_items SET item_quantity = $1 WHERE cart_id = $2 AND item_id = $3 RETURNING \n'
            + 'cart_id, item_id, item_quantity';
            const params4 = [item.rows[0].item_quantity += 1, cart.rows[0].id, itemId];
            db(text4, params4, (err) => {
              if (err) {
                return res.status(500).json({ error: err.stack });
              }
            });

            const text5 = 'UPDATE carts SET total_quantity = $1, total_price = $2 WHERE id = $3 RETURNING \n'
            + 'id, total_quantity, total_price, paid_for';
            const params5 = [
              cart.rows[0].total_quantity + 1,
              parseFloat(cart.rows[0].total_price, 10) + parseFloat(req.item.price, 10),
              item.rows[0].cart_id
            ];
            db(text5, params5, (err) => {
              if (err) {
                return res.status(500).json({ error: err.stack });
              }
              res.status(200).json({
                message: `${req.item.name} added to cart`
              });
            });
          }
        });
      }
    });
  }

  /**
   * @description remove food item from cart
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static removeItem(req, res) {
    const itemId = req.params.id;
    const cart = new ShoppingCart(oldCart);

    const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

    itemNotFound(req, res, () => {
      if (!(itemId in oldCart.items)) {
        return res.status(404).json({
          message: 'Item not in cart'
        });
      }
      cart.removeItem(selectedItem[0], itemId);
      res.json(cart);
    });
  }

  /**
   * @description place food order
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static placeOrder(req, res) {
    const cart = new ShoppingCart(oldCart);

    const determineId = () => {
      if (orders.length > 0) {
        return orders.slice(-1)[0].id + 1;
      }
      return 1;
    };

    if (Object.keys(cart.items).length === 0) {
      return res.status(400).json({
        message: 'There are no items in the shopping cart'
      });
    }

    const newOrder = {
      id: determineId(),
      status: 'pending',
      total: cart.total,
      cart: cart.generateArray()
    };

    orders.push(newOrder);

    res.status(201).json({
      message: 'You have successfully ordered the item(s)',
      newOrder
    });
  }

  /**
   * @description fetch all food orders
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static fetchAllOrders(req, res) {
    if (orders.length) {
      return res.status(200).json(orders);
    }
    res.status(200).json({
      message: 'There are no available food orders'
    });
  }

  /**
   * @description update item quantity at checkout
   * @param {*} req http request
   * @param {*} res http response
   * @returns {JSON} returns a JSON object
   */
  static updateItemQuantity(req, res) {
    const cart = new ShoppingCart(oldCart);
    const itemId = req.params.id;
    const { quantity } = req.body;
    const selectedItem = ourItems.filter(item => item.id === parseInt(itemId, 10));

    itemNotFound(req, res, () => {
      if (!(itemId in oldCart.items)) {
        return res.status(404).json({
          message: 'Item not in cart'
        });
      }
     
      if (!quantity) {
        return res.status(400).json({
          message: 'Quantity is required'
        });
      }

      if (!/^[0-9]*$/.test(quantity)) {
        return res.status(400).json({
          message: 'Quantity must be an integer'
        });
      }
      cart.checkout(selectedItem[0], itemId, parseInt(quantity, 10));
      res.status(200).json(cart);
    });
  }
}

export default CartController;
