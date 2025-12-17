import Image from "next/image"
import { useEffect, useState } from "react"
import { API_URLS } from "@/config/api"

export default function ItemsList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        API_URLS.BOOKS_LANDING_SORTED("rateDesc"),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setItems(data.slice(0, 15))
      } else {
        console.error("Error al obtener los datos: ", response.statusText)
      }
    }

    fetchData()
  }, [])

  const firstFiveItems = items.slice(3, 8)
  const nextFiveItems = items.slice(10, 15)

  return (
    <>
      <h1 className="text-left text-4xl font-semibold mb-4 w-72">
        Everything you can't miss
      </h1>
      <h3 className="text-left text-lg mb-8 w-full">
        Enjoy a unique collection of avant-garde literary works, critically
        praised books in ebook and audiobook format.
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
