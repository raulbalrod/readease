import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from ".."

export default function SelectLanguage() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[190px] hidden md:block text-neutral">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
          <SelectItem value="english">🇬🇧 English</SelectItem>
          <SelectItem value="french">🇫🇷 French</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[90px] md:hidden justify-center gap-2 px-1">
          <SelectValue
            placeholder={
              <Image
                src="/icons/translate.png"
                alt="icon translate website"
                width="20"
                height="20"
              />
            }
          />
        </SelectTrigger>
        <SelectContent className="w-[90px]">
          <SelectItem className="w-[90px]" value="spanish">
            🇪🇸
          </SelectItem>
          <SelectItem className="w-[90px]" value="english">
            🇬🇧
          </SelectItem>
          <SelectItem className="w-[90px]" value="french">
            🇫🇷
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
