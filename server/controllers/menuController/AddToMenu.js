import db from '../../models/db';

/**
 * @class AddToMenuController
 */
class AddToMenuController {
/**
   * @description add to menu
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} returns a JSON object
   */
  static addItem(req, res) {
    const selectText = 'SELECT * FROM items WHERE name = $1';
    const selectParams = [req.body.name];

    db(selectText, selectParams)
      .then((result) => {
        if (result.rows.length) {
          return res.status(409).json({
            message: 'Item already exists'
          });
        }
        const insertText = 'INSERT INTO items(name, price, img_url) VALUES ($1, $2, $3) RETURNING \n'
          + 'id, name, price, img_url';

        const insertParam = [req.body.name, req.body.price, req.body.imgUrl];

        db(insertText, insertParam)
          .then((item) => {
            res.status(201).json({
              message: 'You have added the item successfully',
              item: item.rows[0]
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err.stack });
          });
      });
  }
}

export default AddToMenuController;
