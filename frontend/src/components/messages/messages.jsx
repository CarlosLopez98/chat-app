import { useAuthContext } from "../../context/AuthContenxt"
import { useChatContext } from "../../context/ChatContext"
import useGetMessages from "../../hooks/useGetMessages"
import Message from "./message"
import getRecieverId from "../../utils/getReceiverId"
import useListenMessages from "../../hooks/useListenMessages"

const Messages = () => {
  const { authUser } = useAuthContext()
  const { selectedChat } = useChatContext()
  const { messages, loading } = useGetMessages(
    getRecieverId(authUser.id, selectedChat.chat.user1_id, selectedChat.chat.user2_id)
  )
  useListenMessages()

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.map((message) => (
        <Message
          key={message.id}
          message={message}
          avatar={message.sender_id === authUser.id ? authUser.avatar : selectedChat.avatar}
          mine={message.sender_id == authUser.id}
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Messages