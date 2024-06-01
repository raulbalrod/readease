import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"
import HeaderLandingPage from "@/components/Header/header-landing"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bookbuddy | Your Reading Companion",
  description:
    "Discover a new way to enjoy reading with BookBuddy, the ultimate app for book lovers. With BookBuddy, you have access to a wide selection of books in eBook and audiobook formats, so you can read or listen to your favorite titles anytime, anywhere.",
}

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderLandingPage />
        {children}
        <Footer />
      </body>
    </html>
  )
}
