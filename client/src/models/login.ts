"use client"

import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "User o password invalid.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})
