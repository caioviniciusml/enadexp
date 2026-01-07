import { getSession } from "@/lib/auth";
import { Exam } from "@/types/exam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CreateExamDto {
  title: string;
  isPublic: boolean;
  openingDate: Date;
  closingDate: Date;
  questionIds: string[];
}

export function useCreateExam() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateExamDto) => {
      const session = await getSession();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.userData.id || "",
          "user-role": session?.userData.role || "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create exam");
      }

      const examData: Exam = await response.json();
      return examData;
    },
    onSuccess: async (examData) => {
      const session = await getSession();
      queryClient.invalidateQueries({ queryKey: ["all-exams"] });
      router.push(
        `/${session?.userData.role.toLowerCase()}/simulados/${examData.id}`
      );
    },
  });
}
