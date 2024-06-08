import { useState } from "react"
import { ReactReader } from "react-reader"

export const EpubViewer = ({ url, title }) => {
  const [location, setLocation] = useState(0)

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
