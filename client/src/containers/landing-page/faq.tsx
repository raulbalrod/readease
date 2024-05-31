import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { FAQ } from "@/constants/faq"

export default function FaqSection() {
  return (
    <div
      id="faq"
      className="w-full flex flex-col items-center justify-center gap-4 py-16"
    >
      <h1 className="text-secondary font-semibold">FAQ</h1>
      <h3 className="text-center text-4xl font-semibold">
        What everyone is wondering about Bookbuddy
      </h3>
      <Accordion type="single" collapsible>
        {FAQ.map((qa) => (
          <AccordionItem
            key={qa.question}
            value={qa.question}
            className="text-[#BEB2F4] w-[600px]"
          >
            <AccordionTrigger className="text-lg">
              {qa.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {qa.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
