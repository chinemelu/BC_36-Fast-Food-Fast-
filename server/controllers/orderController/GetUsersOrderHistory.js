import db from '../../models/db';

/**
 * @class OrderController
 */
class OrderController {
  /**
     * @description get all user's orders
     *
     * @param {string} req http request
     * @param {string} res http response
     *
     * @returns {Array} returns an array
     */
  static getUserOrders(req, res) {
    const { userId } = req.decoded;
    const text = `SELECT
    json_build_object(
      'id', orders.id,
      'order status', orders.order_status,
      'date', orders.created_at,
      'total', carts.total_price,
      'items', jsonb_agg(json_build_object('id', food_items.id, 'name', food_items.name, 
      'price', food_items.price, 'img_url', food_items.img_url, 
      'quantity', carts_fooditems.item_quantity))
    ) AS order

      FROM orders
      
      LEFT JOIN carts
      ON orders.cart_id = carts.id

      LEFT JOIN carts_fooditems
      ON carts.id = carts_fooditems.cart_id

      LEFT JOIN food_items
      ON carts_fooditems.item_id = food_items.id
      WHERE orders.user_id = $1 
      
      GROUP by orders.id, carts.id
      ORDER BY orders.created_at DESC
      `;

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
