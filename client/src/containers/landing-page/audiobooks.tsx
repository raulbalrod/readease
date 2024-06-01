import Image from "next/image"
import { useEffect, useState } from "react"

export default function Audiobooks() {
  const [audiobooks, setAudiobooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://bookbuddy-v7ra.onrender.com/v1/books/landing?sort=rateDesc",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setAudiobooks(data.slice(50, 80))
      } else {
        console.error("Error al obtener los datos: ", response.statusText)
      }
    }

    fetchData()
  }, [])

  const firstFiveItems = audiobooks.slice(0, 5)
  const nextFiveItems = audiobooks.slice(23, 28)

  return (
    <>
      <h1 className="text-left text-4xl font-semibold mb-4 w-3/4">
        The <span className="text-secondary">audiobooks</span> everyone is
        talking about
      </h1>
      <h3 className="text-left text-lg mb-8 w-3/4">
        Discover your next fascination in our growing selection of audiobooks
        packed with captivating stories, immersive reality shows, and iconic
        classics, narrated for your listening pleasure.
      </h3>

      <div className="flex flex-col gap-6 items-start justify-center mx-auto max-w-screen-lg pl-4 pt-4">
        <div
          className="hidden md:flex justify-center gap-10"
          style={{ paddingLeft: "40px", paddingTop: "32px" }}
        >
          {firstFiveItems.map((item: any, index: number) => (
            <div key={index}>
              <Image
                src={item.image.frontImage}
                alt={`Front image for ${item.title}`}
                width={250}
                height={325}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <div
          className="hidden md:flex justify-center gap-10 mt-16"
          style={{ paddingLeft: "40px" }}
        >
          {nextFiveItems.map((item: any, index: number) => (
            <div key={index}>
              <Image
                src={item.image.frontImage}
                alt={`Front image for ${item.title}`}
                width={250}
                height={325}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 items-start justify-center mx-auto max-w-screen-lg pl-4 pt-4 md:hidden">
        <div
          className="flex flex-col justify-center gap-10"
          style={{ paddingTop: "30px" }}
        >
          {firstFiveItems.map((item: any, index: number) => (
            <div key={index}>
              <Image
                src={item.image.frontImage}
                alt={`Front image for ${item.title}`}
                width={150}
                height={225}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <div
          className="flex flex-col justify-center gap-10 mt-16"
          style={{ paddingTop: "30px" }}
        >
          {nextFiveItems.map((item: any, index: number) => (
            <div key={index}>
              <Image
                src={item.image.frontImage}
                alt={`Front image for ${item.title}`}
                width={150}
                height={225}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
