"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateExam } from "@/hooks/exams/use-create-exam";

export const CreateExamSchema = z
  .object({
    title: z.string().min(4, "Insira um Título"),
    isPublic: z.boolean(),
    openingDate: z.string().nonempty("Informe a data de abertura"),
    closingDate: z.string().nonempty("Informe a data de fechamento"),
    questionIds: z.array(z.string()).min(1, "Selecione ao menos uma questão"),
  })
  .refine(
    (data) => {
      if (data.openingDate && data.closingDate) {
        return new Date(data.openingDate) < new Date(data.closingDate);
      }
      return true;
    },
    {
      error: "A data de fechamento deve ser posterior à data de abertura",
      path: ["closingDate"],
    }
  );

export type CreateExamFormData = z.infer<typeof CreateExamSchema>;

interface CreateExamFormProps {
  selectedQuestions: Array<string>;
}

export function CreateExamForm({ selectedQuestions }: CreateExamFormProps) {
  const { mutateAsync: createExam, isPending } = useCreateExam();
  const form = useForm<CreateExamFormData>({
    resolver: zodResolver(CreateExamSchema),
    defaultValues: {
      title: "",
      isPublic: false,
      openingDate: "",
      closingDate: "",
      questionIds: selectedQuestions,
    },
  });

  async function onSubmit(data: CreateExamFormData) {
    const examDto = {
      title: data.title,
      isPublic: data.isPublic,
      openingDate: new Date(data.openingDate),
      closingDate: new Date(data.closingDate),
      questionIds: data.questionIds,
    };

    await createExam(examDto);
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
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do Simulado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    className="border-zinc-700"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Vísivel a Todos</FormLabel>
              </div>
              <FormDescription className="text-xs">
                Simulados Não Vísiveis não são mostrados aos alunos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="openingDate"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Data e Horário de Abertura</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="closingDate"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Data e Horário de Encerramento</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex justify-end gap-2">
          <Button className="cursor-pointer" type="submit" disabled={isPending}>
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
        </div>
      </form>
    </Form>
  );
}
