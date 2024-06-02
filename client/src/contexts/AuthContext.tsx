"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"

interface AuthContextProps {
  token: string | null
  username: string | null
  setAuthData: (token: string | null, username: string | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    const savedUsername = localStorage.getItem("username")
    if (savedToken && savedUsername) {
      setToken(savedToken)
      setUsername(savedUsername)
    }
  }, [])

  const setAuthData = (token: string | null, username: string | null) => {
    setToken(token)
    setUsername(username)
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
    if (username) {
      localStorage.setItem("username", username)
    } else {
      localStorage.removeItem("username")
    }
  }

  return (
    <AuthContext.Provider value={{ token, username, setAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
