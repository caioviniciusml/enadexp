import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Topic } from "@/types/topic";
import { UpdateTopicFormData } from "@/components/admin/questoes/forms/update-topic-form";
import { getSession } from "@/lib/auth";

interface UpdateTopicDTO {
  topicId: number;
  topicData: UpdateTopicFormData;
}

export function useUpdateTopic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ topicId, topicData }: UpdateTopicDTO) => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
          body: JSON.stringify({ title: topicData.title }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const updatedTopicData: Topic = await response.json();
      return updatedTopicData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-topics"] });
    },
  });
}
