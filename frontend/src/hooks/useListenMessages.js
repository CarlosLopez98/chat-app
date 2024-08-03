import { useEffect } from "react"
import { useChatContext } from "../context/ChatContext"
import { useSocketContext } from "../context/SocketContext"

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useChatContext()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => socket?.off('newMessage')
  }, [socket, setMessages, messages])
}

export default useListenMessages