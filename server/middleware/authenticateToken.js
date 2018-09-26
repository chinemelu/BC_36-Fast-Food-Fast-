import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Invalid token',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: 'false',
      message: 'No token provided'
    });
  }
};

export default authenticateToken;
