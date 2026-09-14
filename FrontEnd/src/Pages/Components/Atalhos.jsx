import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, HeartPulse, FileText, Palmtree, Receipt, BadgeCheck } from 'lucide-react';
import { emProducao } from '../../config/fase';
import './Atalhos.css';

const botoes = [
    { id: 1, nome: 'ANIVERSARIANTES', Icon: PartyPopper, link: '/' },
    { id: 2, nome: 'BENEFÍCIOS', Icon: HeartPulse, link: '#', ocultoEmProducao: true },
    { id: 3, nome: 'CONTRACHEQUE', Icon: FileText, link: '/contraCheque' },
    { id: 4, nome: 'FÉRIAS', Icon: Palmtree, link: '#', ocultoEmProducao: true },
    { id: 5, nome: 'GESTÃO DA QUALIDADE', Icon: BadgeCheck, link: '/qualidade' },
    { id: 6, nome: 'INFORME DE RENDIMENTOS', Icon: Receipt, link: '/', ocultoEmProducao: true },
];

export const contarAtalhosVisiveis = () =>
    botoes.filter((botao) => !(emProducao && botao.ocultoEmProducao)).length;

const Atalhos = () => {
    const itensVisiveis = botoes.filter((botao) => !(emProducao && botao.ocultoEmProducao));
    const colunas = itensVisiveis.length <= 3 ? 1 : 2;

    return (
        <div className="atalhos-grid-wrapper" style={{ '--atalhos-cols': colunas }}>
            {itensVisiveis.map((botao) => <AtalhoItem key={botao.id} botao={botao} />)}
        </div>
    );
};

const AtalhoItem = ({ botao }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = botao;

    return (
        <Link to={botao.link} className="text-decoration-none atalho-grid-item">
            <div
                className={`atalho-card-simples ${isHovered ? 'is-hover' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="atalho-body">
                    <Icon
                        size={52}
                        strokeWidth={1.5}
                        className="atalho-lucide-icon"
                    />
                    <div className="atalho-nome">{botao.nome}</div>
                </div>
            </div>
        </Link>
    );
};

export default Atalhos;
