'use client'

import styled from '@emotion/styled'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Navigation } from 'swiper/modules'
import Image from 'next/image'
import { CaretLeft, CaretRight, DeviceTabletCamera, PersonSimple, TeaBag, Timer } from '@phosphor-icons/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'
import CharacterCard, { CharacterCardData } from '../_components/CharacterCard'
import charactersData from '../_data/characters.json'
import experienceShowcaseData from '../_data/experience-showcase.json'

const Section = styled.section`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 0 48px;
    isolation: isolate;

    @media (max-width: 767px) {
        padding: 24px 24px;
    }

    .characters {
        &__bg,
        &__overlay {
            position: absolute;
            inset: 0;
        }

        &__bg {
            z-index: -3;

            &-image {
                object-fit: cover;
                object-position: center;
                filter: blur(2px) saturate(0.9);
                transform: scale(1.04);
            }
        }

        &__overlay {
            z-index: -2;
            background:
                linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 28%),
                linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0) 28%),
                rgba(0, 0, 0, 0.78);
        }

        &__content {
            width: min(100%, 1248px);
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 72px;
            align-items: center;
            justify-content: center;

            @media (max-width: 767px) {
                gap: 24px;
            }
        }

        &__texts {
            width: 100%;
            max-width: 600px;
            padding: 16px 20px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            text-align: center;

            @media (max-width: 767px) {
                margin-bottom: 32px;
            }

            &-call {
                color: rgba(255, 245, 229, 0.78);
                font-size: 12px;
                letter-spacing: 0.18em;
                text-transform: uppercase;
            }

            &-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;

                &-title {
                    max-width: 576px;
                    color: #f7eddc;
                }

                &-description {
                    max-width: 416px;
                    color: rgba(247, 237, 220, 0.78);
                }
            }
        }

        &__carousel {
            position: relative;
            width: 100%;
        }

        &__swiper {
            width: 100%;
            overflow: visible;
        }

        &__slide {
            height: auto;
            transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;

            &.swiper-slide-prev,
            &.swiper-slide-next {
                opacity: 0.84;
                filter: saturate(0.82) brightness(0.94);
            }

            &.swiper-slide-active {
                z-index: 2;
            }
        }

        &__nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            border: 1px solid rgba(255, 255, 255, 0.34);
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.14);
            color: #f7eddc;
            backdrop-filter: blur(12px);
            cursor: pointer;
            transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
            z-index: 3;

            @media (max-width: 767px) {
                
            }

            &:hover {
                transform: translateY(-50%) scale(1.04);
                background: rgba(255, 255, 255, 0.22);
                border-color: rgba(255, 255, 255, 0.5);

                @media (max-width: 767px) {
                    transform: scale(1.04);
                }
            }

            &:disabled {
                opacity: 0.5;
                cursor: default;
            }

            &.characters__carousel-prev {
                left: -8px;

                @media (min-width: 1280px) {
                    left: -20px;
                }

                @media (max-width: 767px) {
                    left: -20px;
                }
            }

            &.characters__carousel-next {
                right: -8px;

                @media (min-width: 1280px) {
                    right: -20px;
                }

                @media (max-width: 767px) {
                    right: -20px;
                }
            }
        }

        &__showcase {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 48px;
            width: 100%;

            @media (max-width: 767px) {
                gap: 24px;
            }

            &-grid {
                width: 100%;
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                grid-template-rows: 200px 200px 400px;
                gap: 14px;
                align-items: stretch;

                @media (max-width: 767px) {
                    gap: 8px;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    grid-template-rows: 200px 120px 120px 200px;
                }
            }

            &-card {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 24px;
                min-height: 0;
                isolation: isolate;

                @media (max-width: 767px) {
                    border-radius: 12px;
                }

                &::after {
                    content: '';
                    position: absolute;
                    height: 30%;
                    width: 100%;
                    left: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, #00000000 0%, #000000 100%);
                    z-index: 1;
                }

                &--hero {
                    grid-column: 1 / 2;
                    grid-row: 1 / 3;

                    @media (max-width: 767px) {
                        grid-column: 1 / 3;
                        grid-row: 1 / 2;
                    }
                }

                &--tall {
                    grid-column: 2 / 3;
                    grid-row: 1 / 3;

                    @media (max-width: 767px) {
                        grid-column: 1 / 2;
                        grid-row: 2 / 4;
                    }
                }

                &--stack-top {
                    grid-column: 3 / 4;
                    grid-row: 1 / 2;

                    @media (max-width: 767px) {
                        grid-column: 2 / 3;
                        grid-row: 2 / 3;
                    }
                }

                &--stack-bottom {
                    grid-column: 3 / 4;
                    grid-row: 2 / 3;

                    @media (max-width: 767px) {
                        grid-column: 2 / 3;
                        grid-row: 3 / 4;
                    }
                }

                &--footer {
                    grid-column: 1 / 4;
                    grid-row: 3 / 4;

                    @media (max-width: 767px) {
                        grid-column: 1 / 3;
                        grid-row: 4 / 5;
                    }
                }
            }

            &-image {
                object-fit: cover;
                object-position: center;
            }

            &-label {
                position: absolute;
                left: 24px;
                right: 24px;
                bottom: 24px;
                z-index: 2;
                font-weight: 300;
                font-style: italic;
                font-family: var(--font-lora);
                font-size: 28px;
                line-height: 0.96;
                letter-spacing: -0.05em;
                color: #f6ead8;
                text-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);

                @media (max-width: 767px) {
                    font-size: 23.2px;
                }
            }
        }

        &__benefits {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));

            @media (max-width: 767px) {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            @media (max-width: 520px) {
                grid-template-columns: 1fr;
            }
        }

        &__benefit {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 19.2px 20.8px;
            min-height: 88px;

            & + .characters__benefit {
                border-left: 1px solid rgba(255, 255, 255, 0.14);

                @media (max-width: 520px) {
                    border-left: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.14);
                }
            }

            @media (max-width: 767px) {
                &:nth-of-type(3),
                &:nth-of-type(4) {
                    border-top: 1px solid rgba(255, 255, 255, 0.14);
                }

                &:nth-of-type(3) {
                    border-left: none;
                }
            }

            &-icon {
                flex: 0 0 auto;
                color: #f6ead8;
                opacity: 0.94;
                transform: translateY(1.6px);
            }

            &-copy {
                display: flex;
                flex-direction: column;
                gap: 3.2px;
            }

            &-title {
                font-family: var(--font-instrument-sans);
                font-size: 22px;
                font-weight: 300;
                line-height: 0.95;
                letter-spacing: -0.05em;
                color: #f6ead8;

                & strong {
                    font-family: var(--font-lora);
                    font-style: italic;
                }
            }

            &-description {
                color: rgba(247, 237, 220, 0.74);
                font-size: 15.2px;
                line-height: 1.15;
            }
        }
    }

    @media (min-width: 768px) {
        padding: 128px 32px 112px;
    }
`

const characters = charactersData as CharacterCardData[]
const experienceShowcase = experienceShowcaseData as Array<{
    id: string
    title: string
    image: string
    imageAlt: string
    variant: 'hero' | 'tall' | 'stack-top' | 'stack-bottom' | 'footer'
}>
const experienceBenefits = [
    {
        id: 'historico',
        title: 'Baseado em acontecimentos históricos reais',
        description: '',
        icon: Timer,
    },
    {
        id: 'educativo',
        title: 'Trajetória educativa',
        description: '',
        icon: TeaBag,
    },
    {
        id: 'mobile',
        title: 'Disponível para dispositivos mobile',
        description: '',
        icon: DeviceTabletCamera,
    },
    {
        id: 'classificacao',
        title: 'Classificação indicativa: +10 anos',
        description: '',
        icon: PersonSimple,
    },
] as const

function renderBenefitTitle(id: (typeof experienceBenefits)[number]['id'], title: string) {
    switch (id) {
        case 'historico':
            return (
                <>
                    Baseado em acontecimentos <strong>históricos reais</strong>
                </>
            )
        case 'educativo':
            return (
                <>
                    <strong>Trajetória</strong> educativa
                </>
            )
        case 'mobile':
            return (
                <>
                    Disponível para <strong>dispositivos mobile</strong>
                </>
            )
        case 'classificacao':
            return (
                <>
                    Classificação indicativa: <strong>+10 anos</strong>
                </>
            )
        default:
            return title
    }
}

export default function Characters() {
    return (
        <Section id='personagens'>
            <div className='characters__bg'>
                <Image
                    fill
                    priority
                    src='/backgrounds/sec-2-bg.jpg'
                    alt='Cenario escuro e cinematografico da secao de personagens'
                    className='characters__bg-image'
                    sizes='100vw'
                />
            </div>
            <div className='characters__overlay' />

            <div className='characters__content'>
                <header className='characters__texts'>
                    <span className='characters__texts-call'>Uma história apagada pelo tempo</span>
                    <div className='characters__texts-content'>
                        <h1 className='characters__texts-content-title'>
                            O passado vive em <strong>cada personagem</strong>
                        </h1>
                        <p className='characters__texts-content-description'>
                            Entre as memórias esquecidas, cada personagem revela uma nova parte da verdadeira história de Vassouras.
                        </p>
                    </div>
                </header>

                <aside className='characters__carousel' aria-label='Carrossel de personagens'>
                    <Swiper
                        className='characters__swiper'
                        modules={[Navigation, EffectCreative]}
                        navigation={{
                            prevEl: '.characters__carousel-prev',
                            nextEl: '.characters__carousel-next',
                        }}
                        effect='creative'
                        grabCursor
                        centeredSlides
                        watchSlidesProgress
                        loop={characters.length > 3}
                        speed={850}
                        spaceBetween={22}
                        slidesPerView={1.08}
                        creativeEffect={{
                            perspective: true,
                            limitProgress: 2,
                            prev: {
                                translate: ['-104%', 28, -120],
                                rotate: [0, 0, -5],
                                scale: 0.9,
                                opacity: 0.45,
                            },
                            next: {
                                translate: ['104%', 28, -120],
                                rotate: [0, 0, 5],
                                scale: 0.9,
                                opacity: 0.45,
                            },
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.35,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                    >
                        {characters.map((character, index) => (
                            <SwiperSlide key={character.id} className='characters__slide'>
                                <CharacterCard character={character} priority={index < 3} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className='characters__nav characters__carousel-prev' aria-label='Ver personagem anterior'>
                        <CaretLeft size={22} weight='bold' />
                    </button>
                    <button className='characters__nav characters__carousel-next' aria-label='Ver proximo personagem'>
                        <CaretRight size={22} weight='bold' />
                    </button>
                </aside>

                <section className='characters__showcase' aria-label='Destaques da experiencia'>
                    <header className='characters__texts' data-reveal>
                        <span className='characters__texts-call'>Mais do que um jogo</span>
                        <div className='characters__texts-content'>
                            <h1 className='characters__texts-content-title'>
                                Uma aventura totalmente <strong>imersiva</strong> em Vassouras
                            </h1>
                            <p className='characters__texts-content-description'>
                                A cada capítulo, Vassouras se transforma conforme as suas memórias são restauradas, revelando uma cidade viva, escondida sob o esquecimento.
                            </p>
                        </div>
                    </header>

                    <div className='characters__showcase-grid' data-reveal>
                        {experienceShowcase.map((item, index) => (
                            <article
                                key={item.id}
                                className={`characters__showcase-card characters__showcase-card--${item.variant}`}
                            >
                                <Image
                                    fill
                                    priority={index < 2}
                                    sizes='(max-width: 767px) 100vw, 33vw'
                                    src={item.image}
                                    alt={item.imageAlt}
                                    className='characters__showcase-image'
                                />
                                <h3 className='characters__showcase-label'>{item.title}</h3>
                            </article>
                        ))}
                    </div>

                    <div className='characters__benefits' aria-label='Beneficios da experiencia'>
                        {experienceBenefits.map((item) => {
                            const Icon = item.icon

                            return (
                                <article key={item.id} className='characters__benefit'>
                                    <Icon className='characters__benefit-icon' size={28} weight='light' />
                                    <div className='characters__benefit-copy'>
                                        <h3 className='characters__benefit-title'>{renderBenefitTitle(item.id, item.title)}</h3>
                                        <p className='characters__benefit-description'>{item.description}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>
            </div>
        </Section>
    )
}
