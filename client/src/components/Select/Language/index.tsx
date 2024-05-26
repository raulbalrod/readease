import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".."

export default function SelectLanguage() {
  return (
    <Select>
      <SelectTrigger className="w-[190px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
        <SelectItem value="english">🇬🇧 English</SelectItem>
        <SelectItem value="french">🇫🇷 French</SelectItem>
      </SelectContent>
    </Select>
  )
}
