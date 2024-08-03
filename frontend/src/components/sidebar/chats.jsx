import useGetChats from "../../hooks/useGetChats"
import Chat from "./chat"

const Chats = () => {
  const { chats, loading } = useGetChats()

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {chats?.map((chat, id) => (
        <Chat key={chat.id} chat={chat} lastIdx={id === chats.length - 1} />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Chats