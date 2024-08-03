import { useState } from "react"
import useSendMessage from "../../hooks/useSendMessage"
import { BsSend } from "react-icons/bs"

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { sendMessage, loading } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.length == 0) return

    await sendMessage(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          disabled={loading}
        />

        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput