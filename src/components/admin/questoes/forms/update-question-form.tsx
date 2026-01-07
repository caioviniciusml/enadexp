"use client";
import { Check } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAllTopics } from "@/hooks/topics/use-all-topics";
import type { Question } from "@/types/question";
import { useDeleteQuestion } from "@/hooks/questions/use-delete-question";
import { useState } from "react";
import { useUpdateQuestion } from "@/hooks/questions/use-update-question";
import { Difficulty, QuestionOption } from "@/enums/enums";
import { Spinner } from "@/components/ui/spinner";
import { DeleteQuestionDialog } from "../dialogs/delete-question-dialog";

export const UpdateQuestionFormSchema = z.object({
  wording: z.string(),
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
  optionE: z.string(),
  correctOption: z.enum(QuestionOption),
  difficulty: z.enum(Difficulty),
  enadeYear: z.string().optional(),
  topicId: z.string(),
});

export type UpdateQuestionFormData = z.infer<typeof UpdateQuestionFormSchema>;

interface UpdateQuestionFormProps {
  onBack: () => void;
  questionData: Question;
}

export function UpdateQuestionForm({
  onBack,
  questionData,
}: UpdateQuestionFormProps) {
  const { data: topics } = useAllTopics();
  const { mutateAsync: updateQuestion, isPending } = useUpdateQuestion();
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const [correctOption, setCorrectOption] = useState<QuestionOption>(
    questionData.correctOption
  );
  const form = useForm<UpdateQuestionFormData>({
    resolver: zodResolver(UpdateQuestionFormSchema),
    defaultValues: {
      wording: questionData.wording,
      optionA: questionData.optionA,
      optionB: questionData.optionB,
      optionC: questionData.optionC,
      optionD: questionData.optionD,
      optionE: questionData.optionE,
      correctOption: questionData.correctOption,
      difficulty: questionData.difficulty,
      enadeYear: questionData.enadeYear?.toString() || "",
      topicId: questionData.topicId.toString(),
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

  async function onSubmit(data: UpdateQuestionFormData) {
    await updateQuestion({
      questionId: questionData.id,
      questionData: data,
    });
  }

  async function onDelete() {
    await deleteQuestion(questionData.id);
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
                    value={field.value.toString()}
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
                <FormMessage />
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
                    value={field.value.toString()}
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
                <FormMessage />
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
                    value={field.value.toString()}
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
                <FormMessage />
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
          <DeleteQuestionDialog
            isUsed={questionData.isUsed}
            deleteFn={onDelete}
          />
          <Button
            disabled={isPending}
            variant="outline"
            className="cursor-pointer"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? (
              <span className="flex items-center gap-1">
                Salvando
                <Spinner />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Salvar
                <Check />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
