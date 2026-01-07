import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/lib/auth";

export function useDeleteTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (topicId: number) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`,
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
      queryClient.invalidateQueries({ queryKey: ["all-topics"] });
    },
  });
}
