import { useState } from "react"
import { useChatContext } from "../context/ChatContext"
import toast from "react-hot-toast"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChatContext()

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedChat.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message, chat_id: selectedChat.chat.id })
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages([...messages, data])
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage