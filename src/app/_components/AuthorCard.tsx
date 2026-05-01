'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

export interface AuthorCardData {
    id: string
    role: string
    name: string
    description: string
    image: string
    imageAlt: string
}

interface AuthorCardProps {
    author: AuthorCardData
    priority?: boolean
}

const Card = styled.article`
    position: relative;
    width: 100%;
    min-height: 34rem;
    overflow: hidden;
    border-radius: 1.9rem;
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow: 0 28px 58px rgba(0, 0, 0, 0.32);
    isolation: isolate;
    background: #0f1414;

    .author-card__image {
        object-fit: cover;
        object-position: center;
    }

    .author-card__overlay {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(7, 9, 12, 0.04) 28%, rgba(7, 9, 12, 0.48) 68%, rgba(4, 6, 8, 0.92) 100%),
            radial-gradient(circle at top, rgba(255, 255, 255, 0.12), transparent 36%);
        z-index: 1;
    }

    .author-card__content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.9rem;
        padding: 0 1.3rem 1.4rem;
    }

    .author-card__role {
        display: inline-flex;
        align-items: center;
        min-height: 2.2rem;
        padding: 0.45rem 0.9rem;
        border-radius: 999px;
        background: rgba(113, 118, 130, 0.62);
        backdrop-filter: blur(10px);
        color: #f7ecdc;
        font-size: 0.72rem;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .author-card__name {
        font-family: var(--font-lora);
        font-size: clamp(2.1rem, 3vw, 3.2rem);
        line-height: 0.95;
        font-weight: 400;
        letter-spacing: -0.06em;
        color: #f7ecdc;
        text-shadow: 0 6px 18px rgba(0, 0, 0, 0.34);
    }

    .author-card__description {
        max-width: 24rem;
        color: rgba(247, 236, 220, 0.82);
        font-size: 1.05rem;
        line-height: 1.15;
        letter-spacing: -0.03em;
    }

    @media (max-width: 767px) {
        min-height: 38rem;

        .author-card__content {
            padding: 0 1.5rem 1.6rem;
        }

        .author-card__description {
            font-size: 1.18rem;
        }
    }
`

export default function AuthorCard({ author, priority = false }: AuthorCardProps) {
    return (
        <Card>
            <Image
                fill
                priority={priority}
                sizes='(max-width: 768px) 100vw, 33vw'
                src={author.image}
                alt={author.imageAlt}
                className='author-card__image'
            />

            <div className='author-card__overlay' />

            <div className='author-card__content'>
                <span className='author-card__role'>{author.role}</span>
                <h3 className='author-card__name'>{author.name}</h3>
                <p className='author-card__description'>{author.description}</p>
            </div>
        </Card>
    )
}