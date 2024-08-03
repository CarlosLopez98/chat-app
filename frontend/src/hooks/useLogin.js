import { useState } from "react"
import { useAuthContext } from "../context/AuthContenxt"
import toast from "react-hot-toast"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password })

    if (!success) return

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}

const handleInputErrors = ({ email, password }) => {
  if (!email || !password) {
    toast.error('Please fill all the fields')
    return false
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error('Email field is invalid')
    return false
  }

  return true
}

export default useLogin