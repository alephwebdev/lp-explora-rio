'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import { DownloadSimple } from '@phosphor-icons/react'

const Wrapper = styled.footer`
    width: 100%;
    background: #efe2cf;

    .footer__cta {
        position: relative;
        min-height: 26rem;
        overflow: hidden;
        background: #b7ab9c;
    }

    .footer__cta-media,
    .footer__cta-overlay {
        position: absolute;
        inset: 0;
    }

    .footer__cta-media {
        z-index: 0;
        background:
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), transparent 25%),
            linear-gradient(135deg, rgba(88, 79, 67, 0.12), rgba(188, 177, 163, 0.28));
    }

    .footer__cta-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.32;
        filter: saturate(0.82) contrast(1.02);
    }

    .footer__cta-overlay {
        z-index: 1;
        background: linear-gradient(180deg, rgba(188, 177, 163, 0.2) 0%, rgba(188, 177, 163, 0.56) 100%);
    }

    .footer__cta-content {
        position: relative;
        z-index: 2;
        width: min(100%, 78rem);
        min-height: 26rem;
        margin: 0 auto;
        display: flex;
        align-items: end;
        padding: 2.5rem 1.5rem 3rem;
    }

    .footer__cta-copy {
        max-width: 20rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .footer__cta-eyebrow {
        color: rgba(31, 28, 27, 0.84);
        font-size: 0.8rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .footer__cta-title {
        color: #1f1c1b;
        font-size: clamp(2.8rem, 5vw, 4.3rem);
        line-height: 0.92;
        font-weight: 400;
        letter-spacing: -0.08em;
    }

    .footer__cta-title strong {
        font-family: var(--font-lora);
        font-style: italic;
        font-weight: 400;
    }

    .footer__cta-button {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 3rem;
        padding: 0.75rem 1rem;
        border: 0;
        border-radius: 0.85rem;
        background: rgba(255, 255, 255, 0.28);
        color: #1f1c1b;
        font-family: var(--font-lora);
        font-size: 1.05rem;
        font-style: italic;
        line-height: 1;
        letter-spacing: -0.05em;
        cursor: pointer;
        transition: transform 0.2s ease, background-color 0.2s ease;
        backdrop-filter: blur(10px);
    }

    .footer__cta-button:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.36);
    }

    .footer__main {
        width: min(100%, 78rem);
        margin: 0 auto;
        padding: 1.8rem 1.5rem 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
    }

    .footer__logo-wrap {
        display: flex;
        justify-content: center;
    }

    .footer__logo {
        width: min(100%, 14rem);
        height: auto;
    }

    .footer__columns {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1.75rem;
        align-items: start;
    }

    .footer__column {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }

    .footer__column-title {
        color: #3a3027;
        font-family: var(--font-lora);
        font-size: 1.8rem;
        line-height: 0.95;
        font-weight: 400;
        letter-spacing: -0.05em;
    }

    .footer__links {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .footer__link {
        color: rgba(58, 48, 39, 0.86);
        font-size: 1rem;
        line-height: 1.15;
        letter-spacing: -0.02em;
        text-decoration: none;
        transition: opacity 0.2s ease;
    }

    .footer__link:hover {
        opacity: 0.7;
    }

    .footer__download {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        min-height: 2.7rem;
        padding: 0.65rem 0.8rem;
        border-radius: 0.8rem;
        background: rgba(255, 255, 255, 0.34);
        color: #3a3027;
        text-decoration: none;
        transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .footer__download:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.46);
    }

    .footer__download-icon {
        flex: 0 0 auto;
    }

    .footer__download-text {
        font-family: var(--font-lora);
        font-size: 1.02rem;
        font-style: italic;
        line-height: 1;
        letter-spacing: -0.03em;
    }

    .footer__bottom {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding-top: 0.25rem;
        color: rgba(58, 48, 39, 0.72);
        font-size: 0.95rem;
        line-height: 1.2;
        letter-spacing: -0.02em;
    }

    .footer__credit {
        text-align: right;
    }

    @media (max-width: 900px) {
        .footer__columns {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 767px) {
        .footer__cta {
            min-height: 22rem;
        }

        .footer__cta-content {
            min-height: 22rem;
            padding: 2rem 1rem 2.5rem;
            align-items: center;
        }

        .footer__cta-copy {
            max-width: 16rem;
        }

        .footer__main {
            padding: 1.4rem 1rem 1rem;
            gap: 1.5rem;
        }

        .footer__columns {
            grid-template-columns: 1fr;
            gap: 1.3rem;
        }

        .footer__bottom {
            flex-direction: column;
        }

        .footer__credit {
            text-align: left;
        }
    }
`

const siteMapLinks = [
    { label: 'Inicio', href: '#' },
    { label: 'Personagens', href: '#' },
    { label: 'Imersao', href: '#' },
    { label: 'Historia', href: '#' },
    { label: 'Novidades', href: '#' },
    { label: 'Desafios', href: '#' },
]

const communityLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'Discord', href: '#' },
]

const policyLinks = [
    { label: 'Politica de privacidade', href: '#' },
    { label: 'Termos e condicoes', href: '#' },
]

export default function Footer() {
    return (
        <Wrapper id='contato'>
            <section className='footer__cta'>
                <div className='footer__cta-media' aria-hidden='true'>
                    <video
                        className='footer__cta-video'
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster='/backgrounds/sec-5-bg.png'
                    >
                        <source src='/backgrounds/footer-cta.mp4' type='video/mp4' />
                    </video>
                </div>
                <div className='footer__cta-overlay' />

                <div className='footer__cta-content'>
                    <div className='footer__cta-copy'>
                        <span className='footer__cta-eyebrow'>Jogar agora</span>
                        <h2 className='footer__cta-title'>
                            Jogue <strong>agora</strong> mesmo, e de graca!
                        </h2>
                        <button className='footer__cta-button' type='button'>Baixar agora</button>
                    </div>
                </div>
            </section>

            <div className='footer__main'>
                <div className='footer__logo-wrap'>
                    <Image
                        src='/logo-explorario.png'
                        alt='Logo do Explora Rio'
                        width={260}
                        height={93}
                        className='footer__logo'
                    />
                </div>

                <div className='footer__columns'>
                    <section className='footer__column'>
                        <h3 className='footer__column-title'>Mapa do site</h3>
                        <nav className='footer__links' aria-label='Mapa do site'>
                            {siteMapLinks.map((link) => (
                                <a key={link.label} href={link.href} className='footer__link'>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </section>

                    <section className='footer__column'>
                        <h3 className='footer__column-title'>Comunidade</h3>
                        <nav className='footer__links' aria-label='Comunidade'>
                            {communityLinks.map((link) => (
                                <a key={link.label} href={link.href} className='footer__link'>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </section>

                    <section className='footer__column'>
                        <h3 className='footer__column-title'>Politicas</h3>
                        <nav className='footer__links' aria-label='Politicas'>
                            {policyLinks.map((link) => (
                                <a key={link.label} href={link.href} className='footer__link'>
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </section>

                    <section className='footer__column'>
                        <h3 className='footer__column-title'>Downloads</h3>
                        <a className='footer__download' href='#'>
                            <DownloadSimple className='footer__download-icon' size={18} weight='regular' />
                            <span className='footer__download-text'>Baixar agora</span>
                        </a>
                    </section>
                </div>

                <div className='footer__bottom'>
                    <p>Explorario at 2026 Todos os direitos reservados.</p>
                    <p className='footer__credit'>Projeto de: Aleph Ramos, Albram Ramos, Jeniffer, Maira, Wallace Proenca</p>
                </div>
            </div>
        </Wrapper>
    )
}
