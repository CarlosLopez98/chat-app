import { useState } from "react"
import { useAuthContext } from "../context/AuthContenxt"
import toast from "react-hot-toast"

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signup = async ({ fullName, username, email, password }) => {
    const sucess = handleInputErrors({ fullName, username, email, password })

    if (!sucess) return

    const [name, surname] = fullName.split(' ')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, username, email, password })
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

  return { signup, loading }
}

const handleInputErrors = ({ fullName, username, email, password }) => {
  if (!fullName || !username || !email || !password) {
    toast.error('Please fill all the fields')
    return false
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error('Email field is invalid')
    return false
  }

  if (password.length < 6) {
    toast.error('Password must be at leats 6 characters')
    return false
  }

  return true
}

export default useSignup