import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/db';

/**
 * @class userController
 */
class UserController {
  /**
   * @description user sign in
   *
   * @param {object} req http request
   * @param {object} res http response
   *
   * @returns {JSON} Returns a JSON object
  */
  static login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const params = [req.body.email];
    db(text, params, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.stack });
      }
      if (!user.rows.length) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        bcrypt.compare(req.body.password, user.rows[0].password)
          .then((isMatch) => {
            if (isMatch) {
              const payload = {
                userId: user.rows[0].id,
                role: user.rows[0].role
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '2h'
              });
              res.status(200).json({
                message: `${user.rows[0].first_name}, you have successfully logged in`,
                id: user.rows[0].id,
                token
              });
            } else {
              return res.status(401).json({ error: 'Invalid email or password' });
            }
          })
          .catch((error) => {
            res.status(500).json({
              error
            });
          });
      }
    });
  }
}

export default UserController;
