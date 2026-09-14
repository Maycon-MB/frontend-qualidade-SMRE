import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Container, Table } from 'react-bootstrap';
import Menu from '../HomePage/homepage_menu';
import Footer from '../Components/footer';
import { busca_foto } from '../../services/api';
import './ramais.css';

const RAMAIS_URL = 'https://auto.smrede.tec.br/webhook/ramais';

const normalizar = (txt) => String(txt ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const ordenarAlfa = (lista, extrairTexto) =>
    [...lista].sort((a, b) => normalizar(extrairTexto(a)).localeCompare(normalizar(extrairTexto(b))));

function RamalLinks({ valor }) {
    const numeros = String(valor).split('/').map((n) => n.trim()).filter(Boolean);
    return (
        <span className="ramais-numeros">
            {numeros.map((n, i) => (
                <React.Fragment key={n}>
                    {i > 0 && <span className="ramais-numeros-sep">/</span>}
                    <span className="ramais-numero">{n}</span>
                </React.Fragment>
            ))}
        </span>
    );
}

function TabelaRamais({ itens, mostrarUnidade }) {
    if (itens.length === 0) {
        return <div className="ramais-estado">Nenhum ramal encontrado.</div>;
    }
    return (
        <Table striped hover responsive className="ramais-tabela">
            <colgroup>
                <col className="ramais-col-setor" />
                <col className="ramais-col-responsavel" />
                {mostrarUnidade && <col className="ramais-col-unidade" />}
                <col className="ramais-col-ramal" />
            </colgroup>
            <thead>
                <tr>
                    <th>Setor</th>
                    <th>Responsável</th>
                    {mostrarUnidade && <th>Unidade</th>}
                    <th>Ramal</th>
                </tr>
            </thead>
            <tbody>
                {itens.map((item, i) => (
                    <tr key={i}>
                        <td className="ramais-td-setor">{item.Setor}</td>
                        <td>{item.Responsável || '—'}</td>
                        {mostrarUnidade && <td>{item.Unidade}</td>}
                        <td><RamalLinks valor={item.Ramal} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

function Ramais() {
    const [foto, setFoto] = useState(null);
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState(false);
    const [busca, setBusca] = useState('');
    const [unidadeAtiva, setUnidadeAtiva] = useState(null);
    const navigate = useNavigate();

    const funcionario = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!funcionario || !funcionario[0]) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }
        (async () => {
            try {
                const resultado = await busca_foto(funcionario[0].cpf);
                setFoto(resultado.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const carregarRamais = () => {
        setErro(false);
        setDados(null);
        fetch(RAMAIS_URL)
            .then((r) => r.json())
            .then((json) => setDados(Array.isArray(json.data) ? json.data : []))
            .catch(() => setErro(true));
    };

    useEffect(() => { carregarRamais(); }, []);

    const unidades = useMemo(() => {
        if (!dados) return [];
        const presentes = [...new Set(dados.map((d) => d.Unidade))];
        const ordemFixa = ['Central Administrativa', 'Gestores Unidades', 'Bento Ribeiro'];
        const ordenadas = ordemFixa.filter((u) => presentes.includes(u));
        const restantes = ordenarAlfa(presentes.filter((u) => !ordemFixa.includes(u)), (u) => u);
        return [...ordenadas, ...restantes];
    }, [dados]);

    useEffect(() => {
        if (unidades.length && !unidadeAtiva) setUnidadeAtiva(unidades[0]);
    }, [unidades, unidadeAtiva]);

    const buscando = busca.trim() !== '';

    const resultadosBusca = useMemo(() => {
        if (!dados || !buscando) return [];
        const alvo = normalizar(busca);
        return ordenarAlfa(
            dados.filter((d) =>
                normalizar(d.Setor).includes(alvo) ||
                normalizar(d.Responsável).includes(alvo) ||
                String(d.Ramal).includes(alvo)
            ),
            (d) => d.Setor
        );
    }, [dados, busca, buscando]);

    if (!funcionario || !funcionario[0]) return null;

    const nomePrimeiro = funcionario[0].nome.split(' ')[0];
    const nomeFormatado = nomePrimeiro.charAt(0).toUpperCase() + nomePrimeiro.slice(1).toLowerCase();

    return (
        <div className="Ramais">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 ramais-body">
                <div className="ramais-nav-bar">
                    <button className="ramais-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="ramais-nav-btn" onClick={() => navigate('/')} title="Início">
                        <i className="fa-solid fa-house"></i>
                    </button>
                    <span className="ramais-nav-titulo">Ramais Telefônicos</span>
                </div>

                <div className="ramais-busca-wrapper">
                    <i className="fa-solid fa-magnifying-glass ramais-busca-icon"></i>
                    <input
                        type="text"
                        className="ramais-busca-input"
                        placeholder="Buscar por setor, responsável ou número do ramal..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>

                {erro && (
                    <div className="ramais-estado">
                        <p>Não foi possível carregar os ramais agora. Verifique a conexão e tente novamente.</p>
                        <button className="ramais-retry-btn" onClick={carregarRamais}>Tentar novamente</button>
                    </div>
                )}

                {!erro && !dados && (
                    <div className="ramais-estado">Carregando ramais...</div>
                )}

                {!erro && dados && (
                    <div className="ramais-painel">
                        {buscando ? (
                            <TabelaRamais itens={resultadosBusca} mostrarUnidade />
                        ) : unidades.length > 0 && (
                            <Tabs activeKey={unidadeAtiva} onSelect={setUnidadeAtiva} id="ramais-tab" className="mb-0">
                                {unidades.map((unidade) => {
                                    const itensUnidade = ordenarAlfa(dados.filter((d) => d.Unidade === unidade), (d) => d.Setor);
                                    return (
                                        <Tab key={unidade} eventKey={unidade} title={unidade}>
                                            <div className="ramais-tab-content">
                                                <TabelaRamais itens={itensUnidade} />
                                            </div>
                                        </Tab>
                                    );
                                })}
                            </Tabs>
                        )}
                    </div>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default Ramais;
