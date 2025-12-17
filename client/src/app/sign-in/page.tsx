"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/models/login"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button/ActionButton"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { API_URLS } from "@/config/api"

export default function SignInPage() {
  const router = useRouter()
  const { setAuthData } = useAuth()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await fetch(
      API_URLS.USER_LOGIN,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )

    const result = await response.json()

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
    <main className="flex min-h-[65vh] flex-col items-center justify-center md:gap-6 bg-bg-linear py-40">
      <h5 className="md:text-3xl text-2xl font-semibold">Sign in</h5>
      <div className="md:p-16 md:border md:border-neutral/60 md:bg-login-linear rounded-xl md:shadow-lg md:scale-100 scale-75">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="signin"
                      type="text"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      variant="signin"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 w-full">
              <div className="w-1/3">
                <Button variant="default" type="submit">
                  Sign in
                </Button>
              </div>
              <Link href="subscription" className="hover:underline">
                Do you need an account?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
