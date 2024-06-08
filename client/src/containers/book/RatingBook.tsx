export const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating)
  const emptyStars = 5 - fullStars
  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <i key={index} className="bx bxs-star text-[#F0B334]"></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i key={index} className="bx bx-star text-[#F0B334]"></i>
      ))}
    </>
  )
}
