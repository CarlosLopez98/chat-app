const Chat = require("../models/chat.model")
const Message = require("../models/message.model")
const { Op } = require('sequelize')
const { getRecieverSocketId, io } = require("../socket/socket")

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user.id

    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          {
            user1_id: senderId,
            user2_id: userToChatId
          },
          {
            user1_id: userToChatId,
            user2_id: senderId
          },
        ]
      }
    })

    if (!chat) {
      chat = await Chat.create({
        user1_id: senderId,
        user2_id: userToChatId
      })
      return res.status(200).json({ messages: [] })
    }

    // Bring the messages from Message model
    const messages = await Message.findAll({
      where: { chat_id: chat.id }
    })

    res.status(200).json({ messages })
  } catch (e) {
    console.log('Error in the Message controller: ', e.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

const sendMessage = async (req, res) => {
  try {
    const { content, chat_id } = req.body
    const { id: recieverId } = req.params
    const senderId = req.user.id

    let chat = await Chat.findByPk(chat_id)

    if (!chat) {
      chat = await Chat.findOne({
        where: {
          [Op.or]: [
            {
              user1_id: senderId,
              user2_id: recieverId
            },
            {
              user1_id: recieverId,
              user2_id: senderId
            },
          ]
        }
      })
    }

    if (!chat) {
      chat = await Chat.create({
        user1_id: senderId,
        user2_id: recieverId
      })
    }

    const newMessage = Message.build({
      content,
      chat_id: chat.id,
      sender_id: senderId,
      receiver_id: Number(recieverId)
    })

    await newMessage.save()

    // Socket io go here
    // SOCKET
    const receiverSocketId = getRecieverSocketId(recieverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (e) {
    console.log('Error in the Message controller: ', e.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = { getMessages, sendMessage }