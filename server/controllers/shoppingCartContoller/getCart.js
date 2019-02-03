import db from '../../models/db';

/**
 * @class getCartController
 */
class getCartController {
/**
   * @description get total quantity and other cart details
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static getCartDetails(req, res) {
    const { userId } = req.decoded;

    const selectText = `SELECT
    json_build_object(
      'totalprice', carts.total_price, 
      'totalQuantity', carts.total_quantity, 
      'items', jsonb_agg(json_build_object('id', food_items.id, 'name', food_items.name, 
      'price', food_items.price, 'img_url', food_items.img_url, 
      'quantity', carts_fooditems.item_quantity))
    ) AS cart

    FROM Carts

    LEFT JOIN carts_fooditems
    ON carts.id = carts_fooditems.cart_id

    LEFT JOIN food_items
    ON carts_fooditems.item_id = food_items.id
    WHERE user_id = $1 AND paid_for = $2
    
    GROUP BY carts.id `;

    const selectParams = [userId, false];

    db(selectText, selectParams, (err, cart) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (!cart.rows.length) {
        res.status(200).json({
          cart: {
            totalQuantity: 0
          }
        });
      } else {
        res.status(200).json({
          cart: cart.rows[0],
          success: true,
          status: 200
        });
      }
    });
  }
}

export default getCartController;
