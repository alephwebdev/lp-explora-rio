'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

const Section = styled.section`
    position: relative;
    width: 100%;
    overflow: hidden;
    isolation: isolate;

    .presentation__bg,
    .presentation__overlay {
        position: absolute;
        inset: 0;
    }

    .presentation__bg {
        z-index: -3;
    }

    .presentation__bg-image {
        object-fit: cover;
        object-position: center;
    }

    .presentation__overlay {
        z-index: -2;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 28%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0) 28%),
            rgba(0, 0, 0, 0.48);
    }

    .presentation__content {
        width: min(100%, 78rem);
        margin: 0 auto;
        padding: 6.5rem 1.25rem 7rem;
        display: flex;
        flex-direction: column;
        gap: 2.2rem;
    }

    .presentation__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.9rem;
        text-align: center;
    }

    .presentation__eyebrow {
        color: rgba(247, 236, 220, 0.82);
        font-size: 0.8rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .presentation__title {
        max-width: 33rem;
        color: #f7ecdc;
    }

    .presentation__stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 8rem;
    }

    .presentation__card {
        position: sticky;
        top: 7.25rem;
        min-height: 24rem;
        border-radius: 1.6rem;
        background: linear-gradient(180deg, #f1e4d2 0%, #eadbc7 100%);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
        overflow: hidden;
    }

    .presentation__card:nth-of-type(2) {
        top: 9.5rem;
    }

    .presentation__card:nth-of-type(3) {
        top: 11.75rem;
    }

    .presentation__card::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 40%, rgba(25, 18, 11, 0.04) 100%);
        pointer-events: none;
    }

    .presentation__card-content {
        position: absolute;
        left: 1.3rem;
        right: 1.3rem;
        bottom: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        z-index: 1;
    }

    .presentation__card-title {
        color: #1f1c1b;
        font-size: clamp(1.8rem, 2.2vw, 2.35rem);
        line-height: 0.97;
        font-weight: 400;
        letter-spacing: -0.06em;
    }

    .presentation__card-title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
    }

    .presentation__card-description {
        max-width: 22rem;
        color: rgba(31, 28, 27, 0.7);
        font-size: 0.98rem;
        line-height: 1.16;
        letter-spacing: -0.02em;
    }

    @media (max-width: 767px) {
        .presentation__content {
            padding: 5rem 1rem 5rem;
            gap: 1.8rem;
        }

        .presentation__title {
            max-width: 18rem;
        }

        .presentation__stack {
            padding-bottom: 3rem;
        }

        .presentation__card,
        .presentation__card:nth-of-type(2),
        .presentation__card:nth-of-type(3) {
            top: 5.5rem;
            min-height: 17rem;
        }

        .presentation__card-content {
            left: 1.1rem;
            right: 1.1rem;
            bottom: 1.05rem;
        }

        .presentation__card-description {
            max-width: 100%;
        }
    }
`

const presentationCards = [
    {
        id: 'erro-fatal',
        title: 'Um erro e pode ser fatal',
        description: 'Cada resposta pesa. Um deslize muda o ritmo do desafio e pressiona sua leitura da cena.',
    },
    {
        id: 'estrategia',
        title: 'A estratégia é sua melhor amiga',
        description: 'Observe o ambiente, ligue as pistas e escolha com calma o melhor caminho para continuar.',
    },
    {
        id: 'gloria',
        title: 'Ganhe e mostre ao mundo sua glória',
        description: 'Ao vencer os desafios, a experiência recompensa seu domínio com progressão e reconhecimento.',
    },
] as const

export default function Presentation() {
    return (
        <Section id='imersao'>
            <div className='presentation__bg'>
                <Image
                    fill
                    priority
                    src='/backgrounds/sec-5-bg.png'
                    alt='Ambiente cenografico da secao de desafios'
                    className='presentation__bg-image'
                    sizes='100vw'
                />
            </div>
            <div className='presentation__overlay' />

            <div className='presentation__content'>
                <header className='presentation__header' data-reveal>
                    <span className='presentation__eyebrow'>Desafiador</span>
                    <h1 className='presentation__title'>
                        Combate de <strong>inteligência</strong>, você consegue?
                    </h1>
                </header>

                <div className='presentation__stack'>
                    {presentationCards.map((card) => {
                        const words = card.title.split(' ')
                        const highlight = words.pop() ?? ''
                        const titleStart = words.join(' ')

                        return (
                            <article key={card.id} className='presentation__card'>
                                <div className='presentation__card-content'>
                                    <h3 className='presentation__card-title'>
                                        {titleStart} <strong>{highlight}</strong>
                                    </h3>
                                    <p className='presentation__card-description'>{card.description}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
}
