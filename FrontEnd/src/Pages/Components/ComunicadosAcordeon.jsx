import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import './ComunicadosAcordeon.css';

const API_URL = 'https://auto.smrede.tec.br/webhook/Emails';

function formatarData(isoString) {
    if (!isoString) return '—';
    const d = new Date(isoString);
    if (isNaN(d)) return '—';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const RETRY_MS = 5000;
const POLL_MS = 60000;

const ComunicadosAcordeon = () => {
    const [comunicados, setComunicados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    const fetchComunicados = (showLoading = false) => {
        if (showLoading) setLoading(true);
        setErro(false);
        fetch(API_URL)
            .then(r => r.json())
            .then(data => {
                const ordenados = [...data]
                    .sort((a, b) => new Date(b.data) - new Date(a.data))
                    .slice(0, 5);
                setComunicados(ordenados);
                setLoading(false);
            })
            .catch(() => {
                if (showLoading) setErro(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchComunicados(true);
        const poll = setInterval(() => fetchComunicados(false), POLL_MS);
        return () => clearInterval(poll);
    }, []);

    useEffect(() => {
        if (!erro) return;
        const timer = setInterval(() => fetchComunicados(true), RETRY_MS);
        return () => clearInterval(timer);
    }, [erro]);

    return (
        <div className="comunicados-wrapper">
            <div className="comunicados-header-bar">
                <svg className="comunicados-icone-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <h5 className="comunicados-titulo">ÚLTIMOS COMUNICADOS</h5>
            </div>

            {loading && (
                <div className="comunicados-estado">Carregando comunicados...</div>
            )}


            {!loading && !erro && (
                <Accordion flush className="comunicados-accordion">
                    {comunicados.map((item, index) => (
                        <Accordion.Item key={item.id} eventKey={String(index)} className="comunicado-item">
                            <Accordion.Header>
                                <div className="comunicado-header-content">
                                    <span className="comunicado-titulo-texto">{item.assunto}</span>
                                    <span className="comunicado-data-badge">{formatarData(item.data)}</span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="comunicado-body">
                                {item.html
                                    ? <div dangerouslySetInnerHTML={{ __html: item.html }} />
                                    : <p className="comunicado-sem-conteudo">Conteúdo do comunicado não disponível.</p>
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default ComunicadosAcordeon;
