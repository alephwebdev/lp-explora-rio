'use client'

import styled from '@emotion/styled'
import Button from '../_components/Button'
import Image from 'next/image'

const Section = styled.section`
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    gap: 24px;
    padding: 48px 48px 72px 48px;
    position: relative;


    @media (max-width: 768px) {
        padding: 24px;
    }

    .hero__bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #EADFD0;
        z-index: -1;

        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(180deg, #00000000 0%, #000000 100%);
            z-index: 1;

            @media (max-width: 768px) {
                height: 70%;
            }
        }

        &-image {
            object-fit: cover;
            object-position: bottom;
            opacity: 0.55;
        }

        &-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center bottom;
            z-index: 0;
        }
    }

    .hero__texts {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;

        &-image {
            width: 240px;
            height: auto;

            @media (max-width: 768px) {
                width: 180px;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;

            &-title {
                text-align: center;
                max-width: 600px;
                color: #ffffff;
            }
    
            &-description {
                text-align: center;
                max-width: 480px;
                color: #ffffffcc;
            }
        }
    }
`

export default function Hero() {
    return (
        <Section id='inicio'>
            <div className='hero__bg'>
                <Image
                    src='/game/hero.webp'
                    alt='Imagem de fundo do hero'
                    fill
                    priority
                    className='hero__bg-image'
                    sizes='100vw'
                />
                <video
                    className='hero__bg-video'
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    poster='/game/hero.webp'
                    aria-hidden='true'
                >
                    <source src='/game/hero-video.mp4' type='video/mp4' />
                </video>
            </div>
            <main className='hero__texts'>
                <div className='hero__texts-content'>
                    <h1 className='hero__texts-content-title'>
                        Explore a <strong>cidade</strong> de vassouras de forma imersiva
                    </h1>
                    <p className='hero__texts-content-description'>
                        Um projeto 100% fiel para a cidade mais visitada do estado do rio de janeiro com a historia mais legal
                    </p>
                </div>
                <div className='hero__texts-buttons'>
                    <Button variant='white'>Baixar agora</Button>
                </div>
            </main>
        </Section>
    )
}
