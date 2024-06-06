export function formatTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
