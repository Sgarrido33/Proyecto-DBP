import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "./hooks/useUser"

const authorizedLocations = [/mis-publicaciones/, /crear-publicacion/]

export const AuthRouter = ({children}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const location = useLocation()
  
    useEffect(() => {
      if(user) {
        const isAuthorizedLocation = authorizedLocations.some(loc =>  loc.test(location.pathname))
        if(isAuthorizedLocation) {
          navigate(location.pathname)
        } else {
          navigate('/main')
        }
      }
    }, [])
  
    return  (
      <div>
        {children}
      </div>
    )
  }