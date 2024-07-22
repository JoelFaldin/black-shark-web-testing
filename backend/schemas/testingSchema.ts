import { z } from "zod"

const userTestingSchema = z.object({
  username: z
    .string({
      required_error: "You should pass an username.",
      invalid_type_error: "Enter a valid username.",
    })
    .refine(value => /^.{3,50}$/.test(value ?? ""), {
        message: "Username must be min 3 and max 50 characters long.",
    }),
  password: z
      .string({
          required_error: "You should pass a password.",
          invalid_type_error: "Enter a valid password."
      })
      .refine(value => /^.{8,}$/.test(value ?? ""), {
          message: "Password must be at least 8 characters long.",
      }),
    email: z
      .string({
          required_error: "You should pass an email.",
          invalid_type_error: "Enter a valid email."
      })
      .email({
          message: "Send a valid email.",
      })
})

export const validateTestUser = (object: object) => {
  return userTestingSchema.safeParse(object)
}