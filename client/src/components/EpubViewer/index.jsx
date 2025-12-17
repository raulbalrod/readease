import { useState } from "react"
import { ReactReader } from "react-reader"
import { Button } from "../Button/ActionButton"

export const EpubViewer = ({ url, title }) => {
  const [location, setLocation] = useState(0)

  // Si no hay URL, cerrar modal automáticamente
  if (!url) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Contenido no disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: "90vh" }}>
      <ReactReader
        url={url}
        title={title}
        location={location}
        locationChanged={(epubcfi) => setLocation(epubcfi)}
      />
    </div>
  )
}
