const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../../models');
const config = require('../../config/auth.config');

const signinService = async ({ username, password }) => {
  const user = await Admin.findOne({
    where: {
      username
    }
  })

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = bcryptjs.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials")
  }

  const accessToken = jwt.sign(
    { id: user.id }, 
    config.secret,
    { expiresIn: 86400 }
  );

  return {
    id: user.id,
    username: user.username,
    accessToken
  }
}

module.exports = {
  signinService
}