'use client'

import styled from '@emotion/styled'
import { useEffect } from 'react'
import { InstagramLogo, X } from '@phosphor-icons/react'

interface FollowModalProps {
    open: boolean
    onClose: () => void
}

const Backdrop = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(8, 6, 5, 0.72);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 0.35s ease;
`

const Dialog = styled.div<{ $open: boolean }>`
    position: relative;
    width: min(100%, 30rem);
    background: linear-gradient(180deg, #1c1612 0%, #2a221c 100%);
    border: 1px solid rgba(247, 236, 220, 0.18);
    border-radius: 1.4rem;
    padding: 2.4rem 1.8rem 2rem;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    color: #f7ecdc;
    text-align: center;
    transform: ${({ $open }) => ($open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(12px)')};
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);

    .follow-modal__close {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        width: 2.2rem;
        height: 2.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 999px;
        background: rgba(247, 236, 220, 0.08);
        color: #f7ecdc;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .follow-modal__close:hover {
        background: rgba(247, 236, 220, 0.18);
    }

    .follow-modal__eyebrow {
        display: inline-block;
        color: rgba(247, 236, 220, 0.6);
        font-size: 0.72rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        margin-bottom: 0.9rem;
    }

    .follow-modal__title {
        font-family: var(--font-lora);
        font-size: clamp(1.7rem, 3vw, 2.2rem);
        font-weight: 400;
        line-height: 1;
        letter-spacing: -0.04em;
        margin-bottom: 0.8rem;
    }

    .follow-modal__title strong {
        font-style: italic;
    }

    .follow-modal__description {
        color: rgba(247, 236, 220, 0.74);
        font-size: 1rem;
        line-height: 1.4;
        max-width: 22rem;
        margin: 0 auto 1.8rem;
    }

    .follow-modal__cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        min-height: 3rem;
        padding: 0.85rem 1.4rem;
        border: none;
        border-radius: 0.9rem;
        background: linear-gradient(135deg, #f7ecdc 0%, #e7d5b8 100%);
        color: #1c1612;
        font-family: var(--font-lora);
        font-size: 1.05rem;
        font-style: italic;
        line-height: 1;
        letter-spacing: -0.03em;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .follow-modal__cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
    }
`

export default function FollowModal({ open, onClose }: FollowModalProps) {
    useEffect(() => {
        if (!open) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKey)
        }
    }, [open, onClose])

    return (
        <Backdrop $open={open} onClick={onClose} aria-hidden={!open}>
            <Dialog $open={open} role='dialog' aria-modal='true' onClick={(e) => e.stopPropagation()}>
                <button
                    type='button'
                    className='follow-modal__close'
                    onClick={onClose}
                    aria-label='Fechar'
                >
                    <X size={16} weight='bold' />
                </button>

                <span className='follow-modal__eyebrow'>Em desenvolvimento</span>
                <h2 className='follow-modal__title'>
                    O jogo esta a <strong>caminho</strong>
                </h2>
                <p className='follow-modal__description'>
                    Estamos finalizando os ultimos detalhes da experiencia. Acompanhe o desenvolvimento e seja avisado quando o lancamento chegar.
                </p>

                <a
                    href='https://www.instagram.com/_explorario/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='follow-modal__cta'
                >
                    <InstagramLogo size={20} weight='bold' />
                    Seguir no Instagram
                </a>
            </Dialog>
        </Backdrop>
    )
}
