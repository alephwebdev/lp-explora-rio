'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HistoryCard, { HistoryCardData } from '../_components/HistoryCard'
import historyCardsData from '../_data/history-cards.json'

const Section = styled.section`
    position: relative;
    width: 100%;
    overflow: hidden;
    isolation: isolate;

    .history__bg,
    .history__overlay {
        position: absolute;
        inset: 0;
    }

    .history__bg {
        z-index: -3;
    }

    .history__bg-image {
        object-fit: cover;
        object-position: center;
    }

    .history__overlay {
        z-index: -2;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 28%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0) 28%),
            rgba(0, 0, 0, 0.48);
    }

    .history__content {
        position: relative;
        z-index: 1;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2.3rem;
        padding: 6rem 0 4rem;
    }

    .history__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
        padding: 0 1.5rem;
    }

    .history__eyebrow {
        color: rgba(247, 236, 220, 0.82);
        font-size: 0.8rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .history__title {
        max-width: 32rem;
        color: #f7ecdc;
    }

    .history__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3rem;
        padding: 0.8rem 1.2rem;
        border: none;
        border-radius: 0.9rem;
        background: #221717;
        color: #f7ecdc;
        font-family: var(--font-lora);
        font-size: 1.1rem;
        font-style: italic;
        line-height: 1;
        letter-spacing: -0.05em;
        cursor: pointer;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .history__button:hover {
        opacity: 0.88;
        transform: translateY(-1px);
    }

    .history__viewport {
        width: 100%;
        overflow: hidden;
    }

    .history__track {
        display: flex;
        gap: 0.375rem;
        width: max-content;
        padding: 0 0.25rem 0 0;
        will-change: transform;
    }

    @media (max-width: 767px) {
        .history__content {
            min-height: auto;
            gap: 1.8rem;
            padding: 5rem 1rem 3.5rem;
        }

        .history__header {
            padding: 0;
        }

        .history__title {
            max-width: 18rem;
        }

        .history__viewport {
            overflow: visible;
        }

        .history__track {
            width: 100%;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0;
        }
    }
`

const historyCards = historyCardsData as HistoryCardData[]

export default function History() {
    const sectionRef = useRef<HTMLElement | null>(null)
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!sectionRef.current || !viewportRef.current || !trackRef.current) {
            return
        }

        gsap.registerPlugin(ScrollTrigger)

        const media = gsap.matchMedia()

        media.add('(min-width: 768px)', () => {
            const section = sectionRef.current
            const viewport = viewportRef.current
            const track = trackRef.current

            if (!section || !viewport || !track) {
                return undefined
            }

            const getDistance = () => Math.max(0, track.scrollWidth - viewport.offsetWidth)

            const animation = gsap.to(track, {
                x: () => -getDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            return () => {
                animation.scrollTrigger?.kill()
                animation.kill()
                gsap.set(track, { clearProps: 'transform' })
            }
        })

        return () => {
            media.revert()
        }
    }, [])

    return (
        <Section id='historia' ref={sectionRef}>
            <div className='history__bg'>
                <Image
                    fill
                    priority
                    src='/backgrounds/sec-4-bg.png'
                    alt='Ambiente cenografico da secao de historia'
                    className='history__bg-image'
                    sizes='100vw'
                />
            </div>
            <div className='history__overlay' />

            <div className='history__content'>
                <header className='history__header'>
                    <span className='history__eyebrow'>Narrativa</span>
                    <h1 className='history__title'>
                        Criamos uma historia <strong>inesquecivel</strong>
                    </h1>
                    <button className='history__button' type='button'>Baixar agora</button>
                </header>

                <div className='history__viewport' ref={viewportRef}>
                    <div className='history__track' ref={trackRef}>
                        {historyCards.map((card) => (
                            <HistoryCard key={card.id} card={card} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
