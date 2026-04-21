'use client'

import styled from '@emotion/styled'

type Variant = 'filled' | 'outline' | 'white'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: Variant
}

const Wrapper = styled.button<{ variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  border-radius: 16px;
  border: 2px solid transparent;
  cursor: pointer;
  font-family: var(--font-lora);
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.06em;
  line-height: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  ${({ variant }) =>
        variant === 'filled' &&
        `
    background-color: #BCB1A3;
    border-color: #BCB1A3;
    color: #1a1209;
  `}

  ${({ variant }) =>
        variant === 'outline' &&
        `
    background-color: transparent;
    border-color: transparent;
    color: #1a1209;
  `}

  ${({ variant }) =>
        variant === 'white' &&
        `
    background-color: #ffffff;
    border-color: #ffffff;
    color: #1a1209;
  `}

  @media (max-width: 768px) {
    padding: 16px 24px;
    font-size: 16px;
    border-radius: 12px;
  }
`

export default function Button({ children, onClick, variant = 'filled' }: ButtonProps) {
    return (
        <Wrapper variant={variant} onClick={onClick}>
            {children}
        </Wrapper>
    )
}
