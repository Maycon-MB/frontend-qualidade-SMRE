import React from 'react';
import { Star, LayoutDashboard, Compass, LayoutGrid } from 'lucide-react';
import MiniVideo, { Tela, Fone, Destaque } from './MiniVideo';
import {
    NavCena, TelaHome, TelaHomeRodape, TelaRamais, TelaRamaisUnidades, TelaRamaisBusca, TelaAniversariantes,
    TelaContracheque, TelaGrade, TelaArea, TelaAreaDocs, FonePortal, FoneInicio, NavegadorPC, MenuChrome,
    MenuPontos, ComunicadoAberto, ToastEnviado, MenuMes, MenuUnidades, JanelaPdf, JanelaMonitora,
} from './telas';

export const TEMAS = [
    {
        id: 'primeiro-acesso',
        titulo: 'Primeiro Acesso',
        sub: 'Tenha acesso ao Portal de forma rápida e prática.',
        qtd: '3 passos',
        Icone: Star,
        grupos: [{
            passos: [
                {
                    acao: 'No computador, clique na estrela da barra de endereço.',
                    expl: 'Salve o Portal nos favoritos do navegador e acesse com apenas um clique.',
                    cena: <MiniVideo x0="50%" y0="70%" x1="89.2%" y1="11.5%"><NavegadorPC /></MiniVideo>,
                },
                {
                    acao: 'No celular, abra o menu do navegador.',
                    expl: 'No Chrome, são os três pontinhos no canto superior direito, ao lado do endereço.',
                    cena: (
                        <MiniVideo x0="50%" y0="80%" x1="62%" y1="11.4%">
                            <Fone><Tela><FonePortal /></Tela><MenuChrome className="surge" /></Fone>
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Toque em “Adicionar à tela inicial”.',
                    expl: 'Pronto! Agora o Portal está junto aos seus aplicativos, a um clique de distância.',
                    cena: (
                        <MiniVideo x0="45%" y0="85%" x1="54.5%" y1="54.2%">
                            <Fone>
                                <Tela fase="antes"><FonePortal><MenuChrome /></FonePortal></Tela>
                                <Tela fase="depois"><FoneInicio /></Tela>
                                <Destaque tarde style={{ left: '25%', top: '26.5%', width: '25%', height: '16%' }} />
                            </Fone>
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'conhecendo',
        titulo: 'Conhecendo o Portal',
        sub: 'Explore a tela inicial!',
        qtd: '4 passos',
        Icone: LayoutDashboard,
        grupos: [{
            passos: [
                {
                    acao: 'No topo ficam a sua saudação e a sua foto.',
                    expl: 'O “Olá, Leozinho!” confirma que você entrou com a sua conta.',
                    cena: (
                        <MiniVideo semClique x0="50%" y0="70%" x1="91.5%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque style={{ left: '70%', top: '1.5%', width: '24%', height: '9%' }} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À esquerda estão os atalhos.',
                    expl: 'Cada quadrado leva a uma área do Portal: Aniversariantes, Contracheque, Gestão da Qualidade e Sistema Monitora.',
                    cena: (
                        <MiniVideo semClique x0="70%" y0="85%" x1="23%" y1="56%">
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque style={{ left: '2.5%', top: '15.5%', width: '41.5%', height: '81%' }} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À direita, os Últimos Comunicados.',
                    expl: 'Clique no título para ler o comunicado completo. Clique de novo para fechar.',
                    cena: (
                        <MiniVideo x0="30%" y0="85%" x1="62%" y1="28.5%">
                            <Tela><TelaHome /></Tela><NavCena /><ComunicadoAberto />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'No rodapé, a Ouvidoria.',
                    expl: 'No fim de todas as páginas fica a Ouvidoria SMREDE, o canal de escuta da rede, aberto a todos.',
                    cena: (
                        <MiniVideo semClique x0="60%" y0="30%" x1="12%" y1="66%">
                            <Tela><TelaHomeRodape /></Tela><NavCena />
                            <Destaque style={{ left: '2%', top: '55%', width: '38%', height: '21%' }} />
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'navegar',
        titulo: 'Como Navegar',
        sub: 'Ande pelo Portal sem se perder',
        qtd: '4 passos',
        Icone: Compass,
        grupos: [{
            passos: [
                {
                    acao: 'Clique no logo para voltar à tela inicial.',
                    expl: 'Funciona em qualquer página do Portal.',
                    cena: (
                        <MiniVideo x0="60%" y0="80%" x1="7.5%" y1="6%">
                            <Tela fase="antes"><TelaRamais /></Tela><Tela fase="depois"><TelaHome /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Abra o menu nos três pontinhos.',
                    expl: 'Ele fica no canto superior direito e lista todas as áreas do Portal, inclusive este Guia.',
                    cena: (
                        <MiniVideo x0="55%" y0="85%" x1="95.35%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena /><MenuPontos destaque="guia" className="surge" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Use a seta para voltar à página anterior.',
                    expl: 'Ela aparece logo abaixo do topo, em todas as páginas internas.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="6.25%" y1="19.6%">
                            <Tela fase="antes"><TelaArea /></Tela><Tela fase="depois"><TelaGrade /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Use a casinha para ir direto ao início.',
                    expl: 'Ela fica ao lado da seta.',
                    cena: (
                        <MiniVideo x0="65%" y0="85%" x1="12%" y1="19.6%">
                            <Tela fase="antes"><TelaArea /></Tela><Tela fase="depois"><TelaHome /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
    {
        id: 'funcionalidades',
        titulo: 'Principais Funcionalidades',
        sub: 'Contracheque, aniversariantes, ramais e mais',
        qtd: '5 temas',
        Icone: LayoutGrid,
        grupos: [
            {
                titulo: 'CONTRACHEQUE',
                passos: [
                    {
                        acao: 'Clique em CONTRACHEQUE na tela inicial.',
                        expl: 'Abre a lista com os seus comprovantes.',
                        cena: (
                            <MiniVideo x0="70%" y0="85%" x1="33.25%" y1="35.75%">
                                <Tela fase="antes"><TelaHome hover="contracheque" /></Tela>
                                <Tela fase="depois"><TelaContracheque /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Encontre a linha do mês que você quer.',
                        expl: 'Cada linha é um comprovante. O mês e o ano ficam nas duas últimas colunas.',
                        cena: (
                            <MiniVideo x0="45%" y0="88%" x1="79.4%" y1="45%">
                                <Tela><TelaContracheque /></Tela><NavCena />
                                <div className="anima-marca" style={{ left: '4%', top: '39%', width: '92%', height: '12%' }} />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Clique no envelope dessa linha.',
                        expl: 'O comprovante é enviado para o seu e-mail cadastrado e aparece o aviso “Comprovante enviado.”',
                        cena: (
                            <MiniVideo x0="55%" y0="88%" x1="16.4%" y1="45%">
                                <Tela><TelaContracheque aperta /></Tela><NavCena /><ToastEnviado />
                            </MiniVideo>
                        ),
                    },
                ],
            },
            {
                titulo: 'ANIVERSARIANTES',
                passos: [
                    {
                        acao: 'Clique em ANIVERSARIANTES na tela inicial.',
                        expl: 'A lista abre no mês atual, com todas as unidades.',
                        cena: (
                            <MiniVideo x0="60%" y0="88%" x1="12.75%" y1="35.75%">
                                <Tela fase="antes"><TelaHome hover="aniversariantes" /></Tela>
                                <Tela fase="depois"><TelaAniversariantes /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Escolha o mês.',
                        expl: 'Clique no botão do mês e escolha outro. Os meses aparecem em duas colunas.',
                        cena: (
                            <MiniVideo x0="50%" y0="80%" x1="90.5%" y1="28.5%">
                                <Tela><TelaAniversariantes /></Tela><NavCena /><MenuMes />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Filtre pela sua unidade.',
                        expl: 'Clique em “Todas as unidades” e deixe marcadas só as que você quer ver.',
                        cena: (
                            <MiniVideo x0="45%" y0="85%" x1="74.75%" y1="28.5%">
                                <Tela><TelaAniversariantes /></Tela><NavCena /><MenuUnidades />
                            </MiniVideo>
                        ),
                    },
                ],
            },
            {
                titulo: 'RAMAIS',
                passos: [
                    {
                        acao: 'Abra RAMAIS no menu dos três pontinhos.',
                        expl: 'A página abre na aba Central Administrativa.',
                        cena: (
                            <MiniVideo x0="50%" y0="85%" x1="72%" y1="43.3%">
                                <Tela fase="antes"><TelaHome><MenuPontos destaque="ramais" /></TelaHome></Tela>
                                <Tela fase="depois"><TelaRamais /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Escolha a aba da unidade.',
                        expl: 'A aba Unidades traz o gestor, o ramal e o telefone de cada escola.',
                        cena: (
                            <MiniVideo x0="50%" y0="85%" x1="40.8%" y1="36%">
                                <Tela fase="antes"><TelaRamais /></Tela><Tela fase="depois"><TelaRamaisUnidades /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Ou digite na busca.',
                        expl: 'Vale o setor, o nome do responsável ou o número do ramal. A busca procura em todas as abas.',
                        cena: (
                            <MiniVideo x0="55%" y0="80%" x1="20%" y1="28%">
                                <Tela fase="antes"><TelaRamais /></Tela><Tela fase="depois"><TelaRamaisBusca /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                ],
            },
            {
                titulo: 'GESTÃO DA QUALIDADE',
                passos: [
                    {
                        acao: 'Clique em GESTÃO DA QUALIDADE na tela inicial.',
                        expl: 'Aparecem os quadros de todas as áreas da rede.',
                        cena: (
                            <MiniVideo x0="60%" y0="50%" x1="12.75%" y1="76.25%">
                                <Tela fase="antes"><TelaHome hover="qualidade" /></Tela>
                                <Tela fase="depois"><TelaGrade /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Escolha a área.',
                        expl: 'Cada área tem as abas Objetivo, Organograma e Documentos.',
                        cena: (
                            <MiniVideo x0="40%" y0="50%" x1="61.75%" y1="77.5%">
                                <Tela fase="antes"><TelaGrade hover="ti" /></Tela><Tela fase="depois"><TelaArea /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Na aba Documentos, clique em Visualizar documento.',
                        expl: 'O documento abre numa nova aba. Logo abaixo fica o botão Fluxo do processo.',
                        cena: (
                            <MiniVideo x0="45%" y0="90%" x1="79%" y1="76.75%">
                                <Tela><TelaAreaDocs /></Tela><NavCena /><JanelaPdf />
                            </MiniVideo>
                        ),
                    },
                ],
            },
            {
                titulo: 'SISTEMA MONITORA',
                passos: [
                    {
                        acao: 'Clique em SISTEMA MONITORA na tela inicial.',
                        expl: 'O sistema abre numa nova aba, e o Portal continua aberto na anterior.',
                        cena: (
                            <MiniVideo x0="70%" y0="50%" x1="33.25%" y1="76.25%">
                                <Tela><TelaHome hover="monitora" /></Tela><NavCena /><JanelaMonitora />
                            </MiniVideo>
                        ),
                    },
                ],
            },
        ],
    },
];
