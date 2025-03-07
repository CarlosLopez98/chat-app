import { useState } from "react"
import { Link } from "react-router-dom"
import useSignup from "../../hooks/useSignup"

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  })
  const { signup, loading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup<span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="John Doe"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              className="w-full input input-bordered h-10"
            />
          </div>

          <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            {'Already have an account?'}
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup