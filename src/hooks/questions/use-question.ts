import { useQuery } from "@tanstack/react-query";
import type { Question } from "@/types/question";

export function useQuestion(questionId: string) {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
      
      const questionData: Question = await response.json();
      return questionData;
    },
  });
}
