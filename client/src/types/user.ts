export interface UserDataTypes {
  _id: string
  username: string
  email: string
  role: string
  bookList: Array<{ _id: string; personalStatus: string }>
}
