"use client";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadFile } from "@/hooks/ocr/use-upload-file";
import { QuestionExtractedData } from "@/types/question-extracted-data";
import { Spinner } from "@/components/ui/spinner";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "O Arquivo deve ter menos que 3 MB",
  })
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "O Arquivo deve ser no formato JPG, JPEG ou PNG",
  });

export const UploadFileFormSchema = z.object({
  file: fileSchema,
});

export type UploadFileFormData = z.infer<typeof UploadFileFormSchema>;

interface UploadFileFormProps {
  onSuccess: (data: QuestionExtractedData) => void;
  onBack: () => void;
}

export function UploadFileForm({ onSuccess, onBack }: UploadFileFormProps) {
  const { mutateAsync: uploadFile, isPending } = useUploadFile();
  const form = useForm<UploadFileFormData>({
    resolver: zodResolver(UploadFileFormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  async function onSubmit(data: UploadFileFormData) {
    const questionExtractedData = await uploadFile(data);

    form.reset({ file: undefined });

    if (questionExtractedData) {
      onSuccess(questionExtractedData);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormDescription>
          A Imagem deve conter apenas uma questão
        </FormDescription>
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="flex-1">
              <FormLabel>Arquivos</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...fieldProps}
                />
              </FormControl>
              {value && (
                <span className="text-sm text-muted-foreground mt-2">
                  {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button
            disabled={isPending}
            variant="secondary"
            className="text-white bg-zinc-600 hover:bg-zinc-600 cursor-pointer"
            onClick={onBack}
          >
            Voltar
          </Button>
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? (
              <span className="flex items-center gap-1">
                Extraindo Dados
                <Spinner />
              </span>
            ) : (
              <span className="flex items-center gap-1">
                Enviar
                <Send />
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
