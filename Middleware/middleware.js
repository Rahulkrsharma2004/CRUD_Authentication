const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()
const secretKey = process.env.SECRET_TOKEN

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  jwt.verify(token ,secretKey, (err, decoded) => {
    if (err) {
      // console.log(err)
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();

  });
};

module.exports = { auth };
