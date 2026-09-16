import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Dropdown } from 'react-bootstrap';
import Menu from '../HomePage/homepage_menu';
import Footer from '../Components/footer';
import { busca_foto } from '../../services/api';
import './aniversariantes.css';

const NIVER_URL = 'https://auto.smrede.tec.br/webhook/niver/';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Unidades que aparecem primeiro na lista; as demais seguem em ordem alfabética.
const ORDEM_FIXA = ['Centro Administrativo'];

const PALAVRAS_MINUSCULAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

const normalizar = (txt) => String(txt ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const ordenarAlfa = (lista, extrairTexto) =>
    [...lista].sort((a, b) => normalizar(extrairTexto(a)).localeCompare(normalizar(extrairTexto(b))));

// Os nomes vêm em maiúsculas do sistema de RH: "MARIA DA SILVA" -> "Maria da Silva".
const tituloCaso = (txt) =>
    String(txt ?? '')
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((palavra, i) => (i > 0 && PALAVRAS_MINUSCULAS.has(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)))
        .join(' ');

// As datas chegam como meia-noite de Brasília em UTC (T03:00:00.000Z); ler em UTC evita trocar o dia.
const diaEMes = (iso) => {
    const data = new Date(iso);
    return { dia: data.getUTCDate(), mes: data.getUTCMonth() + 1 };
};

const doisDigitos = (n) => String(n).padStart(2, '0');

const ordenarPorDia = (lista) =>
    [...lista].sort((a, b) => a.dia - b.dia || normalizar(a.nome).localeCompare(normalizar(b.nome)));

// Dropdown com caixas de marcar: nenhuma unidade marcada equivale a "Todas as unidades".
function FiltroUnidades({ unidades, contagem, total, selecionadas, onChange, desabilitado }) {
    const todas = selecionadas.length === 0 || selecionadas.length === unidades.length;
    const totalSelecionado = selecionadas.reduce((soma, u) => soma + (contagem[u] || 0), 0);

    let rotulo = `Todas as unidades (${total})`;
    if (!todas && selecionadas.length === 1) rotulo = `${selecionadas[0]} (${totalSelecionado})`;
    if (!todas && selecionadas.length > 1) rotulo = `${selecionadas.length} unidades (${totalSelecionado})`;

    const alternar = (unidade) =>
        onChange(selecionadas.includes(unidade) ? selecionadas.filter((u) => u !== unidade) : [...selecionadas, unidade]);

    return (
        <Dropdown autoClose="outside" className="aniversariantes-unidades">
            <Dropdown.Toggle
                as="button"
                type="button"
                className="aniversariantes-controle aniversariantes-unidades-toggle"
                disabled={desabilitado}
                aria-label="Filtrar por unidade"
            >
                <i className="fa-solid fa-building aniversariantes-controle-icone"></i>
                <span className="aniversariantes-unidades-rotulo">{rotulo}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="aniversariantes-unidades-menu">
                <div className="aniversariantes-unidades-cabecalho">
                    <span>Unidades</span>
                    <button
                        type="button"
                        className="aniversariantes-unidades-limpar"
                        onClick={() => onChange([])}
                        disabled={selecionadas.length === 0}
                    >
                        Limpar seleção
                    </button>
                </div>
                <label className={`aniversariantes-unidades-item aniversariantes-unidades-todas ${todas ? 'is-marcada' : ''}`}>
                    <input type="checkbox" checked={todas} onChange={() => onChange([])} />
                    <span className="aniversariantes-unidades-nome">Todas as unidades</span>
                    <span className="aniversariantes-unidades-contagem">{total}</span>
                </label>
                <div className="aniversariantes-unidades-lista">
                    {unidades.map((unidade) => {
                        const marcada = selecionadas.includes(unidade);
                        return (
                            <label key={unidade} className={`aniversariantes-unidades-item ${marcada ? 'is-marcada' : ''}`}>
                                <input type="checkbox" checked={marcada} onChange={() => alternar(unidade)} />
                                <span className="aniversariantes-unidades-nome">{unidade}</span>
                                <span className="aniversariantes-unidades-contagem">{contagem[unidade] || 0}</span>
                            </label>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function TabelaAniversariantes({ itens, mostrarUnidade, hoje }) {
    if (itens.length === 0) {
        return <div className="aniversariantes-estado">Nenhum aniversariante encontrado.</div>;
    }
    return (
        <Table striped hover responsive className="aniversariantes-tabela">
            <colgroup>
                <col className="aniversariantes-col-dia" />
                <col className="aniversariantes-col-nome" />
                <col className="aniversariantes-col-funcao" />
                <col className="aniversariantes-col-setor" />
                {mostrarUnidade && <col className="aniversariantes-col-unidade" />}
            </colgroup>
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Setor</th>
                    {mostrarUnidade && <th>Unidade</th>}
                </tr>
            </thead>
            <tbody>
                {itens.map((item) => {
                    const ehHoje = hoje && item.dia === hoje.dia && item.mes === hoje.mes;
                    return (
                        <tr key={item.chave} className={ehHoje ? 'aniversariantes-hoje' : undefined}>
                            <td className="aniversariantes-td-dia">
                                {doisDigitos(item.dia)}/{doisDigitos(item.mes)}
                                {ehHoje && <i className="fa-solid fa-cake-candles aniversariantes-icone-hoje" title="Aniversário hoje"></i>}
                            </td>
                            <td className="aniversariantes-td-nome">{item.nome}</td>
                            <td>{item.funcao}</td>
                            <td>{item.setor}</td>
                            {mostrarUnidade && <td>{item.unidade}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

function Aniversariantes() {
    const agora = new Date();
    const mesAtual = agora.getMonth() + 1;

    const [foto, setFoto] = useState(null);
    const [mes, setMes] = useState(mesAtual);
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState(false);
    const [busca, setBusca] = useState('');
    const [unidadesSelecionadas, setUnidadesSelecionadas] = useState([]);
    const controleRef = useRef(null);
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

    const carregar = useCallback((mesEscolhido) => {
        if (controleRef.current) controleRef.current.abort();
        const controle = new AbortController();
        controleRef.current = controle;

        setErro(false);
        setDados(null);
        fetch(`${NIVER_URL}?mes=${mesEscolhido}`, { signal: controle.signal })
            .then((r) => r.text())
            .then((texto) => {
                // O webhook responde com corpo vazio quando não há dados para o mês.
                const lista = texto.trim() ? JSON.parse(texto) : [];
                const ativos = (Array.isArray(lista) ? lista : [])
                    .filter((p) => !p.dtdemissao && p.dtnascimento)
                    .map((p, i) => {
                        const { dia, mes: mesNasc } = diaEMes(p.dtnascimento);
                        return {
                            chave: `${p.empresa}-${p.nmfuncionario}-${i}`,
                            dia,
                            mes: mesNasc,
                            nome: tituloCaso(p.nmfuncionario),
                            funcao: tituloCaso(p.nmfuncao),
                            setor: tituloCaso(p.nmdepartamento),
                            unidade: String(p.nomeempresa ?? '').trim(),
                        };
                    });
                setDados(ativos);
            })
            .catch((e) => {
                if (e.name !== 'AbortError') setErro(true);
            });
    }, []);

    useEffect(() => {
        carregar(mes);
        return () => controleRef.current?.abort();
    }, [mes, carregar]);

    const unidades = useMemo(() => {
        if (!dados) return [];
        const presentes = [...new Set(dados.map((d) => d.unidade))].filter(Boolean);
        const fixas = ORDEM_FIXA.filter((u) => presentes.includes(u));
        const restantes = ordenarAlfa(presentes.filter((u) => !ORDEM_FIXA.includes(u)), (u) => u);
        return [...fixas, ...restantes];
    }, [dados]);

    // Ao trocar de mês, desmarca unidades que não têm aniversariantes no mês carregado.
    useEffect(() => {
        if (!dados) return;
        setUnidadesSelecionadas((atuais) => {
            const validas = atuais.filter((u) => unidades.includes(u));
            return validas.length === atuais.length ? atuais : validas;
        });
    }, [dados, unidades]);

    const contagemPorUnidade = useMemo(() => {
        const contagem = {};
        if (!dados) return contagem;
        dados.forEach((d) => {
            contagem[d.unidade] = (contagem[d.unidade] || 0) + 1;
        });
        return contagem;
    }, [dados]);

    const buscando = busca.trim() !== '';

    const itensVisiveis = useMemo(() => {
        if (!dados) return [];
        const alvo = normalizar(busca);
        return ordenarPorDia(
            dados.filter((d) =>
                (unidadesSelecionadas.length === 0 || unidadesSelecionadas.includes(d.unidade)) &&
                (!buscando ||
                    normalizar(d.nome).includes(alvo) ||
                    normalizar(d.funcao).includes(alvo) ||
                    normalizar(d.setor).includes(alvo))
            )
        );
    }, [dados, busca, buscando, unidadesSelecionadas]);

    if (!funcionario || !funcionario[0]) return null;

    const nomePrimeiro = funcionario[0].nome.split(' ')[0];
    const nomeFormatado = nomePrimeiro.charAt(0).toUpperCase() + nomePrimeiro.slice(1).toLowerCase();

    const hoje = mes === mesAtual ? { dia: agora.getDate(), mes: mesAtual } : null;

    return (
        <div className="Aniversariantes">
            <Menu foto={foto} nome={nomeFormatado} />
            <Container fluid className="px-4 aniversariantes-body">
                <div className="aniversariantes-nav-bar">
                    <button className="aniversariantes-nav-btn" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')} title="Página anterior">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="aniversariantes-nav-btn" onClick={() => navigate('/')} title="Início">
                        <i className="fa-solid fa-house"></i>
                    </button>
                    <span className="aniversariantes-nav-titulo">Aniversariantes do Mês</span>
                </div>

                <div className="aniversariantes-filtros">
                    <div className="aniversariantes-busca-wrapper">
                        <i className="fa-solid fa-magnifying-glass aniversariantes-busca-icon"></i>
                        <input
                            type="text"
                            className="aniversariantes-busca-input"
                            placeholder="Buscar por nome, função ou setor..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <FiltroUnidades
                        unidades={unidades}
                        contagem={contagemPorUnidade}
                        total={dados ? dados.length : 0}
                        selecionadas={unidadesSelecionadas}
                        onChange={setUnidadesSelecionadas}
                        desabilitado={!dados || dados.length === 0}
                    />
                    <select
                        className="aniversariantes-controle aniversariantes-mes-select"
                        value={mes}
                        onChange={(e) => setMes(Number(e.target.value))}
                        aria-label="Mês"
                    >
                        {MESES.map((nome, i) => (
                            <option key={nome} value={i + 1}>{nome}</option>
                        ))}
                    </select>
                </div>

                {erro && (
                    <div className="aniversariantes-estado">
                        <p>Não foi possível carregar os aniversariantes agora. Verifique a conexão e tente novamente.</p>
                        <button className="aniversariantes-retry-btn" onClick={() => carregar(mes)}>Tentar novamente</button>
                    </div>
                )}

                {!erro && !dados && (
                    <div className="aniversariantes-estado">Carregando aniversariantes...</div>
                )}

                {!erro && dados && dados.length === 0 && (
                    <div className="aniversariantes-estado">Nenhum aniversariante em {MESES[mes - 1]}.</div>
                )}

                {!erro && dados && dados.length > 0 && (
                    <div className="aniversariantes-painel">
                        <TabelaAniversariantes itens={itensVisiveis} mostrarUnidade={unidadesSelecionadas.length !== 1} hoje={hoje} />
                    </div>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default Aniversariantes;
