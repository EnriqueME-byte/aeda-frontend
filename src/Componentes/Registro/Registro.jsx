import {useFormulario} from "../../hooks/useFormulario";

//import "../../estilos/login.css";
import { useEffect, useReducer, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import { registraReducer } from "../../reducers/registraReducer";

export const Registro = () => {

    const [form, cambiarInput] = useFormulario({
        login : "",
        password : "",
        email : "",
        nombre : "",
        paterno : "",
        materno : ""
    });

    
    const [state, dispatch] = useReducer(registraReducer);
    
    const [accion, setAccion] = useState({
        url : '',
        verbo : ''
    });
    
    const {url, verbo} = accion;
    
    const {datos} = useFetch(url, {}, verbo, form);
    
    const {login, password, nombre, email, paterno, materno } = form;
    
    useEffect(() =>{
        console.log("cambia");
    },[login,email]);

    const registrar = (e) => {
        e.preventDefault(); 
        console.log("registrar");
        // setAccion({
        //     url : 'http://localhost:8088/api/usuarios/registro',
        //     verbo : '1'
        // });
    }

    return (
        <form onSubmit={registrar}>
            <div className="container-login">
                <h3>Registrar</h3>
                <input 
                    type="text" 
                    placeholder="Usuario"
                    name="login"
                    value={login}
                    onChange = {cambiarInput}
                />
                <input type="email" 
                    placeholder="Correo Electrónico"
                    name="email"
                    value={email}
                    onChange = {cambiarInput}
                 />
                 <input type="text" 
                    placeholder = "Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={cambiarInput}
                 />
                 <input type="text" 
                    placeholder="Apellido materno"
                    name="materno"
                    value={materno}
                    onChange = {cambiarInput}
                 />
                 <input type="text" 
                    placeholder="Apellido paterno"
                    name="paterno"
                    value={paterno}
                    onChange = {cambiarInput}
                 />
                <input 
                    type="text"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={cambiarInput}
                />
                <button id="btn-login">Registrar</button>
                <span>Ya tienes cuenta? <NavLink to ="/login"><b>Ingresar</b></NavLink></span>
            </div>
        </form>
    )
}