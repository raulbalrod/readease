export interface BookTypes {
  _id: string
  title: string
  subtitle: string
  description: string
  categories: string[]
  rating: number
  status: string
  image: { frontImage: string }
  authors: { name: string; img: string; biography: string }
  editorial: string
  pageCount: number
  ebook: string
  audiobook: string
  createdAt: { $date: string }
  updatedAt: { $date: string }
}
