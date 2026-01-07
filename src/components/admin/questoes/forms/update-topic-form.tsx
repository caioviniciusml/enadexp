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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Topic } from "@/types/topic";
import { useUpdateTopic } from "@/hooks/topics/use-update-topic";

export const UpdateTopicFormSchema = z.object({
  title: z.string().min(4, "Nome do Topico Obrigatório"),
});

export type UpdateTopicFormData = z.infer<typeof UpdateTopicFormSchema>;

interface UpdateTopicFormProps {
  topic: Topic;
  setEditingTopic: (topic: Topic | null) => void;
}

export function UpdateTopicForm({
  topic,
  setEditingTopic,
}: UpdateTopicFormProps) {
  const { mutateAsync: updateTopic, isError } = useUpdateTopic();
  const form = useForm<UpdateTopicFormData>({
    resolver: zodResolver(UpdateTopicFormSchema),
    defaultValues: {
      title: topic.title,
    },
  });

  async function onSubmit(data: UpdateTopicFormData) {
    await updateTopic({ topicId: topic.id, topicData: data });

    form.reset({
      title: "",
    });

    setEditingTopic(null);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="text-sm md:text-base bg-white"
                  placeholder="Tópico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {isError && (
                <span className="text-sm text-red-500 font-medium">
                  Tópico ja existente.
                </span>
              )}
            </FormItem>
          )}
        />
        <Button size="icon" className="cursor-pointer" type="submit">
          <Check />
        </Button>
      </form>
    </Form>
  );
}
