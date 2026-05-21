'use client'

import styled from '@emotion/styled'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Navigation } from 'swiper/modules'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'
import AuthorCard, { AuthorCardData } from '../_components/AuthorCard'
import authorsData from '../_data/authors.json'

const Section = styled.section`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 6.5rem 1.5rem 4.5rem;
    isolation: isolate;

    @media (min-width: 768px) {
        padding: 7rem 2rem 5rem;
    }

    .authors__bg,
    .authors__overlay {
        position: absolute;
        inset: 0;
    }

    .authors__bg {
        z-index: -3;
    }

    .authors__bg-image {
        object-fit: cover;
        object-position: center;
    }

    .authors__overlay {
        z-index: -2;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 28%),
            linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0) 28%),
            rgba(0, 0, 0, 0.48);
    }

    .authors__content {
        width: min(100%, 78rem);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2.2rem;
    }

    .authors__header {
        display: grid;
        grid-template-columns: minmax(0, 30rem) minmax(0, 20rem);
        justify-content: space-between;
        align-items: start;
        gap: 2rem;
    }

    .authors__headline {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
    }

    .authors__eyebrow {
        color: rgba(247, 236, 220, 0.82);
        font-size: 0.8rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .authors__title {
        max-width: 26rem;
        color: #f7ecdc;
    }

    .authors__copy {
        justify-self: end;
        max-width: 17rem;
        padding-top: 0.7rem;
        color: rgba(247, 236, 220, 0.82);
        text-align: right;
    }

    .authors__carousel {
        position: relative;
    }

    .authors__swiper {
        overflow: visible;
        padding: 0 0.25rem 1.5rem;
    }

    .authors__slide {
        height: auto;
        transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
    }

    .authors__slide.swiper-slide-prev,
    .authors__slide.swiper-slide-next {
        opacity: 0.82;
        filter: saturate(0.85) brightness(0.96);
    }

    .authors__slide.swiper-slide-active {
        z-index: 2;
    }

    .authors__nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 3rem;
        height: 3rem;
        border: 1px solid rgba(255, 255, 255, 0.36);
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.14);
        color: #f7ecdc;
        backdrop-filter: blur(12px);
        cursor: pointer;
        transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        z-index: 3;

        &:hover {
            transform: translateY(-50%) scale(1.04);
            background: rgba(255, 255, 255, 0.22);
            border-color: rgba(255, 255, 255, 0.5);
        }
    }

    .authors__carousel-prev {
        left: -0.5rem;
    }

    .authors__carousel-next {
        right: -0.5rem;
    }

    @media (min-width: 1280px) {
        .authors__carousel-prev {
            left: -1.25rem;
        }

        .authors__carousel-next {
            right: -1.25rem;
        }
    }

    @media (max-width: 767px) {
        padding: 5.5rem 1rem 4rem;

        .authors__content {
            gap: 1.8rem;
        }

        .authors__header {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .authors__title {
            max-width: 18rem;
        }

        .authors__copy {
            justify-self: start;
            max-width: 15rem;
            padding-top: 0;
            text-align: left;
        }

        .authors__nav {
            top: 50%;
        }

        .authors__carousel-prev {
            left: -0.3rem;
        }

        .authors__carousel-next {
            right: -0.3rem;
        }
    }
`

const authors = authorsData as AuthorCardData[]

export default function Authors() {
    return (
        <Section id='criadores'>
            <div className='authors__bg'>
                <Image
                    fill
                    priority
                    src='/backgrounds/sec-3-bg.png'
                    alt='Cenario ilustrado da secao de autores'
                    className='authors__bg-image'
                    sizes='100vw'
                />
            </div>
            <div className='authors__overlay' />

            <div className='authors__content'>
                <header className='authors__header' data-reveal>
                    <div className='authors__headline'>
                        <span className='authors__eyebrow'>Os criadores</span>
                        <h1 className='authors__title'>
                            Conheça a equipe por trás desse <strong>projeto</strong>
                        </h1>
                    </div>

                    <p className='authors__copy'>
                        A equipe que deu forma à narrativa e ao mundo do jogo.
                    </p>
                </header>

                <aside className='authors__carousel' aria-label='Carrossel dos autores'>
                    <Swiper
                        className='authors__swiper'
                        modules={[Navigation, EffectCreative]}
                        navigation={{
                            prevEl: '.authors__carousel-prev',
                            nextEl: '.authors__carousel-next',
                        }}
                        effect='creative'
                        grabCursor
                        centeredSlides
                        watchSlidesProgress
                        loop={authors.length > 3}
                        initialSlide={1}
                        speed={900}
                        spaceBetween={18}
                        slidesPerView={1.08}
                        creativeEffect={{
                            perspective: true,
                            limitProgress: 2,
                            prev: {
                                translate: ['-105%', 20, -140],
                                rotate: [0, 0, -4],
                                scale: 0.9,
                                opacity: 0.4,
                            },
                            next: {
                                translate: ['105%', 20, -140],
                                rotate: [0, 0, 4],
                                scale: 0.9,
                                opacity: 0.4,
                            },
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.35,
                                spaceBetween: 22,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 22,
                            },
                        }}
                    >
                        {authors.map((author, index) => (
                            <SwiperSlide key={author.id} className='authors__slide'>
                                <AuthorCard author={author} priority={index < 2} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className='authors__nav authors__carousel-prev' aria-label='Ver autor anterior'>
                        <CaretLeft size={22} weight='bold' />
                    </button>
                    <button className='authors__nav authors__carousel-next' aria-label='Ver proximo autor'>
                        <CaretRight size={22} weight='bold' />
                    </button>
                </aside>
            </div>
        </Section>
    )
}
