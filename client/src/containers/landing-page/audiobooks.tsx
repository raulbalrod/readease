import Image from "next/image"
import { useEffect, useState } from "react"

export default function Audiobooks() {
  const [audiobooks, setAudiobooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")

      const response = await fetch(
        "https://bookbuddy-v7ra.onrender.com/v1/books?sort=rateDesc",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
  const nextFiveItems = audiobooks.slice(22, 27)

  return (
    <>
      <h1
        className="text-left text-4xl font-semibold mb-4"
        style={{ width: "480px" }}
      >
        The <span className="text-secondary">audiobooks</span> everyone is
        talking about
      </h1>
      <h3 className="text-left text-lg mb-8 w-[600px]">
        Discover your next fascination in our growing selection of audiobooks
        packed with captivating stories, immersive reality shows, and iconic
        classics, narrated for your listening pleasure.
      </h3>
      <div className="flex flex-col gap-6 items-start justify-center mx-auto max-w-screen-lg pl-4">
        <div
          className="flex items-center gap-10"
          style={{ paddingLeft: "40px" }}
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
          className="flex items-start gap-10 mt-16"
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
    </>
  )
}
