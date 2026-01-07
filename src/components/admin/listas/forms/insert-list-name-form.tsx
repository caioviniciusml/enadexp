"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useCreateList } from "@/hooks/lists/use-create-list";

export const InserListNameSchema = z.object({
  title: z.string().min(4, "Insira um Titulo").max(16, "Máximo 16 Caracteres"),
});

export type InserListNameFormData = z.infer<typeof InserListNameSchema>;

interface InserListNameFormProps {
  selectedQuestions: Array<string>;
}

export function InserListNameForm({
  selectedQuestions,
}: InserListNameFormProps) {
  const { mutateAsync: createList, isPending } = useCreateList();
  const form = useForm<InserListNameFormData>({
    resolver: zodResolver(InserListNameSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: InserListNameFormData) {
    await createList({
      title: data.title,
      questionIds: selectedQuestions,
    });

    form.reset({
      title: "",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo da Lista" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-zinc-600 text-sm">
          {selectedQuestions.length !== 1
            ? `${selectedQuestions.length} Questões Selecionadas`
            : "1 Questão Selecionada"}
        </span>
        <Button disabled={isPending} className="cursor-pointer" type="submit">
          {isPending ? (
            <span className="flex items-center gap-1">
              Criando
              <Spinner />
            </span>
          ) : (
            <span className="flex items-center gap-1">
              Criar
              <Plus />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
