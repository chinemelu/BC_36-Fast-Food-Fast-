import db from '../../models/db';

/**
 * @class GetMenuController
 */
class GetMenuController {
  /**
     * @description get menu
     * @param {string} req http request
     * @param {string} res http response
     * @returns  {Array} returns an array
     */
  static getAllItems(req, res) {
    const text = 'SELECT id, name, price, img_url from food_items WHERE active = $1';
    const param = [true];

    db(text, param, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (Array.isArray(results.rows) && results.rows.length) {
        res.status(200).json({
          data: results.rows
        });
      } else {
        res.status(200).json({
          message: 'There are no available food items',
          data: results.rows
        });
      }
    });
  }
}
export default GetMenuController;
