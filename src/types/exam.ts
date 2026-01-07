import { z } from "zod";
import { questionSchema } from "./question";

export const ExamQuestionSchema = z.object({
  id: z.uuid(),
  orderIndex: z.number().int().nonnegative(),
  createdAt: z.date(),
  examId: z.uuid(),
  questionId: z.uuid(),
  question: questionSchema,
});

export const ExamSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  isPublic: z.boolean(),
  openingDate: z.date(),
  closingDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date().optional().nullable(),
  createdById: z.uuid(),
  updatedById: z.uuid().optional().nullable(),
  questions: z.array(ExamQuestionSchema),
});

export type Exam = z.infer<typeof ExamSchema>;
