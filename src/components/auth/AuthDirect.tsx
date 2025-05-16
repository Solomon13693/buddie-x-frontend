"use client"

import { useEffect } from "react"
import type { JSX } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../redux/store"

interface AuthDirectProps {
    children: JSX.Element
}

export const AuthDirect = ({ children }: AuthDirectProps) => {
    const { token, role, loading } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {

        if (token && role && !loading) {

            if (role === "mentor") {
                navigate("/mentor/dashboard", { replace: true })
            } else if (role === "mentee") {
                navigate("/dashboard", { replace: true })
            }
        }
    }, [token, role, loading, navigate])

    if (loading) {
        return children
    }

    return token ? children : children
}
