import { z } from "zod/v4";
import { UserSchema } from "@/types/user";

export const ExamAnswerSchema = z.object({
  isCorrect: z.boolean(),
});

export const ExamSubmittedAttemptSchema = z.object({
  id: z.uuid(),
  student: UserSchema,
  submittedAt: z.date(),
  correctAnswers: z.number().int().min(0),
});

export const examReportSchema = z.object({
  examId: z.uuid(),
  examTitle: z.string(),
  totalQuestions: z.number().int(),
  totalAttempts: z.number().int(),
  averageCorrectAnswers: z.number(),
  attempts: z.array(ExamSubmittedAttemptSchema),
});

export type ExamAnswer = z.infer<typeof ExamAnswerSchema>;
export type ExamSubmittedAttempt = z.infer<typeof ExamSubmittedAttemptSchema>;
export type ExamReport = z.infer<typeof examReportSchema>;
