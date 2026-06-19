import React, { Children, useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useParams
} from "react-router-dom";

import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage/index.jsx';
import EnviaReset from './Pages/LoginPage/enviaReset.jsx';
import ResetSenha from './Pages/Usuarios/resetsenha.jsx';
import UploadCC from './Pages/uploadCC/uploadCC.jsx';
import UploadGPT from './Pages/uploadCC/uploadGPT.jsx';
import ContaDocs from './Pages/uploadCC/contaDocs.jsx';
import ListaDocs from "./Pages/uploadCC/listaDocs";
import Qualidade from "./Pages/Qualidade/qualidade";
import UploadGPTFotos from "./Pages/uploadCC/uploadGPTFotos.jsx";
import ContraCheque from "./Pages/HomePage/contra_cheque.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, AuthContext } from "./contexts/auth";

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        if (!authenticated) {
            return <Navigate to="/login" />
        }
        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/enviaReset" element={<EnviaReset />} />
                    <Route exact path="/" element={<Private><HomePage /></Private>} />
                    <Route exact path="/uploadCC" element={<Private><UploadCC /></Private>} />
                    <Route exact path="/uploadGPT" element={<Private><UploadGPT /></Private>} />
                    <Route exact path="/contaDocs" element={<Private><ContaDocs /></Private>} />
                    <Route exact path="/listaDocs" element={<Private><ListaDocs /></Private>} />
                    <Route exact path="/resetSenha/:token" element={<ResetSenha />} />
                    <Route exact path="/qualidade" element={<Private><Qualidade /></Private>} />
                    <Route exact path="/contraCheque" element={<Private><ContraCheque /></Private>} />
                    <Route exact path="/uploadGPTFotos" element={<Private><UploadGPTFotos /></Private>} />

                </Routes>
                <ToastContainer />
            </AuthProvider>

        </Router>

    )
}

export default AppRoutes;