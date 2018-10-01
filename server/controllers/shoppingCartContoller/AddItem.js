import db from '../../models/db';

/**
 * @class AddItemController
 */
class AddItemController {
/**
   * @description add food item to cart
   *
   * @param {object} req http request
   * @param {object} res http response
   *
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
          const text7 = 'INSERT INTO carts_fooditems(cart_id, item_id, item_quantity) VALUES ($1, $2, $3) RETURNING \n'
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
        const text6 = 'UPDATE carts SET total_quantity = $1, total_price = $2 WHERE id = $3 RETURNING \n'
            + 'id, total_quantity, total_price, paid_for';

        const params6 = [
          cart.rows[0].total_quantity + 1,
          parseFloat(cart.rows[0].total_price, 10) + parseFloat(req.item.price, 10),
          cart.rows[0].id
        ];
        db(text6, params6, (err) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
        });

        const text3 = 'SELECT * FROM carts_fooditems WHERE cart_id = $1 AND item_id = $2';
        const params3 = [cart.rows[0].id, itemId];
        db(text3, params3, (err, item) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
          if (!item.rows.length) {
            const text4 = 'INSERT INTO carts_fooditems(cart_id, item_id, item_quantity) VALUES ($1, $2, $3) RETURNING \n'
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
            const text4 = 'UPDATE carts_fooditems SET item_quantity = $1 WHERE cart_id = $2 AND item_id = $3 RETURNING \n'
            + 'cart_id, item_id, item_quantity';
            const params4 = [item.rows[0].item_quantity + 1, cart.rows[0].id, itemId];
            db(text4, params4, (err) => {
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
}

export default AddItemController;
