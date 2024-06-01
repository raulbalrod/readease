"use client"

import { z } from "zod"

export const AccountSchema = z.object({
  username: z.string().min(1, {
    message: "Invalid username, minimum 3 characters",
  }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})
