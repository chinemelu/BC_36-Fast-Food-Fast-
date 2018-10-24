import db from '../../models/db';

/**
 * @class EditItemController
 */
class EditItemController {
/**
   * @description edits food item
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static editItem(req, res) {
    const itemId = req.params.id;

    const editText = 'UPDATE food_items SET name = $1, price = $2, img_url = $3 WHERE id = $4';
    const editParams = [req.body.name, req.body.price, req.body.imgUrl, itemId];

    db(editText, editParams)
      .then(() => {
        res.status(200).json({
          message: 'You have edited the food item successfully',
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
      });
  }
}

export default EditItemController;
