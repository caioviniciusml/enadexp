import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupFormData } from "@/components/login/signup-form";
import { login } from "@/lib/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            role: data.role,
          }),
        }
      );

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
