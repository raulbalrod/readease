import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { FAQ } from "@/constants/faq"

export default function FaqSection() {
  return (
    <>
      <h1 className="text-secondary font-semibold">FAQ</h1>
      <h3 className="text-center text-4xl lg:w-full w-3/4  font-semibold">
        What everyone is wondering about ReadEase
      </h3>
      <Accordion type="single" collapsible>
        {FAQ.map((qa) => (
          <AccordionItem key={qa.question} value={qa.question}>
            <AccordionTrigger className="text-lg">
              {qa.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {qa.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
