import db from '../models/db';

/**
 * @function doesItemExist
 */

const doesItemExist = (req, res, next) => {
  /**
    * @description to check if a food item exists in the database
    *
    * @param {Object} req http request
    * @param {Object} res http response
    * @param {function} next callback function
    *
    * @returns {Object} error response
    */

  const itemId = req.params.id;
  const selectText = 'SELECT * FROM food_items WHERE id = $1 AND active = $2';
  const selectParams = [itemId, true];
  db(selectText, selectParams, (err, item) => {
    if (err) {
      return res.status(500).json({ error: err.stack, success: false });
    }
    if (!item.rows.length) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Item not found'
      });
    }
    [req.item] = item.rows;
    next();
  });
};

export default doesItemExist;
