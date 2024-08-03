import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetChats = () => {
  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/users')
        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setChats(data.users)
      } catch (e) {
        toast.error(e.message)
      } finally {
        setLoading(false)
      }
    }

    getChats()
  }, [])

  return { chats, loading }
}

export default useGetChats