'use client'

import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HistoryCard, { HistoryCardData } from '../_components/HistoryCard'
import historyCardsData from '../_data/history-cards.json'

const Section = styled.section`
    position: relative;
    width: 100%;
    isolation: isolate;

    .history__content {
        position: relative;
        z-index: 1;
        height: 100vh;
        overflow: hidden;
    }

    .history__viewport {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .history__track {
        display: flex;
        width: 300vw;
        height: 100%;
        will-change: transform;
    }

`

const historyCards = historyCardsData as HistoryCardData[]

export default function History() {
    const sectionRef = useRef<HTMLElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!sectionRef.current || !contentRef.current || !viewportRef.current || !trackRef.current) {
            return
        }

        gsap.registerPlugin(ScrollTrigger)

        const content = contentRef.current!
        const viewport = viewportRef.current!
        const track = trackRef.current!

        const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - viewport.offsetWidth)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: content,
                start: 'top top',
                end: () => `+=${getScrollDistance()}`,
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        })

        tl.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
        })

        return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
            gsap.set(track, { clearProps: 'transform' })
        }
    }, [])

    return (
        <Section id='historia' ref={sectionRef}>
            <div className='history__content' ref={contentRef}>
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
