import db from '../../models/db';

/**
 * @class GetAllOrdersController
 */
class GetAllOrdersController {
  /**
     * @description get all food orders
     *
     * @param {string} req http request
     * @param {string} res http response
     *
     * @returns  {Array} returns an array
     */
  static getAllOrders(req, res) {
    const text = `SELECT
    json_build_object(
      'id', orders.id, 
      'firstName', users.first_name,
      'lastName', users.last_name,
      'date', orders.created_at,
      'total', carts.total_price,
      'order status', orders.order_status,
      'items', jsonb_agg(json_build_object('id', food_items.id, 'name', food_items.name, 
      'price', food_items.price, 'img_url', food_items.img_url, 
      'quantity', carts_fooditems.item_quantity))
    ) AS order

      FROM orders
      
      LEFT JOIN users
      on orders.user_id = users.id

      LEFT JOIN carts
      ON orders.cart_id = carts.id

      LEFT JOIN carts_fooditems
      ON carts.id = carts_fooditems.cart_id

      LEFT JOIN food_items
      ON carts_fooditems.item_id = food_items.id

      WHERE orders.order_status = $1
      
      GROUP BY orders.id, carts.id, users.id
      ORDER BY orders.created_at DESC
      `;

    const param = [req.query.status];

    db(text, param, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack, success: false });
      }
      if (Array.isArray(results.rows) && results.rows.length) {
        res.status(200).json({
          data: results.rows,
          success: true
        });
      } else {
        res.status(200).json({
          message: 'There are no available food orders',
          data: results.rows,
          status: 200,
          success: true
        });
      }
    });
  }
}
export default GetAllOrdersController;
