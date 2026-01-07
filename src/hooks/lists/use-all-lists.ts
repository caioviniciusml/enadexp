import { getSession } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export function useAllLists() {
  return useQuery({
    queryKey: ["all-lists"],
    queryFn: async () => {
      const session = await getSession();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.userData.id || "",
          "user-role": session?.userData.role || "",
        },
      });
      const listsData: Array<{
        id: string;
        title: string;
        createdAt: Date;
        _count: {
          listQuestions: number;
        };
      }> = await response.json();
      return listsData;
    },
  });
}
