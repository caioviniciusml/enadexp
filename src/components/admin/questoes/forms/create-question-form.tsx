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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCreateQuestion } from "@/hooks/questions/use-create-question";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { QuestionExtractedData } from "@/types/question-extracted-data";
import { useAllTopics } from "@/hooks/topics/use-all-topics";
import { useState } from "react";
import { Difficulty, QuestionOption } from "@/enums/enums";
import { Spinner } from "@/components/ui/spinner";

export const CreateQuestionFormSchema = z.object({
  wording: z.string().min(10, "Insira o Enunciado"),
  optionA: z.string().min(1, "Insira a Alternativa A"),
  optionB: z.string().min(1, "Insira a Alternativa B"),
  optionC: z.string().min(1, "Insira a Alternativa C"),
  optionD: z.string().min(1, "Insira a Alternativa D"),
  optionE: z.string().min(1, "Insira a Alternativa E"),
  correctOption: z.enum(QuestionOption, "Escolha a Alternativa Correta"),
  difficulty: z.enum(Difficulty, "Escolha uma Dificuldade"),
  enadeYear: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val.trim() === "") return true;

        const year = Number(val);
        return Number.isInteger(year) && year >= 2000;
      },
      {
        message: "Escolha um Ano depois de 2000",
      }
    ),
  topicId: z.string("Escolha um Topico"),
});

export type CreateQuestionFormData = z.infer<typeof CreateQuestionFormSchema>;

interface CreateQuestionFormProps {
  onBack: () => void;
  payload?: QuestionExtractedData | null;
}

export function CreateQuestionForm({
  onBack,
  payload,
}: CreateQuestionFormProps) {
  const { data: topics } = useAllTopics();
  const { mutateAsync: createQuestion, isPending } = useCreateQuestion();
  const [correctOption, setCorrectOption] = useState<QuestionOption | null>(
    null
  );
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(CreateQuestionFormSchema),
    defaultValues: {
      wording: payload?.wording || "",
      optionA: payload?.optionA || "",
      optionB: payload?.optionB || "",
      optionC: payload?.optionC || "",
      optionD: payload?.optionD || "",
      optionE: payload?.optionE || "",
      correctOption: undefined,
      difficulty: undefined,
      enadeYear: "",
      topicId: undefined,
    },
  });

  function handleCorrectOptionChange(value: string) {
    switch (value) {
      case "A":
        setCorrectOption(QuestionOption.A);
        break;
      case "B":
        setCorrectOption(QuestionOption.B);
        break;
      case "C":
        setCorrectOption(QuestionOption.C);
        break;
      case "D":
        setCorrectOption(QuestionOption.D);
        break;
      case "E":
        setCorrectOption(QuestionOption.E);
        break;
    }
  }

  async function onSubmit(data: CreateQuestionFormData) {
    await createQuestion(data);
    form.reset({
      wording: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      optionE: "",
      correctOption: undefined,
      difficulty: undefined,
      enadeYear: "",
      topicId: undefined,
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
          name="wording"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Enunciado</FormLabel>
              <FormControl>
                <Textarea
                  className="h-40 resize-none"
                  placeholder="Insira o Enunciado"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionA"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel
                className={`font-bold ${
                  correctOption === QuestionOption.A && "text-primary-green"
                }`}
              >
                A
              </FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    className={`${
                      correctOption === QuestionOption.A &&
                      "text-primary-green border-primary-green border-2 font-bold"
                    }`}
                    placeholder="Alternativa A"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionB"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel
                className={`font-bold ${
                  correctOption === QuestionOption.B && "text-primary-green"
                }`}
              >
                B
              </FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    className={`${
                      correctOption === QuestionOption.B &&
                      "text-primary-green border-primary-green border-2 font-bold"
                    }`}
                    placeholder="Alternativa B"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionC"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel
                className={`font-bold ${
                  correctOption === QuestionOption.C && "text-primary-green"
                }`}
              >
                C
              </FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    className={`${
                      correctOption === QuestionOption.C &&
                      "text-primary-green border-primary-green border-2 font-bold"
                    }`}
                    placeholder="Alternativa C"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionD"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel
                className={`font-bold ${
                  correctOption === QuestionOption.D && "text-primary-green"
                }`}
              >
                D
              </FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    className={`${
                      correctOption === QuestionOption.D &&
                      "text-primary-green border-primary-green border-2 font-bold"
                    }`}
                    placeholder="Alternativa D"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="optionE"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormLabel
                className={`font-bold ${
                  correctOption === QuestionOption.E && "text-primary-green"
                }`}
              >
                E
              </FormLabel>
              <div className="w-full">
                <FormControl>
                  <Input
                    className={`${
                      correctOption === QuestionOption.E &&
                      "text-primary-green border-primary-green border-2 font-bold"
                    }`}
                    placeholder="Alternativa E"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Dificuldade</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="EASY">
                          <Badge className="bg-green-600">Facil</Badge>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <Badge className="bg-yellow-600">Medio</Badge>
                        </SelectItem>
                        <SelectItem value="HARD">
                          <Badge className="bg-red-600">Dificil</Badge>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="correctOption"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Opção Correta</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCorrectOptionChange(value);
                    }}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="E">E</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topicId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Topico</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {topics?.map((topic) => (
                          <SelectItem
                            key={topic.id}
                            value={topic.id.toString()}
                          >
                            {topic.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="enadeYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano ENADE</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button
            disabled={isPending}
            variant="secondary"
            className="text-white bg-zinc-600 hover:bg-zinc-600 cursor-pointer"
            onClick={onBack}
          >
            Voltar
          </Button>
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
        </div>
      </form>
    </Form>
  );
}
