'use client'

import styled from '@emotion/styled'
import Image from 'next/image'

export interface CharacterCardData {
    id: string
    name: string
    description: string
    tags: string[]
    image: string | null
    imageAlt: string
}

interface CharacterCardProps {
    character: CharacterCardData
    priority?: boolean
}

const Card = styled.article`
    width: 100%;
    min-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
    border-radius: 24px;
    background: linear-gradient(180deg, #f4e7d5 0%, #efe0cc 100%);
    border: 1px solid #383838;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.28);
    backdrop-filter: blur(12px);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(180deg, #00000000 0%, #000000 100%);
    }

    @media (max-width: 767px) {
        min-height: 480px;
    }

    .character-card {
        &__tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        &__tag {
            padding: 8px 14px;
            border-radius: 999px;
            background: #f4e7d570;
            backdrop-filter: blur(24px);
            color: #1d1d1e;
            font-size: 11.52px;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        &__media {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: -1;
            overflow: hidden;

            &-fallback {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 12px;
                z-index: 1;
                color: rgba(37, 28, 21, 0.66);
            }
        }

        &__glyph {
            font-family: var(--font-lora);
            font-size: clamp(64px, 8vw, 96px);
            font-style: italic;
            line-height: 1;
        }

        &__placeholder {
            font-size: 12.8px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }

        &__image {
            object-fit: cover;
            object-position: center top;
        }

        &__body {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        &__name {
            font-family: var(--font-lora);
            font-size: 32px;
            line-height: 0.96;
            font-weight: 400;
            letter-spacing: -0.05em;
            color: #f4e7d5;
            position: relative;
            z-index: 3;

            @media (max-width: 767px) {
                font-size: 26px;
            }
        }

        &__description {
            display: -webkit-box;
            overflow: hidden;
            color: #f4e7d5;
            font-size: 16px;
            line-height: 1.2;
            font-weight: 300;
            letter-spacing: -0.02em;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            position: relative;
            z-index: 3;

            @media (max-width: 767px) {
                font-size: 14px;
            }
        }
    }
`

export default function CharacterCard({ character, priority = false }: CharacterCardProps) {
    const hasImage = Boolean(character.image)

    return (
        <Card>
            <div className='character-card__tags'>
                {character.tags.map((tag) => (
                    <span key={tag} className='character-card__tag'>
                        {tag}
                    </span>
                ))}
            </div>

            <div className='character-card__media'>
                {hasImage ? (
                    <Image
                        fill
                        priority={priority}
                        sizes='(max-width: 768px) 100vw, 33vw'
                        src={character.image!}
                        alt={character.imageAlt}
                        className='character-card__image'
                    />
                ) : (
                    <div className='character-card__media-fallback' aria-hidden='true'>
                        <span className='character-card__glyph'>{character.name.charAt(0)}</span>
                        <span className='character-card__placeholder'>arte do personagem</span>
                    </div>
                )}
            </div>

            <div className='character-card__body'>
                <h3 className='character-card__name'>{character.name}</h3>
                <p className='character-card__description'>{character.description}</p>
            </div>
        </Card>
    )
}