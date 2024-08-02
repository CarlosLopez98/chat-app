const Chat = require("../models/chat.model")
const User = require("../models/user.model")
const { Op, col } = require('sequelize')

const getUsersForChat = async (req, res) => {
  try {
    const loggedInUserId = req.user.id

    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{
        model: Chat,
        where: {
          [Op.or]: [
            { user1_id: col('users.id') },
            { user2_id: col('users.id') },
          ],
          [Op.not]: { user1_id: loggedInUserId, user2_id: loggedInUserId }
        },
        required: true
      }],
      where: {
        id: { [Op.ne]: loggedInUserId }
      }
    })

    return res.status(200).json({ users: allUsers })
  } catch (e) {
    console.log('Error in the User controller: ', e.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = { getUsersForChat }