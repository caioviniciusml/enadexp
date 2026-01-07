"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { useLogin } from "@/hooks/auth/use-login";

const loginFormSchema = z.object({
  email: z.email("Insira seu Email"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { mutateAsync: login, isPending, isError } = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    await login(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-80 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold text-primary-green">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <span className="mt-2 text-sm text-red-500">
            Usuário não encontrado
          </span>
        )}
        <Button disabled={isPending} className="mt-6 cursor-pointer" type="submit">
          {isPending ? (
            <span className="flex items-center gap-1">
              Entrando
              <Spinner />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Entrar
              <LogIn />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
