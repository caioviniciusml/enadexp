"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useCreateTopic } from "@/hooks/topics/use-create-topic";
import { Plus } from "lucide-react";

export const CreateTopicFormSchema = z.object({
  title: z.string().min(4, "Insira o Nome do Topico"),
});

export type CreateTopicFormData = z.infer<typeof CreateTopicFormSchema>;

export function CreateTopicForm() {
  const { mutateAsync: createTopic, isError } = useCreateTopic();
  const form = useForm<CreateTopicFormData>({
    resolver: zodResolver(CreateTopicFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: CreateTopicFormData) {
    await createTopic(data);

    form.reset({
      title: "",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Novo Tópico</FormLabel>
              <FormControl>
                <Input placeholder="Tópico" {...field} />
              </FormControl>
              <FormMessage className="" />
              {isError && (
                <span className="font-medium text-sm text-red-500">
                  Tópico ja existente.
                </span>
              )}
            </FormItem>
          )}
        />
        <Button size="icon-sm" className="mt-6 cursor-pointer" type="submit">
          <Plus />
        </Button>
      </form>
    </Form>
  );
}
