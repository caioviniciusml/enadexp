import { getSession } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: string) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "user-role": session?.userData.role || "",
          },
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      return response.statusText;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-questions"],
      });
    },
  });
}
