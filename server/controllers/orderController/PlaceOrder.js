import db from '../../models/db';

/**
 * @class OrderController
 */
class OrderController {
/**
   * @description place food order
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static placeOrder(req, res) {
    const { userId } = req.decoded;

    const selectText = 'SELECT * FROM carts WHERE user_id = $1 and paid_for = $2';
    const selectParams = [userId, false];

    db(selectText, selectParams)
      .then((cart) => {
        if (!cart.rows.length || cart.rows[0].total_quantity === 0) {
          return res.status(400).json({
            message: 'Please add at least one item to order',
            success: false,
            status: 400
          });
        }
        const insertText = 'INSERT INTO orders(user_id, cart_id) VALUES ($1, $2) RETURNING \n'
          + 'id, user_id, order_status';

        const insertParam = [userId, cart.rows[0].id];

        db(insertText, insertParam)
          .then(() => {
            const updateText = 'UPDATE carts SET paid_for = $1 WHERE id = $2 RETURNING \n'
            + 'id, total_quantity, total_price, paid_for';
            const updateParams = [true, cart.rows[0].id];
            db(updateText, updateParams, (err) => {
              if (err) {
                return res.status(500).json({ error: err.stack, success: false });
              }
              const updateUserText = 'UPDATE users SET address = $1, phone_number = $2 WHERE id = $3';
              const updateUserParams = [req.body.address, req.body.mobileNumber, userId];
              db(updateUserText, updateUserParams, (err) => {
                if (err) {
                  return res.status(500).json({ error: err.stack, success: false });
                }
                res.status(201).json({
                  message: 'You have ordered successfully',
                  status: 201,
                  success: true
                });
              });
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err.stack, success: false });
          });
      });
  }
}

export default OrderController;
