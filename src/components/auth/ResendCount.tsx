"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"

interface ResendCountProps {
    onResendClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    loading?: boolean
    initialCountdown?: number
    className?: string
}

const ResendCount: React.FC<ResendCountProps> = ({
    onResendClick,
    loading = false,
    initialCountdown = 60,
    className = "",
}) => {
    
    const [countdown, setCountdown] = useState(initialCountdown)
    const [showResend, setShowResend] = useState(false)
    const timerRef = useRef<number | null>(null)
    const wasLoadingRef = useRef(loading)

    const startCountdown = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        setCountdown(initialCountdown)
        setShowResend(false)

        timerRef.current = window.setInterval(() => {
            setCountdown((prev) => {
                const newValue = (prev ?? initialCountdown) - 1
                if (newValue <= 0) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current)
                    }
                    setShowResend(true)
                    return 0
                }
                return newValue
            })
        }, 1000)
    }

    useEffect(() => {
        startCountdown()

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [initialCountdown])

    useEffect(() => {
        if (wasLoadingRef.current && !loading) {
            startCountdown()
        }

        wasLoadingRef.current = loading
    }, [loading, initialCountdown])

    const handleResendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onResendClick) {
            onResendClick(e)
        }

        setShowResend(false)
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showResend ? (
                <button
                    onClick={handleResendClick}
                    disabled={loading}
                    type="button"
                    className="text-success underline hover:text-success/80 transition-colors"
                >
                    {loading ? "Resending..." : "Resend code"}
                </button>
            ) : loading ? (
                <div className="flex items-center gap-1">
                    <span className="text-success">Resending...</span>
                </div>
            ) : (
                <div className="flex items-center gap-1">
                    <span className="text-black">Resend in</span>
                    <span className="text-success font-medium">{countdown}s</span>
                </div>
            )}
        </div>
    )
}

export default ResendCount
