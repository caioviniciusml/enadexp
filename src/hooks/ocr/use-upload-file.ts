import { useMutation } from "@tanstack/react-query";
import { UploadFileFormData } from "@/components/admin/questoes/forms/upload-file-form";
import { QuestionExtractedData } from "@/types/question-extracted-data";
import { getSession } from "@/lib/auth";

export function useUploadFile() {
  return useMutation({
    mutationFn: async (data: UploadFileFormData) => {
      const session = await getSession();
      const formData = new FormData();

      formData.append("file", data.file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ocr`, {
        method: "POST",
        headers: {
          "user-role": session?.userData.role || "",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const questionExtractedData: QuestionExtractedData =
        await response.json();
      return questionExtractedData;
    },
  });
}
