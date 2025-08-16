"use client"

import { Check } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { id: 1, name: "Shipping", description: "Delivery information" },
  { id: 2, name: "Payment", description: "Payment method" },
  { id: 3, name: "Review", description: "Order confirmation" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`${stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : ""} relative`}>
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step.id < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "border-primary bg-background text-primary"
                        : "border-muted bg-background text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-4 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      step.id <= currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-5 -ml-px mt-0.5 h-0.5 w-full ${
                    step.id < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
