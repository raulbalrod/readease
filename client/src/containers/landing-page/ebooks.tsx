import Image from "next/image"
import { useEffect, useState } from "react"

export default function EbooksList() {
  const [ebooks, setEbooks] = useState([])

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
        setEbooks(data.slice(0, 29))
      } else {
        console.error("Error al obtener los datos: ", response.statusText)
      }
    }

    fetchData()
  }, [])

  const firstFiveItems = ebooks.slice(16, 19)
  const nextFiveItems = ebooks.slice(0, 3)

  return (
    <>
      <div className="z-10">
        <h1 className="text-left text-4xl font-semibold mb-4 w-72">
          Best <span className="text-secondary">ebooks</span>
        </h1>
        <h3 className="text-left text-lg mb-8 w-[550px]">
          Explore the most outstanding literary gems, from the latest works to
          your favorite comedies, dramas and classics, now available in ebook
          format so you can enjoy a unique reading experience.
        </h3>
      </div>
      <div className="flex flex-col gap-6 items-start justify-center mx-auto max-w-screen-lg pl-4 z-10">
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
