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

    const editText = `UPDATE food_items SET name = $1, price = $2, img_url = $3 WHERE id = $4
    RETURNING name, price, img_url`;
    const editParams = [req.body.name, req.body.price, req.body.imgUrl, itemId];

    const selectText = 'SELECT name, price, img_url FROM food_items WHERE name = $1 and active = $2 and id != $3';
    const selectParams = [req.body.name, true, itemId];

    db(selectText, selectParams)
      .then((result) => {
        if (result.rows.length) {
          return res.status(409).json({
            message: 'Item already exists'
          });
        }
        db(editText, editParams)
          .then(() => {
            res.status(200).json({
              message: 'You have edited the food item successfully',
            });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.stack });
      });
  }
}

export default EditItemController;
