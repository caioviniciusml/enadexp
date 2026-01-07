import { Difficulty, QuestionOption } from "@/enums/enums";
import { z } from "zod/v4";

export const questionSchema = z.object({
  id: z.uuid(),
  wording: z.string(),
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
  optionE: z.string(),
  correctOption: z.enum(QuestionOption),
  difficulty: z.enum(Difficulty),
  enadeYear: z.number().optional().nullable(),
  topicId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().optional().nullable(),
  createdById: z.uuid(),
  updatedById: z.date().optional().nullable(),
  topic: z.object({
    id: z.number(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    createdById: z.uuid(),
    updatedById: z.date().optional().nullable(),
  }),
  isUsed: z.boolean(),
});

export type Question = z.infer<typeof questionSchema>;
