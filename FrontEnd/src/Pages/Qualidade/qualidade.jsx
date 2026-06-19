import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Tab, Tabs, Accordion, Button } from "react-bootstrap";

import Menu from "../HomePage/homepage_menu";
import Footer from "../Components/footer";
import { busca_foto } from "../../services/api";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './qualidade.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const areas = [
    { id: 'comercial', nome: 'COMERCIAL', tipo: 'PROCESSOS DE NEGÓCIO', color: '#00a859' },
    { id: 'dgp', nome: 'DGP', tipo: 'PROCESSOS DE NEGÓCIO', color: '#00a859' },
    { id: 'gente', nome: 'GENTE\n&\nGESTÃO', tipo: 'PROCESSOS DE SUPORTE', color: '#ffd100' },
    { id: 'produtos', nome: 'GESTÃO\nDE\nPRODUTOS', tipo: 'PROCESSOS DE SUPORTE', color: '#ffd100' },
    { id: 'gestao-financeira', nome: 'GESTÃO\nFINANCEIRA', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#006cb5' },
    { id: 'gov', nome: 'GOVERNANÇA\nCORPORATIVA', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#006cb5' },
    { id: 'juridico', nome: 'JURÍDICO', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#006cb5' },
    { id: 'operacoes', nome: 'OPERAÇÕES', tipo: 'PROCESSOS DE SUPORTE', color: '#ffd100' },
    { id: 'qualidade', nome: 'QUALIDADE', tipo: 'PROCESSOS ESTRATÉGICOS', color: '#006cb5' },
    { id: 'suprimentos', nome: 'SUPRIMENTOS', tipo: 'PROCESSOS DE SUPORTE', color: '#ffd100' },
    { id: 'ti', nome: 'TECNOLOGIA\nDA\nINFORMAÇÃO', tipo: 'PROCESSOS DE SUPORTE', color: '#ffd100' },
    { id: 'unidades', nome: 'UNIDADES', tipo: 'PROCESSOS DE NEGÓCIO', color: '#00a859' },
];

const PDF_URL = '/pdfs/Estrutura_Organizacional.pdf';

function OrganogramaPDF() {
    const [numPages, setNumPages] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div ref={containerRef} className="pdf-container">
            <Document
                file={PDF_URL}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={<div className="pdf-loading">Carregando organograma...</div>}
                error={<div className="pdf-loading">Erro ao carregar o PDF.</div>}
            >
                {numPages &&
                    Array.from({ length: numPages - 1 }, (_, i) => i + 2).map((pageNum) => (
                        <Page
                            key={pageNum}
                            pageNumber={pageNum}
                            width={containerWidth || 800}
                            className="pdf-page"
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))
                }
            </Document>
        </div>
    );
}

const Qualidade = () => {
    const [view, setView] = useState('menu');
    const [foto, setFoto] = useState(null);
    const navigate = useNavigate();


    const funcionario = JSON.parse(localStorage.getItem("user"));

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
        <div className="Qualidade">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 qualidade-body">
                {view === 'menu' && (
                    <>
                        <div className="qualidade-nav-bar">
                            <button className="qualidade-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="qualidade-nav-btn" onClick={() => navigate('/')} title="Início">
                                <i className="fa-solid fa-house"></i>
                            </button>
                        </div>
                        <div className="areas-grid">
                            {areas.map(area => (
                                <div
                                    key={area.id}
                                    className="area-card"
                                    onClick={() => {
                                        if (area.id === 'qualidade') {
                                            setView('qualidade');
                                        } else {
                                            alert('Página em construção para: ' + area.nome.replace(/\n/g, ' '));
                                        }
                                    }}
                                >
                                    <div className="area-card-title" style={{ whiteSpace: 'pre-line' }}>{area.nome}</div>
                                    <div className="area-card-badge" style={{ backgroundColor: area.color }}>
                                        {area.tipo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {view === 'qualidade' && (
                    <>
                        <div className="qualidade-nav-bar">
                            <button className="qualidade-nav-btn" onClick={() => setView('menu')} title="Voltar ao menu">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="qualidade-nav-btn" onClick={() => navigate('/')} title="Início">
                                <i className="fa-solid fa-house"></i>
                            </button>
                        </div>
                        <div className="qualidade-header-bar" style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ flexGrow: 1 }}>QUALIDADE</span>
                        </div>

                        <div className="qualidade-tabs">
                            <Tabs defaultActiveKey="objetivo" id="qualidade-tab" className="mb-0">
                                <Tab eventKey="objetivo" title="OBJETIVO">
                                    <div className="qualidade-tab-content">
                                        <div className="qualidade-texto-politica">
                                            <p>A Política da Qualidade do Santa Mônica Rede de Ensino atribui-se à nossa missão, sendo assim, buscamos integralmente a satisfação das famílias e alunos, o aperfeiçoamento da qualidade dos nossos serviços através da melhoria contínua dos nossos processos, da confiabilidade e segurança da informação e cumprindo com a responsabilidade social e ambiental, sempre respeitando as diferenças.</p>
                                            <p>A área da Qualidade tem como principal objetivo assegurar que os serviços e processos atendam aos requisitos definidos e às expectativas dos alunos e famílias, promovendo a melhoria contínua.</p>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="organograma" title="ORGANOGRAMA">
                                    <div className="qualidade-tab-content qualidade-pdf-wrapper">
                                        <OrganogramaPDF />
                                    </div>
                                </Tab>
                                <Tab eventKey="documentos" title="DOCUMENTOS">
                                    <div className="qualidade-tab-content">
                                        <Accordion defaultActiveKey="2">
                                            <Accordion.Item eventKey="0" className="accordion-item-custom">
                                                <Accordion.Header>PE.01-1.1 - Macroprocessos</Accordion.Header>
                                                <Accordion.Body>
                                                    Conteúdo do documento PE.01-1.1 - Macroprocessos
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1" className="accordion-item-custom">
                                                <Accordion.Header>PE.01-1.1.1 - Política da Qualidade</Accordion.Header>
                                                <Accordion.Body>
                                                    Conteúdo do documento PE.01-1.1.1 - Política da Qualidade
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2" className="accordion-item-custom">
                                                <Accordion.Header>PE.01-1.2.1 - Controle de Informação Documentada</Accordion.Header>
                                                <Accordion.Body>
                                                    <p>Este documento regulamenta os critérios do processo <strong>PG.01-1.2.1 IP - Controle de Informação Documentada</strong>, relacionado à área da Qualidade, com o objetivo de determinar a metodologia para criação, emissão, aprovação, revisão e controle da informação documentada provida e mantida (documentos) pelo Sistema de Gestão da Qualidade (SGQ), bem como, demonstrar a sistemática aplicada para identificar, armazenar, proteger, recuperar, tempo de reter e disponibilizar o SGQ e seus registros.</p>
                                                    <p>O processo se aplica à área da Qualidade, como executor das atividades e aos Facilitadores, Gestores de Processos e a Alta Direção, como responsáveis pela elaboração, auxílio e análise crítica dos documentos.</p>
                                                    <Button className="btn-visualizar-doc">
                                                        VISUALIZAR DOCUMENTO <i className="fa-solid fa-angles-right"></i>
                                                    </Button>
                                                    <div style={{ clear: 'both' }}></div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3" className="accordion-item-custom">
                                                <Accordion.Header>PE.01-1.2.1.5 IT - Elaborar fluxo de processos</Accordion.Header>
                                                <Accordion.Body>
                                                    Conteúdo do documento PE.01-1.2.1.5 IT - Elaborar fluxo de processos
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default Qualidade;
