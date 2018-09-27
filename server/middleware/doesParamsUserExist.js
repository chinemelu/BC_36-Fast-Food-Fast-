import db from '../models/db';

const doesParamsUserExist = (req, res, next) => {
  const userId = req.params.id;
  const text = 'SELECT * FROM users WHERE id = $1';
  const params = [userId];

  db(text, params, (err, results) => {
    if (results.rows.length) {
      next();
    } else {
      return res.status(404).json({
        message: 'User does not exist'
      });
    }
  });
};

export default doesParamsUserExist;
