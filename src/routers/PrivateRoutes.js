import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext"


export const PrivateRoutes = ({children}) => {
    const {sesion} = useContext(AuthContext);
    return sesion.logeado
        ? children
        : <Navigate to = "/login" />
}