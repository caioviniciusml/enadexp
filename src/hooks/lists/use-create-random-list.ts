import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/lib/auth";
import { List } from "@/types/list";
import { useRouter } from "next/navigation";

interface CreateRandomListDto {
  title: string;
  easyQuestions: boolean;
  mediumQuestions: boolean;
  hardQuestions: boolean;
  topics: number[];
  onlyEnade: boolean;
  questionCount: number;
}

export function useCreateRandomList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateRandomListDto) => {
      const session = await getSession();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/random`, {
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
