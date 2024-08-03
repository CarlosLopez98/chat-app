import { createContext, useContext, useState } from "react";

export const ChatContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => useContext(ChatContext)

export const ChatContextProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])

  return <ChatContext.Provider value={{ selectedChat, setSelectedChat, messages, setMessages }}>
    {children}
  </ChatContext.Provider>
}