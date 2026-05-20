'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

export interface HistoryCardData {
    id: string
    title: string
    description: string
    variant: 'wide' | 'narrow'
    image: string
    imageAlt: string
}

interface HistoryCardProps {
    card: HistoryCardData
}

const Card = styled.article`
    position: relative;
    flex: 0 0 100vw;
    height: 100vh;
    overflow: hidden;

    .history-card__image {
        object-fit: cover;
        object-position: center;
        z-index: 0;
    }

    .history-card__overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 55%);
    }

    .history-card__inner {
        position: absolute;
        z-index: 2;
        left: clamp(1.5rem, 6vw, 6rem);
        right: clamp(1.5rem, 6vw, 6rem);
        bottom: clamp(2rem, 5vh, 4rem);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 36rem;
    }

    .history-card__title {
        color: #f7ecdc;
        font-size: clamp(2.4rem, 5vw, 4.5rem);
        line-height: 0.95;
        font-weight: 400;
        letter-spacing: -0.06em;
    }

    .history-card__title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
    }

    .history-card__description {
        color: rgba(247, 236, 220, 0.82);
        font-size: clamp(1rem, 1.4vw, 1.2rem);
        line-height: 1.3;
        letter-spacing: -0.02em;
    }

    @media (max-width: 767px) {
        .history-card__inner {
            left: 1.2rem;
            right: 1.2rem;
            bottom: 1.5rem;
            max-width: 100%;
        }
    }
`

export default function HistoryCard({ card }: HistoryCardProps) {
    const words = card.title.split(' ')
    const lastWord = words.pop() ?? ''
    const firstPart = words.join(' ')

    return (
        <Card>
            <Image
                fill
                src={card.image}
                alt={card.imageAlt}
                sizes='100vw'
                className='history-card__image'
            />
            <div className='history-card__overlay' />
            <div className='history-card__inner'>
                <h3 className='history-card__title'>
                    {firstPart} <strong>{lastWord}</strong>
                </h3>
                <p className='history-card__description'>{card.description}</p>
            </div>
        </Card>
    )
}
