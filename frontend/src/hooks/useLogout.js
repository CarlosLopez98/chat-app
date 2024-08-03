import { useState } from "react"
import { useAuthContext } from "../context/AuthContenxt"
import toast from "react-hot-toast"

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { authUser, setAuthUser } = useAuthContext()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (authUser) {
        setAuthUser(null)
        localStorage.removeItem('chat-user')
      }

      toast.success('Logged out successfuly')
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { logout, loading }
}

export default useLogout