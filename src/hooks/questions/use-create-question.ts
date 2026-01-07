import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Question } from "@/types/question";
import { CreateQuestionFormData } from "@/components/admin/questoes/forms/create-question-form";
import { getSession } from "@/lib/auth";

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionFormData) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
          body: JSON.stringify({
            wording: data.wording,
            optionA: data.optionA,
            optionB: data.optionB,
            optionC: data.optionC,
            optionD: data.optionD,
            optionE: data.optionE,
            correctOption: data.correctOption,
            difficulty: data.difficulty,
            enadeYear: Number(data.enadeYear) || null,
            topicId: Number(data.topicId),
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const questionData: Question = await response.json();
      return questionData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-questions"] });
    },
  });
}
