import db from '../../models/db';

/**
 * @class GetSingleOrdercontroller
 */
class GetSingleOrderController {
  /**
     * @description get single order
     *
     * @param {string} req http request
     * @param {string} res http response
     *
     * @returns {JSON} returns a JSON object
     */
  static getSingleOrder(req, res) {
    const { id } = req.params;

    const text = `SELECT
      json_build_object(
        'id', orders.id,  
        'date', orders.created_at,
        'total', carts.total_price,
        'order status', orders.order_status,
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
      WHERE orders.id = $1
      
      GROUP BY orders.id, carts.id`;

    const param = [id];

    db(text, param, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (results.rows.length) {
        res.status(200).json({
          data: results.rows[0],
          status: 200,
          success: true
        });
      } else {
        res.status(404).json({
          message: 'Order not found',
          status: 404,
          success: false
        });
      }
    });
  }
}

export default GetSingleOrderController;
