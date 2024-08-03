const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={'https://avatar.iran.liara.run/public/boy?username=carloslpz'} alt="user avatar" />
        </div>
      </div>
      <div className="chat-bubble chat-bubble-success">It was said that you would, destroy the Sith, not join them.</div>
      <div className="chat-footer opacity-50">12:46</div>
    </div>
  )
}

export default Message