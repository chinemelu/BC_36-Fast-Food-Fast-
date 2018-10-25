import db from '../../models/db';

/**
 * @class GetFoodItemController
 */
class GetFoodItemController {
/**
   * @description gets a food item
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static getItem(req, res) {
    const itemId = req.params.id;

    const selectText = 'SELECT name, price, img_url FROM food_items WHERE id = $1 AND active = $2';
    const selectParams = [itemId, true];
    db(selectText, selectParams, (err, item) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (!item.rows.length) {
        return res.status(404).json({
          message: 'Item not found'
        });
      }
      res.status(200).json({
        item: item.rows[0]
      });
    });
  }
}

export default GetFoodItemController;
