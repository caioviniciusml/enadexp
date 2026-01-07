import { z } from "zod/v4";
import { questionSchema } from "./question";

export const ListSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional().nullable(),
  createdById: z.uuid(),
  updatedById: z.uuid().optional().nullable(),
  listQuestions: z.array(
    z.object({
      id: z.uuid(),
      orderIndex: z.number(),
      createdAt: z.date(),
      listId: z.uuid(),
      questionId: z.uuid(),
      question: questionSchema
    })
  ),
});

export type List = z.infer<typeof ListSchema>;
