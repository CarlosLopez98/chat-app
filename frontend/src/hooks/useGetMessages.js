import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useChatContext } from '../context/ChatContext'

const useGetMessages = (receiver_id) => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChatContext()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/messages/${receiver_id}`)
        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setMessages(data.messages)
      } catch (e) {
        toast.error(e.message)
      } finally {
        setLoading(false)
      }
    }

    if (selectedChat?.id) getMessages()
  }, [receiver_id, selectedChat, setMessages])

  return { messages, loading }
}

export default useGetMessages