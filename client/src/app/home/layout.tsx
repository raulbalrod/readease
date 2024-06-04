import "../globals.css"
import "boxicons/css/boxicons.min.css"
import HeaderHomePage from "@/components/Header/header-home"
import Footer from "@/components/Footer"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderHomePage />
      {children}
      <Footer />
    </>
  )
}
