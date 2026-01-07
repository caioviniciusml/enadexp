import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/auth";
import { User } from "@/types/user";
import { LoginFormData } from "@/components/login/login-form";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const userData: User = await response.json();
      return userData;
    },
    onSuccess: async (userData) => {
      await login(userData);

      queryClient.setQueryData(["user", userData.id], userData);
      router.push(`/${userData.role.toLowerCase()}`);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}
