import { useContext } from "react"
import { Navigate } from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

export const PublicRoutes = ({children}) => {
    const {sesion} = useContext(AuthContext);
    return !sesion.logeado
    ? children
    : <Navigate to = "/gestion" />
}