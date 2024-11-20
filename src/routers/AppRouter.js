import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes"; 
import { Login } from "../Componentes/Login/Login";
import { Registro } from "../Componentes/Registro/Registro";
import { DsahboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes>
                        <Login />
                    </PublicRoutes>
                }
                />
                <Route path="/registro" element={
                    <PublicRoutes>
                        <Registro />
                    </PublicRoutes>
                }
                />

                <Route path = "/*" element = {
                    <PrivateRoutes>
                        <DsahboardRoutes />
                    </PrivateRoutes>
                } 
                
                />

            </Routes>

        </BrowserRouter>
    )
}