import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (cpf, password) => {
        console.log("login auth :", { cpf, password });

        let response;
        try {
            response = await createSession(cpf, password);
        } catch (error) {
            console.error("login error:", error);
            toast.error("Não foi possível conectar ao servidor. Verifique sua conexão.");
            return;
        }

        console.log("response:", response.data);

        const loggedUser = response.data.acesso;
        const token = response.data.token;

        if (!token || !loggedUser) {
            toast.warning("Usuário ou chave não encontrados.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login", { state: "false" });
            return;
        }

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navigate("/");
    };

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
