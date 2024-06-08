import AudiobookPlayer from "@/components/AudioboookPlayer"
import { EpubViewer } from "@/components/EpubViewer"

export default function ModalBook({
  toggleModal,
  modalContent,
  title,
  ebook,
  frontImage,
  name,
  audiobook,
}: any) {
  return (
    <div className="max-h-full max-w-full rounded-2xl">
      <i
        className="bx bx-x bx-md absolute top-2 right-2 cursor-pointer z-50 hover:text-neutral/70"
        onClick={toggleModal}
      ></i>
      <div className="w-[70vw] h-[90vh]">
        {modalContent === "ebook" && <EpubViewer url={ebook} title={title} />}
        {modalContent === "audiobook" && (
          <div className="w-[70vw] h-[90vh]">
            <AudiobookPlayer
              frontImage={frontImage}
              title={title}
              authorName={name}
              audioUrl={audiobook}
            />
          </div>
        )}
      </div>
    </div>
  )
}
