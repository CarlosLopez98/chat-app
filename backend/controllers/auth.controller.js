const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/generateToken")

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    generateTokenAndSetCookie(res, user.id)

    return res.status(201).json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    })

  } catch (e) {
    return res.status(400).json({ error: 'There was an error trying to login the user' })
  }
}

const signupUser = async (req, res) => {
  try {
    const { name, surname, username, email, password } = req.body

    const user = await User.findOne({
      where: { username: username }
    })

    if (user) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    // HASH password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = User.build({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      avatar: Math.floor(Math.random() * 2) == 0 ? boyProfilePic : girlProfilePic
    })

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(res, newUser.id)
      await newUser.save()

      return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar
      })
    } else {
      return res.status(400).json({ error: 'Invalid user data' })
    }

  } catch (e) {
    return res.status(400).json({ error: 'There was an error trying to create the user' })
  }
}

const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfuly' })
  } catch (e) {
    return res.status(400).json({ error: 'There was an error trying to logout the user' })
  }
}

module.exports = { loginUser, signupUser, logoutUser }