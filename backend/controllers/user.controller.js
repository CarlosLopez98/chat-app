const { sequelize } = require("../config/database")
const { QueryTypes } = require("sequelize")
const Chat = require("../models/chat.model")
const User = require("../models/user.model")
const { Op, col } = require('sequelize')

const getUsersForChat = async (req, res) => {
  try {
    const loggedInUserId = req.user.id

    // const allUsers = await User.findAll({
    //   attributes: { exclude: ['password'] },
    //   include: [{
    //     model: Chat,
    //     as: 'chats',
    //     where: {
    //       [Op.or]: [
    //         { user1_id: col('users.id') },
    //         { user2_id: col('users.id') },
    //       ],
    //       [Op.not]: { user1_id: loggedInUserId, user2_id: loggedInUserId }
    //     },
    //     required: true
    //   }],
    //   where: {
    //     id: { [Op.ne]: loggedInUserId }
    //   }
    // })

    const users = await sequelize.query(`
      SELECT u.id, u.name, u.surname, u.username, u.email, u.avatar, c.id AS chat_id, c.user1_id, c.user2_id
      FROM users u
      JOIN chats c ON u.id = c.user1_id OR u.id = c.user2_id
      WHERE (c.user1_id = ${loggedInUserId} OR c.user2_id = ${loggedInUserId}) AND u.id != ${loggedInUserId};
    `, { type: QueryTypes.SELECT })

    const chatUsers = []
    for (const user of users) {
      chatUsers.push({
        ...user,
        chat_id: undefined,
        user1_id: undefined,
        user2_id: undefined,
        chat: {
          id: user.chat_id,
          user1_id: user.user1_id,
          user2_id: user.user2_id
        }
      })
    }

    return res.status(200).json({ users: chatUsers })
  } catch (e) {
    console.log('Error in the User controller: ', e.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = { getUsersForChat }