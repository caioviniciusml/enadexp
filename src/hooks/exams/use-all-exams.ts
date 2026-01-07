import { getSession } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export function useAllExams() {
  return useQuery({
    queryKey: ["all-exams"],
    queryFn: async () => {
      const session = await getSession();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.userData.id || "",
          "user-role": session?.userData.role || "",
        },
      });
      const examsData: Array<{
        id: string;
        title: string;
        isPublic: boolean;
        openingDate: Date;
        closingDate: Date;
        createdBy: {
          name: string;
        };
        _count: {
          questions: number;
          attempts: number;
        };
        hasAttempted: boolean;
      }> = await response.json();
      return examsData;
    },
  });
}
