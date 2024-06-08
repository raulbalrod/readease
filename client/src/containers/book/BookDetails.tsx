import Image from "next/image"
import BookWhitLink from "../home/Book"

export default function BookDetails({
  _id,
  title,
  subtitle,
  renderRating,
  rating,
  categories,
  toggleModal,
  showFullDescription,
  description,
  toggleDescription,
  img,
  name,
  isBookmarked,
  handleBookmarkClick,
}: any) {
  return (
    <>
      <div className="md:w-1/3 flex items-center justify-center">
        <BookWhitLink id={_id} title={title} />
      </div>

      <div className="md:w-2/3 flex flex-col space-y-3">
        <div className="w-full flex md:flex-row flex-col justify-between">
          <h1 className="text-secondary font-semibold text-xl">{title}</h1>
          <p>{renderRating(rating)}</p>
        </div>
        <h3 className="font-medium text-lg">{subtitle}</h3>

        <section className="flex space-x-2">
          {categories.map((category: any) => (
            <p
              className="w-fit p-1 px-4 text-sm font-semibold text-accent border-2 border-accent rounded-xl hover:bg-accent/20 cursor-pointer"
              key={category}
            >
              {category}
            </p>
          ))}
        </section>

        <section className="flex space-x-4 items-center">
          <div
            className="w-fit p-1 px-4 text-lg bg-ebook-linear rounded-xl font-semibold cursor-pointer"
            onClick={() => toggleModal("ebook")}
          >
            Ebook
          </div>
          <div
            className="w-fit p-1 px-4 text-lg bg-audiobook-linear rounded-xl font-semibold cursor-pointer"
            onClick={() => toggleModal("audiobook")}
          >
            Audiobook
          </div>
          <i
            className={`bx ${
              isBookmarked ? "bxs-bookmarks" : "bx-bookmarks"
            } hover:text-neutral/80 cursor-pointer bx-sm`}
            onClick={handleBookmarkClick}
          ></i>
        </section>

        <div>
          <p className="w-3/4">
            {showFullDescription
              ? description
              : `${description.substring(0, 200)}...`}
          </p>
          <button
            onClick={toggleDescription}
            className="text-accent hover:text-accent/90"
          >
            {showFullDescription ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>

        <section className="space-y-2">
          <h4 className="font-bold">About the authors</h4>
          <div className="flex space-x-2 items-center">
            <Image
              src={img}
              alt={`Photo of ${name}`}
              width={45}
              height={45}
              style={{ borderRadius: "100%", width: 45, height: 45 }}
            />
            <p className="font-semibold text-accent">{name}</p>
          </div>
        </section>
      </div>
    </>
  )
}
