'use client'

import styled from '@emotion/styled'

export interface HistoryCardData {
    id: string
    title: string
    description: string
    variant: 'wide' | 'narrow'
}

interface HistoryCardProps {
    card: HistoryCardData
}

const Card = styled.article<{ variant: HistoryCardData['variant'] }>`
    position: relative;
    flex: 0 0 ${({ variant }) => (variant === 'wide' ? 'min(79vw, 58rem)' : 'min(38vw, 22rem)')};
    min-height: clamp(20rem, 48vh, 27rem);
    border-radius: 0;
    background: linear-gradient(180deg, #efe2cf 0%, #e7d8c3 100%);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.16);
    overflow: hidden;

    .history-card__inner {
        position: absolute;
        left: 1.4rem;
        right: 1.4rem;
        bottom: 1.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .history-card__title {
        max-width: ${({ variant }) => (variant === 'wide' ? '18rem' : '12rem')};
        color: #23211f;
        font-size: clamp(1.7rem, 2.2vw, 2.3rem);
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
        max-width: ${({ variant }) => (variant === 'wide' ? '24rem' : '14rem')};
        color: rgba(35, 33, 31, 0.68);
        font-size: 1rem;
        line-height: 1.18;
        letter-spacing: -0.02em;
    }

    @media (max-width: 767px) {
        flex-basis: 100%;
        min-height: 18rem;

        .history-card__inner {
            left: 1.2rem;
            right: 1.2rem;
            bottom: 1.2rem;
        }

        .history-card__title,
        .history-card__description {
            max-width: 100%;
        }
    }
`

export default function HistoryCard({ card }: HistoryCardProps) {
    const words = card.title.split(' ')
    const lastWord = words.pop() ?? ''
    const firstPart = words.join(' ')

    return (
        <Card variant={card.variant}>
            <div className='history-card__inner'>
                <h3 className='history-card__title'>
                    {firstPart} <strong>{lastWord}</strong>
                </h3>
                <p className='history-card__description'>{card.description}</p>
            </div>
        </Card>
    )
}