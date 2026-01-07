import { useQuery } from "@tanstack/react-query";
import type { List } from "@/types/list";

export function useList(listId: string) {
  return useQuery({
    queryKey: ["list", listId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lists/${listId}`, 
      );

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }
      
      const listData: List = await response.json();
      return listData;
    },
  });
}
