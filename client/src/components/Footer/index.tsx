import { LEGAL_LINK } from "@/constants/legals"
import { SOCIAL_MEDIA } from "@/constants/rrss"

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center gap-4 py-10">
      <ul className="flex gap-5">
        {SOCIAL_MEDIA.map((rs) => (
          <li key={rs.name}>
            <a href={rs.link}>
              <i
                className={`bx ${rs.logo} bx-md text-neutral hover:text-neutral/85`}
              ></i>
            </a>
          </li>
        ))}
      </ul>
      <ul className="flex gap-5">
        {LEGAL_LINK.map((rs) => (
          <li
            key={rs.name}
            className="text-neutral hover:underline cursor-pointer"
          >
            <a href={rs.link} target="_blank">
              {rs.title}
            </a>
          </li>
        ))}
      </ul>
      <span className="text-neutral">
        ©2023 BookBudy SA. All Rights Reserved Bookbuddy™ is used under license.
      </span>
    </footer>
  )
}
