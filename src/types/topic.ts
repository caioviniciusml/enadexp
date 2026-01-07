import { z } from "zod/v4";

export const TopicSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.date(),
  createdById: z.uuid(),
  updatedAt: z.date().optional().nullable(),
  updatedById: z.uuid().optional().nullable(),
});

export type Topic = z.infer<typeof TopicSchema>;
