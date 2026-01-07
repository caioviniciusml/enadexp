import { QuestionOption } from "@/enums/enums";
import { z } from "zod/v4";

export const ExamAnswerSchema = z.object({
  questionId: z.uuid(),
  selectedAnswer: z.enum(QuestionOption),
});

export const ExamAttemptSchema = z.object({
  answers: z.array(ExamAnswerSchema),
});

export type ExamAttempt = z.infer<typeof ExamAttemptSchema>;
