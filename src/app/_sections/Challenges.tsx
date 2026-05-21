'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import challengesData from '../_data/challenges.json'

interface ChallengeItem {
    id: string
    role: string
    name: string
    description: string
    image: string | null
    imageAlt: string
}

const Section = styled.section`
    position: relative;
    width: 100%;
    overflow: hidden;
    isolation: isolate;
    background: #0a0807;

    .challenges__pin {
        position: relative;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }

    .challenges__intro {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
        padding: 0 1.5rem;
        text-align: center;
        will-change: transform, opacity;
        pointer-events: none;
    }

    .challenges__eyebrow {
        color: rgba(247, 236, 220, 0.75);
        font-size: 0.85rem;
        line-height: 1;
        letter-spacing: 0.22em;
        text-transform: uppercase;
    }

    .challenges__title {
        max-width: 44rem;
        color: #f7ecdc;
        font-size: clamp(2.6rem, 7vw, 6rem);
        line-height: 0.95;
        letter-spacing: -0.06em;
        font-weight: 400;
        text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0 0.32em;
    }

    .challenges__title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
        display: inline-flex;
        gap: 0;
    }

    .challenges__word {
        display: inline-flex;
        white-space: nowrap;
    }

    .challenges__char {
        display: inline-block;
        will-change: transform, opacity, filter;
    }

    .challenges__stage {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .challenges__stage > * {
        pointer-events: auto;
    }

    .challenges__deck {
        position: relative;
        width: min(20rem, 72vw);
        height: min(30rem, 56vh);
    }

    @media (min-width: 768px) {
        .challenges__deck {
            width: min(24rem, 32vw);
            height: min(36rem, 64vh);
        }
    }

    .challenges__card {
        position: absolute;
        inset: 0;
        will-change: transform, opacity;
        opacity: 0;
    }
`

const ChallengeCard = styled.article`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1.9rem;
    border: 1px solid rgba(255, 255, 255, 0.38);
    box-shadow: 0 28px 58px rgba(0, 0, 0, 0.42);
    isolation: isolate;
    background: #0f1414;

    .challenge-card__bg {
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .challenge-card__bg-image {
        object-fit: cover;
        object-position: center;
    }

    .challenge-card__overlay {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(7, 9, 12, 0.04) 28%, rgba(7, 9, 12, 0.48) 68%, rgba(4, 6, 8, 0.92) 100%),
            radial-gradient(circle at top, rgba(255, 255, 255, 0.12), transparent 36%);
        z-index: 1;
    }

    .challenge-card__content {
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

    .challenge-card__role {
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

    .challenge-card__name {
        font-family: var(--font-lora);
        font-size: clamp(2.1rem, 3vw, 3.2rem);
        line-height: 0.95;
        font-weight: 400;
        letter-spacing: -0.06em;
        color: #f7ecdc;
        text-shadow: 0 6px 18px rgba(0, 0, 0, 0.34);
    }

    .challenge-card__description {
        max-width: 24rem;
        color: rgba(247, 236, 220, 0.82);
        font-size: 1.05rem;
        line-height: 1.15;
        letter-spacing: -0.03em;
    }
`

const challenges = challengesData as ChallengeItem[]

const tiltsDesktop = [-7, 5, -3]
const tiltsMobile = [-4, 3, -2]
const offsetsXDesktop = [-75, 0, 75]
const offsetsXMobile = [0, 0, 0]
const offsetsYDesktop = [-8, 0, 8]
const offsetsYMobile = [-6, 0, 6]

export default function Challenges() {
    const sectionRef = useRef<HTMLElement | null>(null)
    const pinRef = useRef<HTMLDivElement | null>(null)
    const introRef = useRef<HTMLDivElement | null>(null)
    const eyebrowRef = useRef<HTMLSpanElement | null>(null)
    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (!sectionRef.current || !pinRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
            if (!cards.length) return

            gsap.set(cards, {
                yPercent: 40,
                xPercent: 0,
                rotate: 0,
                opacity: 0,
                scale: 0.9,
                transformOrigin: 'center center',
            })

            const chars = titleRef.current
                ? Array.from(titleRef.current.querySelectorAll<HTMLSpanElement>('.challenges__char'))
                : []

            gsap.set(eyebrowRef.current, { opacity: 0, y: 20 })

            const isDesktop = window.matchMedia('(min-width: 768px)').matches
            const offsetsX = isDesktop ? offsetsXDesktop : offsetsXMobile
            const offsetsY = isDesktop ? offsetsYDesktop : offsetsYMobile
            const tilts = isDesktop ? tiltsDesktop : tiltsMobile

            const mid = (chars.length - 1) / 2
            chars.forEach((char, i) => {
                const distance = i - mid
                gsap.set(char, {
                    opacity: 0,
                    x: distance * (isDesktop ? 28 : 14),
                    ...(isDesktop ? { filter: 'blur(8px)' } : {}),
                })
            })

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: 'top top',
                    end: () => '+=' + window.innerHeight * (cards.length + 1),
                    scrub: 1.2,
                    pin: pinRef.current,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.35 })
                .to(
                    chars,
                    {
                        opacity: 1,
                        x: 0,
                        ...(isDesktop ? { filter: 'blur(0px)' } : {}),
                        duration: 0.5,
                        ease: 'power3.out',
                        stagger: { each: 0.025, from: 'center' },
                    },
                    '-=0.15',
                )
                .to({}, { duration: 0.6 })
                .to(
                    chars,
                    {
                        opacity: 0,
                        x: (i) => (i - mid) * (isDesktop ? 40 : 20),
                        ...(isDesktop ? { filter: 'blur(6px)' } : {}),
                        duration: 0.45,
                        ease: 'power2.in',
                        stagger: { each: 0.015, from: 'center' },
                    },
                )
                .to(
                    eyebrowRef.current,
                    { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' },
                    '<',
                )

            cards.forEach((card, i) => {
                tl.to(
                    card,
                    {
                        yPercent: offsetsY[i] ?? 0,
                        xPercent: offsetsX[i] ?? 0,
                        rotate: tilts[i] ?? 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                    },
                    i === 0 ? '-=0.2' : '+=0.35',
                )
            })

            tl.to({}, { duration: 0.8 })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <Section id='desafios' ref={sectionRef}>
            <div className='challenges__pin' ref={pinRef}>
                <div className='challenges__intro' ref={introRef}>
                    <span className='challenges__eyebrow' ref={eyebrowRef}>
                        Desafios
                    </span>
                    <h2 className='challenges__title' ref={titleRef}>
                        {[
                            { text: 'Aventuras', italic: false },
                            { text: 'que', italic: false },
                            { text: 'te', italic: true },
                            { text: 'esperam', italic: true },
                        ].map((word, wi) => {
                            const Tag = word.italic ? 'strong' : 'span'
                            return (
                                <Tag key={wi} className='challenges__word'>
                                    {word.text.split('').map((char, ci) => (
                                        <span key={ci} className='challenges__char'>
                                            {char}
                                        </span>
                                    ))}
                                </Tag>
                            )
                        })}
                    </h2>
                </div>

                <div className='challenges__stage'>
                    <div className='challenges__deck'>
                        {challenges.map((item, i) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    cardsRef.current[i] = el
                                }}
                                className='challenges__card'
                                style={{ zIndex: i + 1 }}
                            >
                                <ChallengeCard>
                                    <div className='challenge-card__bg'>
                                        {item.image && (
                                            <Image
                                                fill
                                                src={item.image}
                                                alt={item.imageAlt}
                                                sizes='(max-width: 767px) 80vw, 32vw'
                                                className='challenge-card__bg-image'
                                            />
                                        )}
                                    </div>
                                    <div className='challenge-card__overlay' />
                                    <div className='challenge-card__content'>
                                        <span className='challenge-card__role'>{item.role}</span>
                                        <h3 className='challenge-card__name'>{item.name}</h3>
                                        <p className='challenge-card__description'>{item.description}</p>
                                    </div>
                                </ChallengeCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
