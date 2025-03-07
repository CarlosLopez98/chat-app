import { useEffect } from "react"
import { useChatContext } from "../../context/ChatContext"
import MessageInput from "./messageInput"
import Messages from "./messages"
import { TiMessages } from "react-icons/ti"
import { useAuthContext } from "../../context/AuthContenxt"

const MessageContainer = () => {
  const { selectedChat, setSelectedChat } = useChatContext()
  const noChatSelected = selectedChat ? false : true

  useEffect(() => {
    return () => setSelectedChat(null)
  }, [setSelectedChat])

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected
        ? <NoChatSelected />
        : <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">{selectedChat.name} {selectedChat.surname}</span>
          </div>
          {/* Messages */}
          <Messages />
          <MessageInput />
        </>
      }
    </div>
  )
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome ✋ {authUser.name} {authUser.surname}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  )
}

export default MessageContainer