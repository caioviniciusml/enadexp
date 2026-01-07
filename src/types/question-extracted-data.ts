import { z } from "zod/v4";

export const QuestionExtractedDataSchema = z.object({
  wording: z.string(), 
  optionA: z.string(),
  optionB: z.string(),
  optionC: z.string(),
  optionD: z.string(),
  optionE: z.string(),
});

export type QuestionExtractedData = z.infer<typeof QuestionExtractedDataSchema>;
