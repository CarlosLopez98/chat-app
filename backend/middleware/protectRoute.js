const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(400).json({ error: 'Unauthorized. Invalid token' })
    }

    const user = await User.findOne({
      where: { id: decoded.userId },
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    req.user = user
    next()
  } catch (e) {
    console.log('Error in the protectRoute middleware: ', e.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = protectRoute