import { useChatContext } from "../../context/ChatContext"
import { useSocketContext } from "../../context/SocketContext"

const Chat = ({ chat, lastIdx }) => {
  const { selectedChat, setSelectedChat } = useChatContext()
  const isSelected = selectedChat?.id === chat.id
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(chat.id.toString())

  return (
    <>
      <div onClick={() => setSelectedChat(chat)}
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? 'bg-sky-500' : ''}
        `}>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={chat.avatar} alt="User avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col justify-between">
            <p className="font-bold text-gray-200">{chat.name} {chat.surname}</p>
            <p>@{chat.username}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  )
}

export default Chat