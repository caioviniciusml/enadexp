import { Topic } from "@/types/topic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTopicFormData } from "@/components/admin/questoes/forms/create-topic-form";
import { getSession } from "@/lib/auth";

export function useCreateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTopicFormData) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
          body: JSON.stringify({
            title: data.title,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const topicData: Topic = await response.json();
      return topicData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-topics"] });
    },
  });
}
