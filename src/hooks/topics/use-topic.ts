import { useQuery } from "@tanstack/react-query";
import type { Topic } from "@/types/topic";

export function useTopic(topicId: number) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${topicId}`
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const topicData: Topic = await response.json();
      return topicData;
    },
  });
}
