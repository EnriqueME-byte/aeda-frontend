import { Route, Routes } from "react-router-dom"
import { GestionUsuarios } from "../Componentes/gestion/GestionUsuarios"



export const DsahboardRoutes = () => {
    return(
        <>
            <Routes>
                <Route path = "/gestion" element = {<GestionUsuarios />}/>
            </Routes>
        </>
    )
}