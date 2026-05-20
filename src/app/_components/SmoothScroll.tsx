'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) return

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
        })

        const handleScroll = () => ScrollTrigger.update()
        lenis.on('scroll', handleScroll)

        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        const revealTweens = reveals.map((el) => {
            const delay = parseFloat(el.dataset.revealDelay ?? '0')
            const y = parseFloat(el.dataset.revealY ?? '28')
            return gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                },
            )
        })

        return () => {
            revealTweens.forEach((t) => {
                t.scrollTrigger?.kill()
                t.kill()
            })
            lenis.off('scroll', handleScroll)
            gsap.ticker.remove(tickerCallback)
            lenis.destroy()
        }
    }, [])

    return null
}
