
import  { PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { Rootstate } from "../redux/store"
import { Navigate } from "react-router-dom"

type Props = PropsWithChildren
const ProtectedRoute = ({children}:Props) => {
  const {isLoggedIn} = useSelector((state:Rootstate)=>state.user)

  return isLoggedIn ? children : <Navigate to="/auth" replace={true}/>
}

export default ProtectedRoute