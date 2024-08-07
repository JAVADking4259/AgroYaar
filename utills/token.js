const jwt = require('jsonwebtoken');

const generateToken = async (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: 'please inter token' });
    }
    const authorization = req.headers.authorization.split('Bearer ');
    if (authorization.length < 2) {
        return res.status(400).send({ error: 'invalid token' });
    }
    const token = authorization[1];
    if (!token) return res.status(400).send({ error: 'token not exist' });
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
        return res.status(400).send({ error: 'توکن منقضی شده است' });
    }
    if (decodedToken.id === undefined) {
        return res.status(400).send({ error: 'invalid token' });
    }
    next();
  };


module.exports={generateToken,checkToken};