"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import HeaderSignIn from "@/components/Header/header-login"
import BookImageWhitLink from "@/containers/mylist/BookImage"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      router.push("/landing-page")
    } else {
      router.push("/home")
    }
  }, [router])

  const IMAGE_FILES = [
    "cien_a_os_de_soledad",
    "cumbres_borrascosas",
    "de_la_brevedad_de_la_vida",
    "deep_learning",
    "dioses__tumbas_y_sabios",
    "effective_java",
    "el_amante_de_lady_chatterly",
    "el_arte_de_amar",
    "el_c_digo_da_vinci",
    "el_c_digo_del_dinero",
    "el_camino_de_los_reyes",
  ]

  return (
    <>
      <HeaderSignIn />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <BookImageWhitLink key={index} id="" title={IMAGE_FILES[index]} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
