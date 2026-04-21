'use client'

import styled from '@emotion/styled'

const Wrapper = styled.h2``

interface TitleProps {
    children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}
