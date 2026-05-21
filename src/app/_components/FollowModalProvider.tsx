'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import FollowModal from './FollowModal'

interface FollowModalContextValue {
    open: () => void
    close: () => void
}

const FollowModalContext = createContext<FollowModalContextValue | null>(null)

export function useFollowModal() {
    const ctx = useContext(FollowModalContext)
    if (!ctx) throw new Error('useFollowModal must be used inside FollowModalProvider')
    return ctx
}

export default function FollowModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    return (
        <FollowModalContext.Provider value={{ open, close }}>
            {children}
            <FollowModal open={isOpen} onClose={close} />
        </FollowModalContext.Provider>
    )
}
