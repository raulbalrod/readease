import Footer from "@/components/Footer"
import HeaderMyListPage from "@/components/Header/header-mylist"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderMyListPage />
      {children}
      <Footer />
    </>
  )
}
