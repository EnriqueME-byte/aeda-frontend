import { useContext, useEffect, useReducer, useState } from "react"
import { useFetch } from "../../hooks/useFetch";
import { modalReducer } from "../../reducers/modalReducer";
import { ModalEditar } from "../Modal/ModalEditar";
import "../../estilos/dashboard.css";
import { useFormulario } from "../../hooks/useFormulario";
import { Logout } from "../../Componentes/Logout/Logout"

export const GestionUsuarios = () => {

    const [accion, setAccion] = useState({
        url: "http://127.0.0.1:8088/api/usuarios/A",
        verbo: "3",
        body : "",
        token: localStorage.getItem('jwt'),
        muestra: false
    });

    const [usuario, setUsuario] = useState({
        usuario: {},
        indice: ''
    });

    const [modal, dispatch] = useReducer(modalReducer, false);

    const { url, verbo, body } = accion;

    const { datos } = useFetch(url, JSON.parse(localStorage.getItem('jwt')), verbo, body);

    useEffect(() => { }, [url]);

    const[form, cambiarInput] = useFormulario({
        fechaInicial : '',
        fechaFinal : ''
    });

    const {nombre,fechaInicial, fechaFinal}  = form;

    const eliminar = (id, i) => {
        setAccion({
            url: `http://127.0.0.1:8088/api/usuarios?id=${id}`,
            verbo: "2",
            id: id
        });
        dispatch(accion);
        datos.data.splice(i, 1);
    }

    const editar = (usuario, i) => {
        const accion = {
            type: "mostrar",
            payload: true
        }
        document.querySelector('body').style.overflowY = 'hidden';
        dispatch(accion);
        setUsuario({
            usuario: usuario,
            indice: i
        });
    }

    const consultaPorEstatus = (s) => {
        setAccion({
            url : `http://127.0.0.1:8088/api/usuarios/${s}`,
            verbo : '3'
        });
    }

    const consulta = () => {

        if(nombre.length > 0){
            setAccion({
                url : `http://127.0.0.1:8088/api/usuarios/buscar?nombre=${nombre}`,
                verbo : '3'
            });
            console.log(datos);
        }else{
            const ini = fechaInicial + " 00:00:00";
            const fin = fechaFinal + " 23:59:59";
            setAccion({
                url : `http://127.0.0.1:8088/api/usuarios/${ini}/${fin}`,
                verbo : '3'
            });
        }

    }


    return (
        <div className="cont-table">
            <div className="cont-consultas">
                <div className="cont-status">
                    <button onClick={()  => consultaPorEstatus('A')} className = "btn-estatus" id = "activo">ACTIVOS</button>
                    <button onClick={()  => consultaPorEstatus('B')} className = "btn-estatus" id = "inactivo">INACTIVOS</button>
                    <button onClick={()  => consultaPorEstatus('R')} className = "btn-estatus" id = "revocado">REVOCADOSS</button>
                </div>


                <div className="cont-querys">
                    <div>
                        <label htmlFor="">Nombre: </label> 
                        <input type="text" 
                            name="nombre"
                            value={nombre}
                            onChange={cambiarInput}
                        />
                    
                    </div>
                    
                    <div>
                        <label>Fecha Alta Inicial: </label> 
                        <input type="date" 
                            name="fechaInicial"
                            value={fechaInicial}
                            onChange={cambiarInput}
                        />
                    </div>
                    <div>
                        <label>Fecha Alta Final:   </label> 
                        <input type="date" 
                            name="fechaFinal"
                            value = {fechaFinal}
                            onChange = {cambiarInput}
                        />
                    </div>
                    <button onClick={consulta}>Buscar</button>

                </div>
                
                <Logout />

            </div>

            {
                modal &&
                <ModalEditar
                    usuario={usuario}
                    dispatch={dispatch}
                    data={datos}
                />
            }
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Login</th>
                        <th>Fecha Alta</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datos &&
                        datos.data.map((usuario, i) => {
                            return (
                                <tr key={usuario.login}>
                                    <th>{usuario.nombre}</th>
                                    <th>{usuario.login}</th>
                                    <th>{usuario.fechaAlta}</th>
                                    <th>{usuario.status}</th>
                                    <th>
                                        <button onClick={() => editar(usuario, i)} className="btn-accion edita">Editar</button>
                                        <button onClick={() => eliminar(usuario.login, i)} className="btn-accion borra">Borrar</button>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}