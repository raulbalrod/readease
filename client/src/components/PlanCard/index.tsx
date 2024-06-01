import React from "react"
import Button from "../Button"

const PlanCard = ({ plan, isAnnual }: any) => (
  <div
    className={`p-6 border ${
      plan.most_popular
        ? "border-2 border-secondary bg-neutral/10"
        : "border-neutral/20"
    } rounded-xl flex flex-col gap-4 h-96 w-80`}
  >
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-lg text-neutral">{plan.title}</h4>
      {plan.most_popular && (
        <p className="bg-secondary text-neutral font-medium text-xs px-4 py-1 rounded-xl">
          Most Popular
        </p>
      )}
    </div>
    <p className="text-sm text-neutral/80">{plan.description}</p>
    <div className="flex font-semibold">
      <p className="text-4xl">
        {isAnnual ? plan.price_yearly : plan.price_monthly} €
      </p>
      <p className="text-neutral/80">/{isAnnual ? "year" : "month"}</p>
    </div>
    <Button
      text="Buy plan"
      path={plan.redirect}
      variant={plan.most_popular ? "secondary" : "price"}
    />
    <ul>
      {Array.isArray(plan.advantages) &&
        plan.advantages.map((advantage: boolean, index: number) => (
          <li key={index} className="flex items-center gap-2 text-neutral/80">
            <i className="bx bx-check bx-sm"></i>
            <p className="text-sm">{advantage}</p>
          </li>
        ))}
    </ul>
  </div>
)

export default PlanCard
