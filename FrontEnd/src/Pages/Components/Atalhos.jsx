import { useState } from 'react';
import { PartyPopper, HeartPulse, FileText, Palmtree, Receipt, BadgeCheck } from 'lucide-react';
import './Atalhos.css';

const botoes = [
    { id: 1, nome: 'ANIVERSARIANTES',       Icon: PartyPopper, link: '#' },
    { id: 2, nome: 'BENEFÍCIOS',             Icon: HeartPulse,  link: '#' },
    { id: 3, nome: 'CONTRACHEQUE',           Icon: FileText,    link: '/contraCheque' },
    { id: 4, nome: 'FÉRIAS',                 Icon: Palmtree,    link: '#' },
    { id: 5, nome: 'INFORME DE RENDIMENTOS', Icon: Receipt,     link: '#' },
    { id: 6, nome: 'QUALIDADE',              Icon: BadgeCheck,  link: '/qualidade' },
];

const Atalhos = () => (
    <div className="atalhos-grid-wrapper">
        {botoes.map((botao) => <AtalhoItem key={botao.id} botao={botao} />)}
    </div>
);

const AtalhoItem = ({ botao }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = botao;

    return (
        <a href={botao.link} className="text-decoration-none">
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
        </a>
    );
};

export default Atalhos;
