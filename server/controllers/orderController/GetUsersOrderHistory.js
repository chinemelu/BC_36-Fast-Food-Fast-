import db from '../../models/db';

/**
 * @class OrderController
 */
class OrderController {
  /**
     * @description get all user's orders
     * @param {string} req http request
     * @param {string} res http response
     * @returns {Array} returns an array
     */
  static getUserOrders(req, res) {
    const { userId } = req.decoded;
    const text = `SELECT 
    json_build_object(
      'id', orders.id, 
      'userId', orders.user_id, 
      'order status', orders.order_status,
      'items', jsonb_agg(items)
    ) AS order

   FROM orders
   
   LEFT JOIN carts
   ON orders.cart_id = carts.id

   LEFT JOIN carts_items
   ON carts.id = carts_items.cart_id

   LEFT JOIN items
   ON carts_items.item_id = items.id
   WHERE orders.user_id = $1
   
   GROUP BY orders.id`;

    const params = [userId];
    db(text, params, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (Array.isArray(results.rows) && results.rows.length) {
        res.status(200).json(results.rows);
      } else {
        res.status(200).json({
          message: 'There are no available orders',
          data: results.rows
        });
      }
    });
  }
}
export default OrderController;
