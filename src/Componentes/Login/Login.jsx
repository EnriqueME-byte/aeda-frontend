import {useFormulario} from "../../hooks/useFormulario";

import "../../estilos/login.css";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { types } from "../../tipos/types";
import { AuthContext } from "../../auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {

    const [form, cambiarInput] = useFormulario({
        login : "",
        password : ""
    });

    const [accion, setAccion] = useState({
        url : '',
        verbo : ''
    });

    const {url, verbo} = accion;

    const { dispatch } = useContext(AuthContext);

    const {datos} = useFetch(url, {},verbo, form);

    const {login, password } = form;


    const logear = (e) => {
        e.preventDefault(); 
        setAccion({
            url : 'http://localhost:8088/api/usuarios/login',
            verbo : '1'
        });
        
        if(datos){
            if(datos.status === "success"){
                const action = {
                    type: types.login,
                    payload: {token: datos.token}
                }
                dispatch(action);
            }
        }
    }

    return (
        <form onSubmit={logear}>
            <div className="container-login">
                <h3>Ingresar</h3>
                <input 
                    type="text" 
                    placeholder="Usuario"
                    name="login"
                    value={login}
                    onChange = {cambiarInput}
                />
                <input 
                    type="text"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={cambiarInput}
                />
                <button id="btn-login">Ingresar</button>
                <span>No tienes cuenta? <NavLink to ="/registro"><b>Registrate</b></NavLink></span>
            </div>
        </form>
    )
}