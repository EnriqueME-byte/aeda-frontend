import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext"
import { types } from "../../tipos/types";


export const Logout = () =>{


    const {dispatch} = useContext(AuthContext);

    const navigate = useNavigate;

    const logout = () =>{
        dispatch({type : types.logout});
        navigate("/login", {
            replace: true
        });
    }

    return(
        <div>
            <button onClick={logout}>Salir</button>
        </div>
    )
}