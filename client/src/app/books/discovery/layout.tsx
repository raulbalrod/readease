import Footer from "@/components/Footer"
import HeaderDiscoveryPage from "@/components/Header/header-discovery"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderDiscoveryPage />
      {children}
      <Footer />
    </>
  )
}
