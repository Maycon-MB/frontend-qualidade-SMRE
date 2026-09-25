import React from 'react';
import { Star, LayoutDashboard, Compass, LayoutGrid, FileSignature } from 'lucide-react';
import MiniVideo, { Tela, Fone, Destaque } from './MiniVideo';
import {
    NavCena, TelaHome, TelaHomeRodape, TelaRamais, TelaRamaisUnidades, TelaRamaisBusca, TelaAniversariantes,
    TelaContracheque, TelaGrade, TelaArea, TelaAreaDocs, FonePortal, FoneInicio, NavegadorPC, MenuChrome,
    MenuPontos, ComunicadoAberto, ToastEnviado, MenuMes, MenuUnidades, JanelaPdf, JanelaMonitora,
} from './telas';
import {
    Digita, MuralQrCode, CameraQrCode, FoneFormulario, TelaTermoForm, OpcoesUnidade, OpcoesArea, DicaToken,
    TelaEmailToken, TelaTermoCaixas, SucessoTermo,
} from './telasTermo';

// Dados do Leozinho usados em todas as telas do termo (fictícios).
const LEOZINHO = { nome: 'Leozinho', unidade: 'Central Administrativa', area: 'CSC - Qualidade', cpf: '000.000.000-00', email: 'leozinho@email.com' };

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
                    acao: 'No topo da tela, você encontra uma saudação personalizada e a sua foto.',
                    expl: 'O “Olá, Leozinho!” confirma que você entrou com a sua conta.',
                    cena: (
                        <MiniVideo semClique x0="50%" y0="70%" x1="91.5%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque style={{ left: '70%', top: '1.5%', width: '24%', height: '9%' }} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À esquerda, você encontra os atalhos que facilitam a sua navegação.',
                    expl: 'Por meio dos atalhos, você acessa facilmente as opções do menu.',
                    cena: (
                        <MiniVideo semClique x0="70%" y0="85%" x1="23%" y1="56%">
                            <Tela><TelaHome /></Tela><NavCena />
                            <Destaque style={{ left: '2.5%', top: '15.5%', width: '41.5%', height: '81%' }} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'À direita, você encontra os comunicados mais recentes.',
                    expl: 'Clique no título para visualizar o comunicado completo. Para fechá-lo, clique novamente.',
                    cena: (
                        <MiniVideo x0="30%" y0="85%" x1="62%" y1="28.5%">
                            <Tela><TelaHome /></Tela><NavCena /><ComunicadoAberto />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'No rodapé da página, você encontra o acesso à Ouvidoria SMREDE.',
                    expl: 'Ao final de todas as páginas, você encontra a Ouvidoria SMREDE, um canal de escuta aberto a todos.',
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
        qtd: '3 passos',
        Icone: Compass,
        grupos: [{
            passos: [
                {
                    acao: 'Clique nos três pontinhos e confira as opções do menu.',
                    expl: 'No canto superior direito, você encontra o menu do Portal e também o acesso a este Guia.',
                    cena: (
                        <MiniVideo x0="55%" y0="85%" x1="95.35%" y1="6%">
                            <Tela><TelaHome /></Tela><NavCena /><MenuPontos destaque="guia" className="surge" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Para retornar à página anterior, clique na seta.',
                    expl: 'Nas páginas internas, ela fica sempre disponível logo abaixo do cabeçalho.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="6.25%" y1="19.6%">
                            <Tela fase="antes"><TelaArea /></Tela><Tela fase="depois"><TelaGrade /></Tela><NavCena />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Para voltar ao início, clique na casinha ou na logo do Portal.',
                    expl: 'Você encontra o ícone ao lado da seta.',
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
                        acao: 'Para acessar, clique em Contracheque na tela inicial.',
                        expl: 'Ao clicar, você verá a lista dos seus comprovantes.',
                        cena: (
                            <MiniVideo x0="70%" y0="85%" x1="33.25%" y1="35.75%">
                                <Tela fase="antes"><TelaHome hover="contracheque" /></Tela>
                                <Tela fase="depois"><TelaContracheque /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Localize o mês que você deseja consultar.',
                        expl: 'Cada linha corresponde a um comprovante. Nas duas últimas colunas, você encontra o mês e o ano de referência.',
                        cena: (
                            <MiniVideo x0="45%" y0="88%" x1="79.4%" y1="45%">
                                <Tela><TelaContracheque /></Tela><NavCena />
                                <div className="anima-marca" style={{ left: '4%', top: '39%', width: '92%', height: '12%' }} />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Na linha do comprovante desejado, clique no ícone da cartinha.',
                        expl: 'Pronto! O comprovante será enviado para o seu e-mail cadastrado e a mensagem “Comprovante enviado.” aparecerá na tela.',
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
                        acao: 'Para acessar, clique em Aniversariantes na tela inicial.',
                        expl: 'A lista abre automaticamente no mês atual, exibindo todas as unidades.',
                        cena: (
                            <MiniVideo x0="60%" y0="88%" x1="12.75%" y1="35.75%">
                                <Tela fase="antes"><TelaHome hover="aniversariantes" /></Tela>
                                <Tela fase="depois"><TelaAniversariantes /></Tela><NavCena />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Para consultar outro mês, é bem simples.',
                        expl: 'Clique no mês atual e selecione o mês desejado.',
                        cena: (
                            <MiniVideo x0="50%" y0="80%" x1="90.5%" y1="28.5%">
                                <Tela><TelaAniversariantes /></Tela><NavCena /><MenuMes />
                            </MiniVideo>
                        ),
                    },
                    {
                        acao: 'Prefere visualizar somente a sua Unidade?',
                        expl: 'Clique no botão “Todas as unidades” e selecione apenas a unidade que deseja visualizar.',
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
    {
        id: 'termo',
        titulo: 'Termo de Compromisso',
        sub: 'Assine o Código de Ética e as Políticas Internas',
        qtd: '13 passos',
        Icone: FileSignature,
        grupos: [{
            passos: [
                {
                    acao: 'Abra o formulário pelo QR Code dos murais ou pelo link do e-mail.',
                    expl: 'Aponte a câmera do celular para o QR Code e toque no link que aparecer. O mesmo link também chega por e-mail.',
                    cena: (
                        <MiniVideo x0="30%" y0="85%" x1="73%" y1="79.4%">
                            <MuralQrCode />
                            <Fone style={{ left: '58%' }}>
                                <Tela fase="antes"><CameraQrCode /></Tela>
                                <Tela fase="depois"><FoneFormulario /></Tela>
                            </Fone>
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Preencha seu nome completo.',
                    expl: 'Digite o nome como está no seu cadastro.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="30%" y1="17.5%">
                            <TelaTermoForm nome={<Digita n={8}>{LEOZINHO.nome}</Digita>} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Em Unidade, escolha o local de atuação.',
                    expl: 'O Leozinho trabalha na Central Administrativa.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="50%" y1="29.5%">
                            <TelaTermoForm nome={LEOZINHO.nome} unidade={<span className="surge tarde">{LEOZINHO.unidade}</span>} />
                            <OpcoesUnidade />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Em Área, escolha o seu setor.',
                    expl: 'A lista traz todas as áreas da rede, em ordem alfabética.',
                    cena: (
                        <MiniVideo x0="60%" y0="85%" x1="50%" y1="41.5%">
                            <TelaTermoForm nome={LEOZINHO.nome} unidade={LEOZINHO.unidade} area={<span className="surge tarde">{LEOZINHO.area}</span>} />
                            <OpcoesArea />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Preencha o seu CPF e o seu e-mail.',
                    expl: 'Use um e-mail que você consegue abrir agora: o token vai chegar nele.',
                    cena: (
                        <MiniVideo x0="60%" y0="88%" x1="30%" y1="53.5%">
                            <TelaTermoForm
                                nome={LEOZINHO.nome}
                                unidade={LEOZINHO.unidade}
                                area={LEOZINHO.area}
                                cpf={<Digita n={14}>{LEOZINHO.cpf}</Digita>}
                                email={<Digita n={18} tarde>{LEOZINHO.email}</Digita>}
                            />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Clique em Enviar Token.',
                    expl: 'Aparece o aviso para verificar a sua caixa de e-mail.',
                    cena: (
                        <MiniVideo x0="60%" y0="88%" x1="9.5%" y1="76.5%">
                            <TelaTermoForm {...LEOZINHO} apertaToken />
                            <DicaToken />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Abra o seu e-mail e veja o token.',
                    expl: 'O e-mail “TOKEN - Termos de compromisso SMREDE” chega da Ouvidoria SMREDE. Se não estiver na caixa de entrada, procure no spam.',
                    cena: (
                        <MiniVideo semClique x0="75%" y0="90%" x1="50%" y1="56%">
                            <TelaEmailToken />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Digite o token no campo “Informe o token aqui”.',
                    expl: 'São 4 números.',
                    cena: (
                        <MiniVideo x0="60%" y0="88%" x1="24%" y1="76.5%">
                            <TelaTermoForm {...LEOZINHO} token={<Digita n={4}>4827</Digita>} />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Marque as 5 caixas “Declaro que li e compreendi…”, uma de cada vez e não esqueça de fazer a leitura das políticas.',
                    expl: 'Clique no nome de cada documento para abrir e ler antes de marcar.',
                    cena: (
                        <MiniVideo x0="60%" y0="90%" x1="6.5%" y1="14.75%">
                            <TelaTermoCaixas docs="animar" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Marque a caixa de proteção de dados.',
                    expl: 'É a declaração sobre o uso dos seus dados pessoais, conforme a LGPD.',
                    cena: (
                        <MiniVideo x0="60%" y0="90%" x1="6.5%" y1="68.5%">
                            <TelaTermoCaixas docs="sim" lgpd="animar" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Marque “Não sou um robô”.',
                    expl: 'É a confirmação de segurança do formulário.',
                    cena: (
                        <MiniVideo x0="60%" y0="60%" x1="7.4%" y1="82.75%">
                            <TelaTermoCaixas docs="sim" lgpd="sim" captcha="animar" />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Clique em Enviar Formulário.',
                    expl: 'O botão só fica azul depois que tudo estiver preenchido e marcado.',
                    cena: (
                        <MiniVideo x0="70%" y0="60%" x1="50%" y1="93.25%">
                            <TelaTermoCaixas docs="sim" lgpd="sim" captcha="sim" ativo aperta />
                            <SucessoTermo />
                        </MiniVideo>
                    ),
                },
                {
                    acao: 'Pronto! Guarde o seu número de registro.',
                    expl: 'Ele comprova a sua assinatura do termo.',
                    cena: (
                        <MiniVideo semClique x0="75%" y0="90%" x1="52%" y1="66%">
                            <TelaTermoCaixas docs="sim" lgpd="sim" captcha="sim" ativo />
                            <SucessoTermo fixo pulsa />
                        </MiniVideo>
                    ),
                },
            ],
        }],
    },
];
