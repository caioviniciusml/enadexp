"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useSignup } from "@/hooks/auth/use-signup";
import { UserRole } from "@/enums/enums";
import { Spinner } from "../ui/spinner";

const signupFormSchema = z.object({
  name: z.string().min(7, "Insira seu Nome Completo"),
  email: z.email("Insira seu Email"),
  role: z.enum(UserRole, "Selecione um Perfil"),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;

export function SignupForm() {
  const { mutateAsync: signup, isPending, isError } = useSignup();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
    },
  });

  async function onSubmit(data: SignupFormData) {
    await signup(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-80 flex flex-col items-center gap-4"
      >
        <FormDescription className="self-start text-lg font-bold">
          Cadastro
        </FormDescription>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold text-primary-green">
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome Completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold text-primary-green">
                Perfil
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um Perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALUNO">Estudante</SelectItem>
                      <SelectItem value="PROFESSOR">Professor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <span className="mt-2 text-sm text-red-500">Email já utilizado</span>
        )}
        <Button disabled={isPending} className="mt-2 cursor-pointer" type="submit">
          {isPending ? (
            <span className="flex items-center gap-1">
              Criando Conta
              <Spinner />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Criar Conta
              <Plus />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
