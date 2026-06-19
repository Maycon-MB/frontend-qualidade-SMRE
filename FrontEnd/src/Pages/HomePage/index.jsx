import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { lista_proventos, envia_CC, busca_foto } from "../../services/api";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Row, Col, Container } from "react-bootstrap";

import Atalhos from '../Components/Atalhos';
import ComunicadosAcordeon from '../Components/ComunicadosAcordeon';
import Menu from "./homepage_menu";
import Footer from '../Components/footer';

import './index.css';

const schema = yup.object({}).required();

const Homepage = () => {

    const funcionario = JSON.parse(localStorage.getItem("user"));

    const { authenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [foto, setFoto] = useState(null);

    const { register, setValue, handleSubmit, setFocus, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!funcionario || !funcionario[0]) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }
        (async () => {
            const resultado = await busca_foto(funcionario[0].cpf);
            setFoto(resultado.data);
        })();
    }, []);

    if (!funcionario || !funcionario[0]) return null;

    const nomePrimeiro = funcionario[0].nome.split(' ')[0];
    const nomeFormatado = nomePrimeiro.charAt(0).toUpperCase() + nomePrimeiro.slice(1).toLowerCase();

    return (
        <div className="Homepage">
            <Menu foto={foto} nome={nomeFormatado} />

            <Container fluid className="homepage-content px-4 pt-3 pb-3">
                <Row className="gx-4 homepage-row">
                    <Col lg={5} md={12} className="homepage-col">
                        <Atalhos />
                    </Col>
                    <Col lg={7} md={12} className="homepage-col">
                        <ComunicadosAcordeon />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default Homepage;
