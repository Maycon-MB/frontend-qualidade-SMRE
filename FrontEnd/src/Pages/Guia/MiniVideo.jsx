import React, { useState } from 'react';

function Cursor() {
    return (
        <svg className="cursor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 2v17l4.5-4.2 3 6.7 3-1.3-3-6.6H17Z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
    );
}

// Cena animada só com CSS: a setinha vai de (x0, y0) até (x1, y1), em % da cena, e clica no meio do ciclo.
function MiniVideo({ x0, y0, x1, y1, semClique, children }) {
    const [pausado, setPausado] = useState(false);

    return (
        <div className={`cena${pausado ? ' pausada' : ''}`} style={{ '--x0': x0, '--y0': y0, '--x1': x1, '--y1': y1 }}>
            <div className="cena-in">
                {children}
                {!semClique && <div className="clique" />}
                <Cursor />
            </div>
            <button
                type="button"
                className="pausar"
                onClick={() => setPausado(!pausado)}
                aria-label={pausado ? 'Continuar mini vídeo' : 'Pausar mini vídeo'}
            >
                {pausado ? (
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                )}
            </button>
        </div>
    );
}

// fase "antes" some e "depois" aparece no momento do clique.
export function Tela({ fase, children }) {
    return <div className={fase ? `tela ${fase}` : 'tela'}>{children}</div>;
}

export function Fone({ style, children }) {
    return <div className="fone" style={style}>{children}</div>;
}

export function Destaque({ style, tarde }) {
    return <div className={tarde ? 'destaque tarde' : 'destaque'} style={style} />;
}

export default MiniVideo;
