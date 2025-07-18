const { signinService } = require('../services/auth/signin');

const signin = async (req, res) => {
  try {
    const response = await signinService(req.body)
    return res.json(response)
  } catch (error) {
    console.log(error)

    if (error.message === "Invalid credentials") {
      return res.status(401).send({ message: error.message })
    }

    return res.status(500).send({ message: error.message })
  }
};

module.exports = {
  signin
}