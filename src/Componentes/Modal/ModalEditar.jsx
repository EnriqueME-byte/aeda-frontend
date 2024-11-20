import { useFormulario } from "../../hooks/useFormulario";
import "../../estilos/modal.css";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const ModalEditar = ({ usuario, dispatch, data }) => {

    const [form, cambiarInput ] = useFormulario({
        login : usuario.usuario.login,
        nombre : usuario.usuario.nombre,
        apellidoPaterno : usuario.usuario.apellidoPaterno,
        apellidoMaterno : usuario.usuario.apellidoMaterno,
        status : usuario.usuario.status
    });

    const {login, nombre, apellidoMaterno, apellidoPaterno,status} = form;

    const cancelar = () => {
        dispatch(false);
        document.querySelector('body').style.overflowY = "auto";
    }

    const [cuerpo,setCuerpo] = useState({
        url :'',
        body : {}
    });

    const {url, body} = cuerpo;

    const actualizar = (e) => {
        const bodyR = {
            login : form.login,
            nombre : form.nombre,
            apellidoMaterno : form.apellidoMaterno,
            apellidoPaterno : form.apellidoPaterno,
            status : form.status
        }
        setCuerpo({
            url : 'http://127.0.0.1:8088/api/usuarios',
            body : bodyR
        });
        setTimeout(()=>{
            dispatch(false);
        },100);
        data.data[usuario.indice] = form;
        document.querySelector('body').style.overflowY = "auto";

    }

    const { datos } = useFetch(url,JSON.parse( localStorage.getItem('jwt')), '4', body);

    return (
        <div className="capa">
            <div className="modal-form">
                <h2>Editar usuario</h2>
                <input type="text" 
                    readOnly
                    name="login"
                    value={login}
                />
                <input type="text"
                    placeholder="Nombre de usuario"
                    name="nombre"
                    value={nombre}
                    onChange={cambiarInput}
                />
                <input type="text"
                    placeholder="Apellido paterno"
                    name="apellidoMaterno"
                    value={apellidoMaterno}
                    onChange={cambiarInput}
                />
                <input type="text"
                    placeholder="Apellido materno"
                    name="apellidoPaterno"
                    value={apellidoPaterno}
                    onChange={cambiarInput}
                />

                <select name="status" onChange={cambiarInput}>
                    <option>Estatus</option>
                    <option value="A">Activo</option>
                    <option value="B">Inactivo</option>
                    <option value="R">Revocado</option>
                </select>

                <div className="btn-cont">
                    <button onClick={actualizar} className="btn-modal acepta">Aceptar</button>
                    <button onClick={cancelar} className="btn-modal cancela">Cancelar</button>
                </div>
            </div>
        </div>
    )
}