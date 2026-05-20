'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

export interface NewsItemData {
    id: string
    category: string
    image: string
    title: string
    description: string
}

interface NewsCardProps {
    item: NewsItemData
    priority?: boolean
}

const Card = styled.article`
    position: relative;
    min-height: 26.75rem;
    border-radius: 1.35rem;
    overflow: hidden;
    background: #0f1414;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
    isolation: isolate;

    .news-card__media {
        position: absolute;
        inset: 0;
    }

    .news-card__image {
        object-fit: cover;
        object-position: center;
    }

    .news-card__scrim {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 30%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0) 55%);
    }

    .news-card__content {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.05rem 1.05rem 1rem;
    }

    .news-card__category {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        min-height: 1.8rem;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(10px);
        color: #f7ecdc;
        font-size: 0.62rem;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .news-card__copy {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .news-card__title {
        max-width: 18rem;
        color: #f7ecdc;
        font-size: clamp(1.7rem, 2vw, 2.25rem);
        line-height: 0.96;
        font-weight: 400;
        letter-spacing: -0.06em;
        text-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
    }

    .news-card__title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
    }

    .news-card__description {
        max-width: 19rem;
        color: rgba(247, 236, 220, 0.78);
        font-size: 0.95rem;
        line-height: 1.16;
        letter-spacing: -0.02em;
        text-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 767px) {
        min-height: 24rem;

        .news-card__title,
        .news-card__description {
            max-width: 100%;
        }
    }
`

export default function NewsCard({ item, priority = false }: NewsCardProps) {
    const words = item.title.split(' ')
    const lastWord = words.pop() ?? ''
    const firstPart = words.join(' ')

    return (
        <Card>
            <div className='news-card__media'>
                <Image
                    fill
                    priority={priority}
                    sizes='(max-width: 767px) 100vw, 50vw'
                    src={item.image}
                    alt={item.title}
                    className='news-card__image'
                />
                <div className='news-card__scrim' />
            </div>

            <div className='news-card__content'>
                <span className='news-card__category'>{item.category}</span>

                <div className='news-card__copy'>
                    <h3 className='news-card__title'>
                        {firstPart} <strong>{lastWord}</strong>
                    </h3>
                    <p className='news-card__description'>{item.description}</p>
                </div>
            </div>
        </Card>
    )
}