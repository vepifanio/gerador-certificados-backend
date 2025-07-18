const { Admin } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');

const signin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    where: { username }
  });

  console.log(admin);

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' });
  }

  const passwordValid = bcrypt.compareSync(
    password,
    admin.password
  );

  if (!passwordValid) {
      return res.status(401).send({
        acesssToken: null,
        message: 'Invalid Password'
      });
  }

  const token = jwt.sign({ id: admin.id }, config.secret, {
    expiresIn: 86400
  });

  return res.json({
    id: admin.id,
    username: admin.username,
    accessToken: token
  });
};

module.exports = {
  signin
}