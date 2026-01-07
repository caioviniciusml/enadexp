import { useQuery } from "@tanstack/react-query";
import type { Question } from "@/types/question";

export function useAllQuestions() {
  return useQuery({
    queryKey: ["all-questions"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`);
      const questionsData: Array<Question> = await response.json();
      return questionsData;
    },
  });
}
