import { getSession } from "@/lib/auth";
import { ExamAttempt } from "@/types/exam-attempt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SubmitExamAttemptDto {
  examId: string;
  examAttempt: ExamAttempt;
}

export function useSubmitExamAttempt() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ examId, examAttempt }: SubmitExamAttemptDto) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}/attempt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
          body: JSON.stringify(examAttempt),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Submit Exam Attemtps");
      }

      return response.json();
    },
    onSuccess: async () => {
      const session = await getSession();
      queryClient.invalidateQueries({ queryKey: ["all-exams"] });
      router.push(`/${session?.userData.role.toLowerCase()}/simulados`);
    },
  });
}
