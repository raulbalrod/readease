import Image from "next/image"
import { useEffect, useState } from "react"

export default function ItemsList() {
  const [items, setItems] = useState([])

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
    <div className="flex flex-col gap-6 items-start justify-center mx-auto max-w-screen-lg pl-4">
      <div className="flex items-center gap-10" style={{ paddingLeft: "40px" }}>
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
  )
}
