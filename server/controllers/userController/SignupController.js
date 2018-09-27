import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/db';
/**
 * @class UserController
 */
class UserController {
  /**
   * @description user sign up
   *
   * @param {object} req Http request
   * @param {object} res Http response
   *
   * @returns  {JSON} Returns a JSON object
   */
  static signup(req, res) {
    const {
      email,
      firstName,
      lastName
    } = req.body;
    const errors = {};

    const selectText = 'SELECT * FROM users WHERE email =$1';
    const selectParams = [email];

    db(selectText, selectParams, (error, user) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (!user.rows.length) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const insertText = 'INSERT INTO users(email, password, first_name, last_name) \n'
        + 'VALUES ($1, $2, $3, $4) RETURNING id, role, email, first_name, last_name';
        const insertParams = [email, hashedPassword, firstName, lastName];
        db(insertText, insertParams, (err, newUser) => {
          if (err) {
            return res.status(500).json({ error: err.stack });
          }
          const payload = {
            userId: newUser.rows[0].id,
            role: newUser.rows[0].role
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h'
          });
          res.status(201).json({
            message: `${newUser.rows[0].first_name}, you have successfully created an account`,
            id: newUser.rows[0].id,
            firstName: newUser.rows[0].first_name,
            lastName: newUser.rows[0].last_name,
            email: newUser.rows[0].email,
            token
          });
        });
      } else {
        errors.emailExists = 'email exists';
        return res.status(409).json({ errors });
      }
    });
  }
}

export default UserController;
