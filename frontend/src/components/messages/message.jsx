const Message = ({ message, avatar, mine }) => {
  return (
    <div className={`chat ${mine ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble ${mine ? 'chat-bubble-success' : 'chat-bubble'}`}>{message.content}</div>
      <div className="chat-footer opacity-50">12:46</div>
    </div>
  )
}

export default Message