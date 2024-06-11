import Footer from "@/components/Footer"
import HeaderLandingPage from "@/components/Header/header-landing"

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderLandingPage />
      {children}
      <Footer />
    </>
  )
}
