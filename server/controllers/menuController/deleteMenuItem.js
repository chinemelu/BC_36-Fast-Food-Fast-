import db from '../../models/db';

/**
 * @class deleteFromMenuController
 */
class deleteFromMenuController {
/**
   * @description delete item from menu
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static deleteItem(req, res) {
    const itemId = req.params.id;

    const deleteText = 'DELETE from food_items WHERE id = $1';
    const deleteParams = [itemId];

    db(deleteText, deleteParams)
      .then(() => {
        res.status(200).json({
          message: 'You have deleted the food item successfully',
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
      });
  }
}

export default deleteFromMenuController;