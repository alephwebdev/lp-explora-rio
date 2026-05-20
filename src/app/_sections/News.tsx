'use client'

import styled from '@emotion/styled'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'
import NewsCard, { NewsItemData } from '../_components/NewsCard'
import newsItemsData from '../_data/news-items.json'

const Section = styled.section`
    width: 100%;
    background: #050505;
    padding: 6.5rem 1.25rem 6rem;

    .news__content {
        width: min(100%, 78rem);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1.7rem;
    }

    .news__header {
        display: grid;
        grid-template-columns: minmax(0, 26rem) minmax(0, 20rem);
        justify-content: space-between;
        align-items: end;
        gap: 2rem;
    }

    .news__headline {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .news__eyebrow {
        color: rgba(247, 236, 220, 0.78);
        font-size: 0.78rem;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    }

    .news__title {
        max-width: 22rem;
        color: #f7ecdc;
    }

    .news__copy {
        max-width: 19rem;
        justify-self: end;
        color: rgba(247, 236, 220, 0.74);
        text-align: right;
    }

    .news__toolbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(18rem, 20rem);
        align-items: center;
        gap: 1rem;
    }

    .news__filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    .news__filter {
        min-height: 3rem;
        padding: 0.8rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 0.8rem;
        background: transparent;
        color: #f7ecdc;
        font-size: 0.88rem;
        line-height: 1;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }

    .news__filter:hover {
        border-color: rgba(255, 255, 255, 0.6);
    }

    .news__filter--active {
        background: #f2e6d5;
        border-color: #f2e6d5;
        color: #161311;
    }

    .news__search {
        position: relative;
    }

    .news__search-icon {
        position: absolute;
        top: 50%;
        left: 0.9rem;
        transform: translateY(-50%);
        color: rgba(247, 236, 220, 0.5);
        pointer-events: none;
    }

    .news__search-input {
        width: 100%;
        min-height: 3rem;
        padding: 0.85rem 1rem 0.85rem 2.8rem;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 0.8rem;
        background: transparent;
        color: #f7ecdc;
        font-family: var(--font-instrument-sans);
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .news__search-input::placeholder {
        color: rgba(247, 236, 220, 0.56);
    }

    .news__search-input:focus {
        border-color: rgba(255, 255, 255, 0.66);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.18);
    }

    .news__grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.35rem;
    }

    .news__empty {
        padding: 2rem 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 1rem;
        color: rgba(247, 236, 220, 0.74);
        text-align: center;
    }

    @media (max-width: 767px) {
        padding: 5rem 1rem 4rem;

        .news__content {
            gap: 1.3rem;
        }

        .news__header,
        .news__toolbar {
            grid-template-columns: 1fr;
        }

        .news__copy {
            justify-self: start;
            text-align: left;
        }

        .news__grid {
            grid-template-columns: 1fr;
        }
    }
`

const newsItems = newsItemsData as NewsItemData[]
const categories = ['Tudo', ...new Set(newsItems.map((item) => item.category))]

export default function News() {
    const [selectedCategory, setSelectedCategory] = useState('Tudo')
    const [searchTerm, setSearchTerm] = useState('')

    const normalizedSearch = searchTerm.trim().toLowerCase()
    const filteredItems = newsItems
        .filter((item) => {
            const matchesCategory = selectedCategory === 'Tudo' || item.category === selectedCategory
            const haystack = `${item.category} ${item.title} ${item.description}`.toLowerCase()
            const matchesSearch = normalizedSearch.length === 0 || haystack.includes(normalizedSearch)

            return matchesCategory && matchesSearch
        })
        .slice(0, 4)

    return (
        <Section id='novidades'>
            <div className='news__content'>
                <header className='news__header' data-reveal>
                    <div className='news__headline'>
                        <span className='news__eyebrow'>Novas atualizacoes</span>
                        <h1 className='news__title'>
                            Fique por <strong>dentro</strong> das novidades
                        </h1>
                    </div>

                    <p className='news__copy'>
                        Notas de atualizacoes, novidades, ideias, expansoes, todas as mais novas aquisicoes.
                    </p>
                </header>

                <div className='news__toolbar' data-reveal data-reveal-delay='0.1'>
                    <div className='news__filters' role='tablist' aria-label='Filtrar novidades por categoria'>
                        {categories.map((category) => {
                            const isActive = category === selectedCategory

                            return (
                                <button
                                    key={category}
                                    type='button'
                                    role='tab'
                                    aria-selected={isActive}
                                    className={`news__filter ${isActive ? 'news__filter--active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            )
                        })}
                    </div>

                    <label className='news__search'>
                        <MagnifyingGlass className='news__search-icon' size={16} weight='regular' />
                        <input
                            type='search'
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className='news__search-input'
                            placeholder='Procure por algo especifico'
                            aria-label='Buscar novidades'
                        />
                    </label>
                </div>

                {filteredItems.length > 0 ? (
                    <div className='news__grid'>
                        {filteredItems.map((item, index) => (
                            <NewsCard key={item.id} item={item} priority={index < 4} />
                        ))}
                    </div>
                ) : (
                    <div className='news__empty'>Nenhuma novidade encontrada para esse filtro.</div>
                )}
            </div>
        </Section>
    )
}
