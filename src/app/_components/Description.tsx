'use client'

import styled from '@emotion/styled'

const Wrapper = styled.p``

interface DescriptionProps {
    children: React.ReactNode
}

export default function Description({ children }: DescriptionProps) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}
