import { getSession } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useDeleteExam() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (examId: string) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      return response.status;
    },
    onSuccess: async () => {
      const session = await getSession();
      queryClient.invalidateQueries({
        queryKey: ["all-exams"],
      });
      router.push(
        `/${session?.userData.role.toLowerCase()}/simulados/`
      );
    },
  });
}
