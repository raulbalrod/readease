import Footer from "@/components/Footer"
import HeaderBookPage from "@/components/Header/header-book"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderBookPage />
      {children}
      <Footer />
    </>
  )
}
