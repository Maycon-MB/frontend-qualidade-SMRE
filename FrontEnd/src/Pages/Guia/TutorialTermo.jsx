import React, { useEffect } from 'react';
import Logo from '../../img/Portal_Func/SMRE_logo_negativo.png';
import ListaPassos from './passos';
import { TEMA_TERMO } from './conteudoTermo';
import './guia.css';
import './tutorialTermo.css';

// Página publicada à parte (build tutorial-termo) enquanto o Portal novo não é divulgado.
function TutorialTermo() {
    const { Icone } = TEMA_TERMO;

    useEffect(() => {
        document.title = 'Como assinar os Termos de Compromisso | SMREDE';
    }, []);

    return (
        <div className="GuiaPortal">
            <header className="tt-topo">
                <img src={Logo} alt="Santa Mônica Rede de Ensino" />
            </header>
            <main className="guia-body tt-corpo">
                <div className="tt-titulo">
                    <span className="acc-ic"><Icone strokeWidth={2} /></span>
                    <div>
                        <h1>{TEMA_TERMO.titulo}</h1>
                        <p>{TEMA_TERMO.sub}</p>
                    </div>
                </div>
                <p className="guia-intro">Clique em cada passo para ver o mini vídeo.</p>
                <div className="acordeao">
                    <div className="acc-item">
                        <div className="acc-corpo">
                            {TEMA_TERMO.grupos.map((grupo, i) => <ListaPassos key={i} passos={grupo.passos} />)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TutorialTermo;
