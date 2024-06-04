"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountSchema } from "@/models/createAccount"
import FormSubscription from "@/containers/subscription/FormSubscription"
import LoaderSubscription from "../laoder"
import { useAuth } from "@/contexts/AuthContext"

export default function EliteSubscriptionPage() {
  const router = useRouter()
  const { setAuthData } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof AccountSchema>) => {
    setIsLoading(true)
    const response = await fetch(
      "https://bookbuddy-v7ra.onrender.com/v1/users/premiumUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )

    const result = await response.json()
    setIsLoading(false)

    if (response.ok) {
      localStorage.setItem("token", result.token)
      localStorage.setItem("username", data.username)
      setAuthData(result.token, data.username)
      router.push("/home")
    } else {
      console.error("Error en el login: ", result.message)
    }
  }

  return (
    <main className="flex flex-col items-start text-neutral">
      {isLoading ? (
        <LoaderSubscription />
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-2 py-16 bg-black/20 bg-subscription-linear">
          <div className="flex justify-between w-1/2 px-4 py-2 bg-black/20 bg-paymentype-linear rounded-lg shadow-lg text-base font-medium">
            <p>Selected Payment Type Elite</p>
            <a
              href="/subscription"
              className="flex justify-center items-center gap-2 hover:text-neutral/80"
            >
              <p className="uppercase">price</p>
              <i className="bx bxs-edit"></i>
            </a>
          </div>
          <p className="uppercase text-neutral/90">step 2 of 3</p>
          <h2 className="text-4xl font-semibold">Create your account</h2>
          <p className="text-neutral/90">
            You are about to start enjoying the best books with Bookbuddy
          </p>

          <FormSubscription form={form} onSubmit={onSubmit} />
        </div>
      )}
    </main>
  )
}
