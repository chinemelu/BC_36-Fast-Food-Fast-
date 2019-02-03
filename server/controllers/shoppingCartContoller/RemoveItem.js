import db from '../../models/db';

/**
 * @class RemoveItemController
 */
class RemoveItemController {
/**
   * @description remove food item to cart
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static removeItem(req, res) {
    const itemId = req.item.id;
    const { userId } = req.decoded;

    const selectText1 = 'SELECT * FROM carts WHERE user_id = $1 AND paid_for = $2';
    const selectParams1 = [userId, false];

    db(selectText1, selectParams1, (err, cart) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (!cart.rows.length) {
        return res.status(404).json({
          message: 'This item does not exist in the cart',
          success: false,
          status: 404
        });
      }
      const selectText2 = 'SELECT * FROM carts_fooditems WHERE cart_id = $1 AND item_id = $2';
      const selectParam2 = [cart.rows[0].id, itemId];

      db(selectText2, selectParam2, (err, item) => {
        if (err) {
          return res.status(500).json({ error: err.stack });
        }
        if (!item.rows.length) {
          return res.status(404).json({
            message: 'This item does not exist in the cart',
            status: 404,
            success: false
          });
        }
        const updateText = `UPDATE carts SET total_quantity = $1, total_price = $2 
        WHERE id =  $3 RETURNING id, total_quantity, total_price`;
        const updateParams = [
          cart.rows[0].total_quantity - item.rows[0].item_quantity,
          cart.rows[0].total_price - item.rows[0].item_quantity * req.item.price,
          cart.rows[0].id,
        ];
        db(updateText, updateParams, (err) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
        });
        const deleteText1 = 'DELETE from carts_fooditems where item_id =$1';
        const deleteParam1 = [itemId];

        db(deleteText1, deleteParam1).then(() => res.status(200).json({
          message: `${req.item.name} removed from cart`,
          status: 200,
          success: true
        })).catch(e => setImmediate(() => { throw e; }));
      });
    });
  }
}

export default RemoveItemController;
