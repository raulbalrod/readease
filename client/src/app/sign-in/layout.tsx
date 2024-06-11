import Footer from "@/components/Footer"
import HeaderSignIn from "@/components/Header/header-login"

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderSignIn />
      {children}
      <Footer />
    </>
  )
}
