import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "boxicons/css/boxicons.min.css"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReadEase | Your Reading Companion",
  description:
    "Discover a new way to enjoy reading with ReadEase, the ultimate app for book lovers. With ReadEase, you have access to a wide selection of books in eBook and audiobook formats, so you can read or listen to your favorite titles anytime, anywhere.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  )
}
