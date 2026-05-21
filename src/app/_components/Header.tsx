'use client'

import styled from '@emotion/styled'
import { ArrowRight, X } from '@phosphor-icons/react'
import gsap from 'gsap'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFollowModal } from './FollowModalProvider'

type NavItem = {
    label: string
    href: string
}

const navigationItems: NavItem[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Personagens', href: '#personagens' },
    { label: 'Imersao', href: '#imersao' },
    { label: 'Criadores', href: '#criadores' },
    { label: 'Historia', href: '#historia' },
    { label: 'Novidades', href: '#novidades' },
    { label: 'Contato', href: '#contato' },
]

const Wrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0.75rem 1rem;
    pointer-events: none;

    @media (min-width: 768px) {
        padding: 1rem 1.5rem;
    }

    .header__bar {
        width: min(100%, 78rem);
        margin: 0 auto;
        min-height: 4.25rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        padding: 0.55rem 0.8rem;
        border: 1px solid rgba(58, 48, 39, 0.08);
        border-radius: 1.2rem;
        background: rgba(239, 226, 207, 0.88);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(14px);
        pointer-events: auto;
        position: relative;
    }

    .header__menu-button,
    .header__download-button,
    .header__logo-button {
        border: 0;
        cursor: pointer;
        pointer-events: auto;
    }

    .header__menu-button {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.9rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(58, 48, 39, 0.12);
        color: #3a3027;
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .header__menu-button:hover {
        transform: translateY(-1px);
        background: rgba(58, 48, 39, 0.18);
    }

    .header__menu-icon {
        overflow: visible;
    }

    .header__menu-line {
        stroke: currentColor;
        stroke-width: 1.6;
        stroke-linecap: round;
    }

    .header__logo-wrap {
        display: flex;
        justify-content: center;
        width: fit-content;
    }

    .header__logo-button {
        position: relative;
        width: 8.75rem;
        height: 3.2rem;
        background: transparent;
        padding: 0;
    }

    .header__logo {
        object-fit: contain;
        object-position: center;
    }

    .header__download-button {
        justify-self: end;
        min-height: 2.8rem;
        padding: 0.7rem 1rem;
        border-radius: 0.95rem;
        background: #bdb19f;
        color: #2b231d;
        font-family: var(--font-lora);
        font-size: 1rem;
        font-style: italic;
        line-height: 1;
        letter-spacing: -0.04em;
        transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .header__download-button:hover {
        transform: translateY(-1px);
        background: #c8bca9;
    }

    .header__overlay {
        position: fixed;
        inset: 0;
        background: rgba(11, 10, 9, 0.36);
        backdrop-filter: blur(6px);
        opacity: 0;
        pointer-events: none;
    }

    .header__panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100dvh;
        padding: 6rem 1rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        pointer-events: none;
        clip-path: inset(0 0 100% 0 round 0);
    }

    .header__panel-shell {
        position: relative;
        width: min(100%, 78rem);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
        gap: 2rem;
        padding: 1.4rem;
        max-height: calc(100dvh - 8rem);
        border-radius: 1.8rem;
        background:
            radial-gradient(circle at top, rgba(82, 123, 103, 0.16), transparent 30%),
            linear-gradient(180deg, rgba(12, 18, 14, 0.96) 0%, rgba(11, 14, 12, 0.98) 100%);
        border: 1px solid rgba(247, 236, 220, 0.12);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
        overflow: hidden;
    }

    .header__close-button {
        position: absolute;
        top: 32px;
        right: 32px;
        z-index: 3;
        width: 2.7rem;
        height: 2.7rem;
        border: 1px solid rgba(247, 236, 220, 0.12);
        border-radius: 0.95rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(247, 236, 220, 1);
        color: #10120f;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .header__nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.85rem;
        list-style: none;
        margin: 0;
        padding: 0;
        min-height: 0;
        padding: 24px;
    }

    .header__nav-item {
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        gap: 0.9rem;
        padding: 0;
        border: 0;
        background: transparent;
        color: #f7ecdc;
        cursor: pointer;
        transition: transform 0.25s ease;
        opacity: 0;
        transform: translateY(32px);
    }

    .header__nav-item:hover {
        transform: translateX(8px);
    }

    .header__nav-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(247, 236, 220, 0.42);
        transform: translateX(-8px);
        opacity: 0.2;
        transition: transform 0.25s ease, opacity 0.25s ease, color 0.25s ease;
    }

    .header__nav-label {
        font-size: clamp(2.5rem, 4vw, 4.6rem);
        line-height: 0.94;
        letter-spacing: -0.08em;
        text-transform: uppercase;
        transition: color 0.25s ease, transform 0.25s ease;
    }

    .header__nav-item:hover .header__nav-arrow,
    .header__nav-item:focus-visible .header__nav-arrow {
        opacity: 1;
        color: #f7ecdc;
        transform: translateX(0);
    }

    .header__nav-item:hover .header__nav-label,
    .header__nav-item:focus-visible .header__nav-label {
        transform: translateX(4px);
    }

    .header__nav-label strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
        text-transform: none;
    }

    .header__aside {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1.4rem;
        padding-left: 1rem;
        border-left: 1px solid rgba(247, 236, 220, 0.12);
        min-height: 0;
        opacity: 0;
        transform: translateY(20px);
    }

    .header__preview {
        position: relative;
        min-height: 100%;
        overflow: hidden;
        border-radius: 1.45rem;
        background: #10120f;
        border: 1px solid rgba(247, 236, 220, 0.12);
    }

    .header__preview-image {
        object-fit: cover;
        object-position: center;
    }

    .header__preview-overlay {
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(7, 10, 8, 0.04) 0%, rgba(7, 10, 8, 0.2) 35%, rgba(7, 10, 8, 0.88) 100%),
            radial-gradient(circle at top, rgba(255, 255, 255, 0.12), transparent 36%);
    }

    .header__preview-copy {
        position: absolute;
        left: 1.1rem;
        right: 1.1rem;
        bottom: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .header__preview-eyebrow {
        color: rgba(247, 236, 220, 0.62);
        font-size: 0.76rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .header__preview-title {
        color: #f7ecdc;
        font-weight: 300;
        font-size: 1.65rem;
        line-height: 0.96;
        letter-spacing: -0.05em;
    }

    .header__preview-title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
    }

    .header__preview-button {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        min-height: 2.9rem;
        padding: 0.75rem 1rem;
        border: 1px solid rgba(247, 236, 220, 0.16);
        border-radius: 0.9rem;
        background: rgba(247, 236, 220, 0.08);
        color: #f7ecdc;
        font-family: var(--font-lora);
        font-size: 1rem;
        font-style: italic;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .header__preview-button:hover {
        transform: translateY(-1px);
        background: rgba(247, 236, 220, 0.14);
    }

    @media (max-width: 767px) {
        .header__bar {
            grid-template-columns: auto 1fr auto;
            min-height: 3.7rem;
            padding: 0.45rem 0.6rem;
            gap: 0.75rem;
            border-radius: 1rem;
        }

        .header__logo-button {
            width: 7rem;
            height: 2.7rem;
        }

        .header__download-button {
            padding: 0.65rem 0.82rem;
            font-size: 0.92rem;
        }

        .header__panel {
            padding: 5.2rem 1rem 1rem;
            align-items: start;
        }

        .header__panel-shell {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 1.2rem;
            max-height: none;
            min-height: calc(100dvh - 6.2rem);
        }

        .header__close-button {
            top: 12px;
            right: 12px;
        }

        .header__nav {
            gap: 0.55rem;
            padding: 16px;
        }

        .header__nav-label {
            font-size: 32px;
        }

        .header__aside {
            padding-left: 0;
            padding-top: 0;
            border-left: 0;
        }

        .header__preview {
        min-height: 260px;
            &-eyebrow {
                font-size: 14px;
                font-weight: 400;
            }

            &-title {
                font-size: 24px;
                line-height: 110%;
                font-weight: 400;
            }
        }
    }
`

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { open: openFollowModal } = useFollowModal()

    const overlayRef = useRef<HTMLDivElement | null>(null)
    const panelRef = useRef<HTMLDivElement | null>(null)
    const navItemsRef = useRef<Array<HTMLButtonElement | null>>([])
    const asideRef = useRef<HTMLDivElement | null>(null)
    const lineTopRef = useRef<SVGLineElement | null>(null)
    const lineMiddleRef = useRef<SVGLineElement | null>(null)
    const lineBottomRef = useRef<SVGLineElement | null>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const isAnimatingRef = useRef(false)
    const scrollYRef = useRef(0)

    const getHeaderOffset = () => {
        const root = document.documentElement
        const current = Number.parseFloat(getComputedStyle(root).getPropertyValue('--header-height'))
        return Number.isFinite(current) ? current : 0
    }

    const updateHeaderHeight = () => {
        const bar = document.querySelector<HTMLElement>('[data-header-bar]')
        if (!bar) {
            return
        }

        document.documentElement.style.setProperty('--header-height', `${bar.offsetHeight + 16}px`)
    }

    const scrollToHash = (href: string) => {
        const target = document.querySelector<HTMLElement>(href)
        if (!target) {
            return
        }

        const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })

        if (window.location.hash !== href) {
            window.history.replaceState(null, '', href)
        }
    }

    const navigate = (href: string) => {
        if (href.startsWith('#')) {
            if (pathname !== '/') {
                router.push(`/${href}`)
                return
            }

            scrollToHash(href)
            return
        }

        router.push(href)
    }

    const lockBody = () => {
        scrollYRef.current = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollYRef.current}px`
        document.body.style.width = '100%'
        document.body.style.overflow = 'hidden'
    }

    const unlockBody = () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollYRef.current)
    }

    const buildTimeline = () => {
        const overlay = overlayRef.current
        const panel = panelRef.current
        const aside = asideRef.current
        const top = lineTopRef.current
        const middle = lineMiddleRef.current
        const bottom = lineBottomRef.current
        const items = navItemsRef.current.filter(Boolean)

        if (!overlay || !panel || !aside || !top || !middle || !bottom || items.length === 0) {
            return null
        }

        gsap.set(overlay, { opacity: 0, pointerEvents: 'none' })
        gsap.set(panel, { clipPath: 'inset(0 0 100% 0 round 0)', pointerEvents: 'none' })
        gsap.set(items, { opacity: 0, y: 32 })
        gsap.set(aside, { opacity: 0, y: 20 })

        const timeline = gsap.timeline({ paused: true })

        timeline
            .set([overlay, panel], { pointerEvents: 'auto' })
            .to(overlay, { opacity: 1, duration: 0.28, ease: 'power2.out' }, 0)
            .to(panel, { clipPath: 'inset(0 0 0% 0 round 0)', duration: 0.55, ease: 'power3.inOut' }, 0)
            .to(top, { attr: { x1: 3, y1: 3, x2: 15, y2: 15 }, duration: 0.34, ease: 'power3.inOut' }, 0)
            .to(middle, { opacity: 0, duration: 0.18, ease: 'power2.out' }, 0)
            .to(bottom, { attr: { x1: 3, y1: 15, x2: 15, y2: 3 }, duration: 0.34, ease: 'power3.inOut' }, 0)
            .to(items, { opacity: 1, y: 0, duration: 0.46, ease: 'power3.out', stagger: 0.06 }, 0.18)
            .to(aside, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, 0.28)

        timeline.eventCallback('onReverseComplete', () => {
            gsap.set([overlay, panel], { pointerEvents: 'none' })
        })

        return timeline
    }

    const openMenu = () => {
        if (isAnimatingRef.current) {
            return
        }

        if (!timelineRef.current) {
            timelineRef.current = buildTimeline()
        }

        if (!timelineRef.current) {
            return
        }

        isAnimatingRef.current = true
        lockBody()
        setIsOpen(true)
        timelineRef.current.play(0)
        gsap.delayedCall(0.58, () => {
            isAnimatingRef.current = false
        })
    }

    const closeMenu = (callback?: () => void) => {
        if (isAnimatingRef.current || !timelineRef.current) {
            if (callback) {
                callback()
            }
            return
        }

        isAnimatingRef.current = true
        timelineRef.current.eventCallback('onReverseComplete', () => {
            gsap.set([overlayRef.current, panelRef.current], { pointerEvents: 'none' })
            setIsOpen(false)
            unlockBody()
            isAnimatingRef.current = false
            if (callback) {
                callback()
            }
        })
        timelineRef.current.reverse()
    }

    const handleToggle = () => {
        if (isOpen) {
            closeMenu()
            return
        }

        openMenu()
    }

    const handleNavigate = (href: string) => {
        if (isOpen) {
            closeMenu(() => navigate(href))
            return
        }

        navigate(href)
    }

    useEffect(() => {
        updateHeaderHeight()

        const onResize = () => {
            updateHeaderHeight()
        }

        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            timelineRef.current?.kill()
            unlockBody()
        }
    }, [])

    return (
        <Wrapper>
            <div className='header__bar' data-header-bar>
                <button
                    type='button'
                    className='header__menu-button'
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                    onClick={handleToggle}
                >
                    <svg className='header__menu-icon' width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden='true'>
                        <line ref={lineTopRef} className='header__menu-line' x1='2' y1='4' x2='16' y2='4' />
                        <line ref={lineMiddleRef} className='header__menu-line' x1='2' y1='9' x2='16' y2='9' />
                        <line ref={lineBottomRef} className='header__menu-line' x1='2' y1='14' x2='16' y2='14' />
                    </svg>
                </button>

                <div className='header__logo-wrap'>
                    <button
                        type='button'
                        className='header__logo-button'
                        aria-label='Voltar para o inicio'
                        onClick={() => handleNavigate('#inicio')}
                    >
                        <Image
                            src='/logo-explorario.png'
                            alt='Logo do Explora Rio'
                            fill
                            priority
                            className='header__logo'
                            sizes='(max-width: 767px) 112px, 140px'
                        />
                    </button>
                </div>

                <button type='button' className='header__download-button' onClick={openFollowModal}>
                    Acompanhar projeto
                </button>
            </div>

            <div className='header__overlay' ref={overlayRef} onClick={() => closeMenu()} />

            <div className='header__panel' ref={panelRef}>
                <div className='header__panel-shell'>
                    <button type='button' className='header__close-button' aria-label='Fechar menu' onClick={() => closeMenu()}>
                        <X size={18} weight='bold' />
                    </button>

                    <nav aria-label='Navegacao principal'>
                        <ul className='header__nav'>
                            {navigationItems.map((item, index) => {
                                const words = item.label.split(' ')
                                const lastWord = words.pop() ?? ''
                                const start = words.join(' ')

                                return (
                                    <li key={item.href}>
                                        <button
                                            type='button'
                                            className='header__nav-item'
                                            ref={(element) => {
                                                navItemsRef.current[index] = element
                                            }}
                                            onClick={() => handleNavigate(item.href)}
                                        >
                                            <span className='header__nav-arrow' aria-hidden='true'>
                                                <ArrowRight size={22} weight='regular' />
                                            </span>
                                            <span className='header__nav-label'>
                                                {start} <strong>{lastWord}</strong>
                                            </span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <div className='header__aside' ref={asideRef}>
                        <div className='header__preview'>
                            <Image
                                src='/game/hero.webp'
                                alt='Cena do jogo Explora Rio'
                                fill
                                priority
                                className='header__preview-image'
                                sizes='(max-width: 767px) 100vw, 360px'
                            />
                            <div className='header__preview-overlay' />
                            <div className='header__preview-copy'>
                                <span className='header__preview-eyebrow'>ExploraRio</span>
                                <h2 className='header__preview-title'>
                                    Uma jornada <strong>imersiva</strong> por Vassouras
                                </h2>
                                <button
                                    type='button'
                                    className='header__preview-button'
                                    onClick={() => {
                                        closeMenu()
                                        openFollowModal()
                                    }}
                                >
                                    Acompanhar projeto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
