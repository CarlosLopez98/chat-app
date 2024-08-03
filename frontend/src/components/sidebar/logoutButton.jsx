import useLogout from '../../hooks/useLogout'
import { BiLogOut } from 'react-icons/bi'

const LogoutButton = () => {
  const { logout, loading } = useLogout()

  return (
    <div className="mt-auto">
      {!loading
        ? <BiLogOut
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        />
        : <span className="loading loading-spinner"></span>
      }
    </div>
  )
}

export default LogoutButton