import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateQuestionFormData } from "@/components/admin/questoes/forms/update-question-form";
import type { Question } from "@/types/question";
import { getSession } from "@/lib/auth";

interface UpdateQuestionDTO {
  questionId: string;
  questionData: UpdateQuestionFormData;
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, questionData }: UpdateQuestionDTO) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
          body: JSON.stringify({
            wording: questionData.wording,
            optionA: questionData.optionA,
            optionB: questionData.optionB,
            optionC: questionData.optionC,
            optionD: questionData.optionD,
            optionE: questionData.optionE,
            correctOption: questionData.correctOption,
            difficulty: questionData.difficulty,
            enadeYear: Number(questionData.enadeYear) || null,
            topicId: Number(questionData.topicId),
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const updatedQuestionData: Question = await response.json();
      return updatedQuestionData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-questions"] });
    },
  });
}
