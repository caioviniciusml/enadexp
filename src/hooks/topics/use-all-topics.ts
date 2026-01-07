import { useQuery } from "@tanstack/react-query";
import type { Topic } from "@/types/topic";

export function useAllTopics() {
  return useQuery({
    queryKey: ["all-topics"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
      const topicsData: Array<Topic> = await response.json();
      return topicsData;
    },
  });
}
