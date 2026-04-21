'use client'

import styled from '@emotion/styled'
import Button from '../_components/Button'

const Section = styled.section`
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    gap: 24px;
    padding: 48px;
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
                color: #1D1D1E;
            }
    
            &-description {
                text-align: center;
                max-width: 480px;
                color: #5e5e5e;
            }
        }
    }
`

export default function Hero() {
    return (
        <Section>
            <div className='hero__bg'></div>
            <main className='hero__texts'>
                <img className='hero__texts-image' src='/logo-explorario.png' alt='logo' />
                <div className='hero__texts-content'>
                    <h1 className='hero__texts-content-title'>
                        Explore a <strong>cidade</strong> de vassouras de forma imersiva
                    </h1>
                    <p className='hero__texts-content-description'>
                        Um projeto 100% fiel para a cidade mais visitada do estado do rio de janeiro com a historia mais legal
                    </p>
                </div>
                <div className='hero__texts-buttons'>
                    <Button variant='filled'>Baixar agora</Button>
                    <Button variant='outline'>Saiba mais</Button>
                </div>
            </main>
        </Section>
    )
}
