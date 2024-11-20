import { useEffect, useReducer } from "react"
import { AuthContext } from "../auth/AuthContext"
import { authReducer } from "../reducers/authReducer";
import { AppRouter } from "../routers/AppRouter"

const init = () => {
    return JSON.parse(localStorage.getItem('jwt')) || {logeado : false};
}

export const MainApp = () => {

    const [sesion,dispatch] = useReducer(authReducer,{},init);
    
    useEffect(() => {
        if(sesion) localStorage.setItem('jwt',JSON.stringify(sesion));
    },[sesion]);
    
    return(
        <AuthContext.Provider value = {{sesion,dispatch}}>
            <AppRouter />
        </AuthContext.Provider>
    )
}