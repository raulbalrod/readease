import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button/ActionButton"

export default function FormSubscription({ form, onSubmit }: any) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  variant="signin"
                  type="text"
                  placeholder="Email (email@email.com)"
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
        <div className="mt-6 w-full flex flex-col justify-center items-center gap-4 px-10 py-4 bg-accent/20 rounded-lg shadow-lg">
          <p className="text-sm">
            By clicking Create Account, you confirm that you are over 18 years
            of age, accept the{" "}
            <span className="text-secondary">Terms of Use</span> and confirm
            that you have read our
            <span className="text-secondary"> Privacy Policy</span>.
          </p>
          <Button
            variant="default"
            type="submit"
            className="w-1/2 text-sm rounded-xl"
          >
            Submit
          </Button>
          <p className="text-sm">
            To revoke your consent (including any other consent you may have
            previously given) and obtain more information about your rights and
            how to exercise them, please review the{" "}
            <span className="text-secondary">Privacy Policy</span>.
          </p>
        </div>
      </form>
    </Form>
  )
}
