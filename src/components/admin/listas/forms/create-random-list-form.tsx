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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useAllTopics } from "@/hooks/topics/use-all-topics";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateRandomList } from "@/hooks/lists/use-create-random-list";

export const CreateRandomListSchema = z.object({
  title: z.string().min(4, "Insira um Titulo"),
  easyQuestions: z.boolean().optional(),
  mediumQuestions: z.boolean().optional(),
  hardQuestions: z.boolean().optional(),
  topics: z.array(z.string()).min(1, "Escolha ao menos um Topico"),
  onlyEnade: z.boolean().optional(),
  questionCount: z
    .string()
    .nonempty("Informe a quantidade de questões")
    .refine((val) => {
      const n = Number(val);
      return Number.isInteger(n) && n <= 10;
    }, "No máximo 10 questões"),
});

export type CreateRandomListFormData = z.infer<typeof CreateRandomListSchema>;

interface CreateRandomListFormProps {
  onBack: () => void;
}

export function CreateRandomListForm({ onBack }: CreateRandomListFormProps) {
  const { data: topicsData } = useAllTopics();
  const { mutateAsync: createRandomList } = useCreateRandomList();
  const form = useForm<CreateRandomListFormData>({
    resolver: zodResolver(CreateRandomListSchema),
    defaultValues: {
      title: "",
      easyQuestions: false,
      mediumQuestions: false,
      hardQuestions: false,
      topics: [],
      onlyEnade: false,
      questionCount: "",
    },
  });

  async function onSubmit(data: CreateRandomListFormData) {
    const randomListParams = {
      title: data.title,
      easyQuestions: data.easyQuestions || true,
      mediumQuestions: data.mediumQuestions || true,
      hardQuestions: data.hardQuestions || true,
      topics: data.topics.map((topic) => Number(topic)) || [],
      onlyEnade: data.easyQuestions || false,
      questionCount: Number(data.questionCount) || 5,
    };

    await createRandomList(randomListParams);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormDescription className="text-justify leading-relaxed">
          Os Parametros serão utilizados como pesos preferenciais para gerar uma
          Lista Aleatória. Se não houverem questões suficientes que se encaixem
          nos filtros escolhidos, serão utilizadas outras questões escolhidas
          aleatoriamente.
        </FormDescription>
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
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Tópicos</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Selecionar</Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-60">
                    {topicsData?.map((topic) => {
                      const id = topic.id.toString();
                      const checked = field.value.includes(id);

                      return (
                        <DropdownMenuCheckboxItem
                          key={id}
                          checked={checked}
                          onCheckedChange={(checked) => {
                            field.onChange(
                              checked
                                ? [...field.value, id]
                                : field.value.filter((v) => v !== id)
                            );
                          }}
                        >
                          {topic.title}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionCount"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Quantidade de Questões</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantidade de Questões"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Dificuldade das Questões (1 ou mais)</FormLabel>
        <div className="w-full flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="easyQuestions"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-center">
                <FormControl>
                  <Checkbox
                    className="border border-zinc-900"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Fácil</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediumQuestions"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-center">
                <FormControl>
                  <Checkbox
                    className="border border-zinc-900"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Média</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hardQuestions"
            render={({ field }) => (
              <FormItem className="flex gap-1 items-center">
                <FormControl>
                  <Checkbox
                    className="border border-zinc-900"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Díficil</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="onlyEnade"
          render={({ field }) => (
            <FormItem className="mt-2 flex items-center gap-2">
              <FormControl>
                <Checkbox
                  className="border border-zinc-900"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Somente Questões Enade</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="text-white bg-zinc-600 hover:bg-zinc-600 cursor-pointer"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button className="cursor-pointer" type="submit">
            {false ? (
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
