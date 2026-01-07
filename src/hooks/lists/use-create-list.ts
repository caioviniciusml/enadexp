import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/lib/auth";
import { List } from "@/types/list";
import { useRouter } from "next/navigation";

interface CreateListDto {
  title: string;
  questionIds: Array<string>;
}

export function useCreateList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateListDto) => {
      const session = await getSession();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.userData.id || "",
          "user-role": session?.userData.role || "",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const listData: List = await response.json();
      return listData;
    },
    onSuccess: async (listData) => {
      const session = await getSession();
      queryClient.invalidateQueries({ queryKey: ["all-lists"] });
      router.push(
        `/${session?.userData.role.toLowerCase()}/listas/${listData.id}`
      );
    },
  });
}
