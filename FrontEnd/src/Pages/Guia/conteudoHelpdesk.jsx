import React from 'react';
import { Ticket } from 'lucide-react';
import MiniVideo, { Tela } from './MiniVideo';
import { Digita } from './telasTermo';
import { TelaCsc, ListaCsc, Escolhe, Chips, TOPICO, VALORES as V, alvo, rolagem, caixaLinha } from './telasHelpdesk';

const LINK_CSC = 'https://helpdesk.smrede.net.br/';
const VAZIO_TOPICO = '— Selecione um Tópico de Ajuda —';

// Cada passo monta a mesma cena para o computador e para o celular (cel muda medidas e o toque).
const ambos = (montar) => ({ cena: montar(false), cenaCel: montar(true) });

function Video({ cel, de = ['55%', '88%'], para, semClique, children }) {
    return (
        <MiniVideo cel={cel} semClique={semClique} x0={de[0]} y0={de[1]} x1={para.x} y1={para.y}>
            {children}
        </MiniVideo>
    );
}

const surgeTarde = (conteudo) => <span className="surge tarde">{conteudo}</span>;

export const TEMA_HELPDESK = {
    id: 'helpdesk-desligamento',
    titulo: 'Desligamento e Contratação no CSC',
    sub: 'Como abrir o ticket de desligamento e contratação na Central de Serviços Compartilhados.',
    qtd: '8 passos',
    Icone: Ticket,
    grupos: [{
        passos: [
            {
                acao: 'No CSC, clique em “Abrir Novo Ticket”.',
                expl: (
                    <>
                        Acesse o <a href={LINK_CSC} target="_blank" rel="noopener noreferrer">CSC</a> e entre com o seu
                        e-mail e a sua senha. A opção fica no menu, logo abaixo do logo.
                    </>
                ),
                ...ambos((cel) => (
                    <Video cel={cel} de={['50%', '80%']} para={alvo('novo', 0, cel)}>
                        <Tela fase="antes"><TelaCsc cel={cel} inicio ativo="principal" /></Tela>
                        <Tela fase="depois"><TelaCsc cel={cel} ocultaApos="topico" /></Tela>
                    </Video>
                )),
            },
            {
                acao: `Em “Tópico de ajuda”, escolha “${TOPICO}”.`,
                expl: 'Ao escolher o tópico, os campos do pedido aparecem logo abaixo.',
                ...ambos((cel) => (
                    <Video cel={cel} para={alvo('topico', 0, cel)}>
                        <TelaCsc cel={cel} revelaApos="topico" anima={{ topico: <Escolhe de={VAZIO_TOPICO}>{TOPICO}</Escolhe> }} />
                        <ListaCsc cel={cel} rolar={0} de="topico" opcoes={[VAZIO_TOPICO, null, null, TOPICO, null, null]} on={3} />
                    </Video>
                )),
            },
            {
                acao: 'Preencha o Título seguindo o título padrão.',
                expl: `Informe a sigla da unidade, a modalidade do desligamento e o cargo. Exemplo: ${V.titulo}.`,
                ...ambos((cel) => {
                    const rolar = rolagem('solicitacao', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('titulo', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="topico" anima={{ titulo: <Digita n={V.titulo.length}>{V.titulo}</Digita> }} />
                            <div className="anima-marca" style={caixaLinha('padrao', rolar, cel)} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe a unidade, o nome completo e o cargo do colaborador.',
                expl: 'Escreva o nome completo, sem abreviações.',
                ...ambos((cel) => {
                    const rolar = rolagem('desligamento', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('unidade', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="titulo"
                                anima={{
                                    unidade: <Escolhe>{V.unidade}</Escolhe>,
                                    nome: <Digita n={V.nome.length} tarde>{V.nome}</Digita>,
                                    cargo: <Digita n={V.cargo.length} tarde>{V.cargo}</Digita>,
                                }}
                            />
                            <ListaCsc
                                cel={cel}
                                rolar={rolar}
                                de="unidade"
                                opcoes={['— Selecionar —', 'CSC - TI', 'DGP', 'Jurídico', 'Tesouraria Central', 'UND. Barra da Tijuca', 'UND. Bento Ribeiro', V.unidade, 'UND. Cascadura']}
                                on={7}
                            />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Escolha a iniciativa, o motivo do desligamento e o aviso prévio.',
                expl: 'Se o colaborador fizer parte da CIPA, marque a caixinha “CIPA”.',
                ...ambos((cel) => {
                    const rolar = rolagem('cargo', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('iniciativa', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="cargo"
                                anima={{
                                    iniciativa: <Escolhe>{V.iniciativa}</Escolhe>,
                                    motivo: <Escolhe>{V.motivo}</Escolhe>,
                                    aviso: <Escolhe>{V.aviso}</Escolhe>,
                                }}
                            />
                            <ListaCsc cel={cel} rolar={rolar} de="iniciativa" opcoes={['— Selecionar —', 'Empresa', 'Funcionário']} on={1} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Informe se haverá reposição da vaga.',
                expl: 'Se escolher “SIM”, preencha também a Requisição de Pessoal: tipo de vaga, tipo de contratação, indicação, cargo e horário.',
                ...ambos((cel) => {
                    const rolar = rolagem('reposicao', 6, cel);
                    return (
                        <Video cel={cel} para={alvo('reposicao', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="cipa"
                                anima={{
                                    reposicao: <Escolhe>{V.reposicao}</Escolhe>,
                                    tipoVaga: <Escolhe>{V.tipoVaga}</Escolhe>,
                                    contratacao: <Escolhe>{V.contratacao}</Escolhe>,
                                    indicacao: <Escolhe>{V.indicacao}</Escolhe>,
                                    cargoVaga: surgeTarde(V.cargoVaga),
                                    horario: surgeTarde(V.horario),
                                }}
                            />
                            <ListaCsc cel={cel} rolar={rolar} de="reposicao" opcoes={['— Selecionar —', 'SIM', 'NÃO']} on={1} />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Vaga de professor ou monitor? Preencha também os dados da disciplina.',
                expl: 'Informe os dias da semana, o horário, a quantidade de tempos, as turmas, o segmento e a disciplina.',
                ...ambos((cel) => {
                    const rolar = rolagem('professor', 4, cel);
                    return (
                        <Video cel={cel} para={alvo('dias', rolar, cel)}>
                            <TelaCsc
                                cel={cel}
                                rolar={rolar}
                                ate="horario"
                                anima={{
                                    dias: surgeTarde(<Chips itens={V.dias} />),
                                    turno: <Digita n={V.turno.length} tarde>{V.turno}</Digita>,
                                    tempos: <Digita n={V.tempos.length} tarde>{V.tempos}</Digita>,
                                    turmas: <Digita n={V.turmas.length} tarde>{V.turmas}</Digita>,
                                    segmento: surgeTarde(<Chips itens={V.segmento} />),
                                    disciplina: <Digita n={V.disciplina.length} tarde>{V.disciplina}</Digita>,
                                }}
                            />
                            <ListaCsc
                                cel={cel}
                                rolar={rolar}
                                de="dias"
                                opcoes={['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']}
                                on={2}
                            />
                        </Video>
                    );
                }),
            },
            {
                acao: 'Para finalizar, clique em “Criar Ticket”.',
                expl: 'Pronto! Você acompanha o andamento do seu pedido em “Tickets”, no menu do CSC.',
                ...ambos((cel) => {
                    const rolar = rolagem('botoes', 78, cel);
                    return (
                        <Video cel={cel} de={['60%', '30%']} para={alvo('criar', rolar, cel)}>
                            <TelaCsc cel={cel} rolar={rolar} ate="disciplina" aperta />
                        </Video>
                    );
                }),
            },
        ],
    }],
};
