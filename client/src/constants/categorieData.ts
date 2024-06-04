export const SECTION_HOME_PAGE = ({ username }: any) => [
  { title: "Only on Bookbuddy", endpoint: "books?sort=za" },
  { title: "Most Popular Books", endpoint: "books?sort=rateDesc" },
  { title: "My List", endpoint: `users/${username}/books` },
  { title: "Books on Philosophy", endpoint: "books?categorie=Filosofía" },
  {
    title: "Tales of Brave and Admirable Women",
    endpoint: "books?categorie=Mujeres Inspiradoras",
  },
  {
    title: "Technological Development and Coding",
    endpoint: "books?categorie=Tecnología",
  },
  { title: "Biographies", endpoint: "books?categorie=Biografía" },
  {
    title: "Books on Fantasy and Adventures",
    endpoint: "books?categorie=Fantasía",
  },
  {
    title: "Readings for Personal Growth and Well-Being",
    endpoint: "books?categorie=Desarrollo Personal",
  },
  {
    title: "Books on Economics and Finance",
    endpoint: "books?categorie=Economía",
  },
  {
    title: "Historical Narratives and Chronicles",
    endpoint: "books?categorie=Historia",
  },
  {
    title: "Stories of Love and Falling in Love",
    endpoint: "books?categorie=Amor y Romance",
  },
]
