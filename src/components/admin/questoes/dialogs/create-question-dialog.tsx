"use client";
import { useState } from "react";
import { FileImage, Keyboard, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadFileForm } from "@/components/admin/questoes/forms/upload-file-form";
import { CreateQuestionForm } from "@/components/admin/questoes/forms/create-question-form";
import { QuestionExtractedData } from "@/types/question-extracted-data";

type Step = "SELECTION" | "MANUAL" | "UPLOAD";

export function CreateQuestionDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("SELECTION");
  const [extractedData, setExtractedData] = useState<QuestionExtractedData | null>(
    null
  );

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setStep("SELECTION");
      setExtractedData(null);
    }
  }

  function onUploadSuccess(data: QuestionExtractedData) {
    setExtractedData(data);
    setStep("MANUAL");
  }

  function onBack(step: Step) {
    setStep(step);
    setExtractedData(null);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex-1 md:flex-0 cursor-pointer">
          <Plus />
          Nova Questão
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-12 max-h-[80svh] w-full max-w-80 sm:max-w-xl lg:max-w-2xl grid gap-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            {step === "SELECTION" && "Escolha uma Opção"}
            {step === "MANUAL" && "Nova Questão"}
            {step === "UPLOAD" && "Enviar Imagem"}
          </DialogTitle>
        </DialogHeader>
        {step === "SELECTION" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="p-8 flex-1 flex flex-col items-center gap-4 text-zinc-500 hover:text-primary-green hover:bg-offwhite border border-current rounded-md cursor-pointer"
              onClick={() => setStep("MANUAL")}
            >
              <Keyboard />
              <p className="font-bold">Manual</p>
              <span className="text-sm text-center">
                Insira manualmente todos os dados da questão
              </span>
            </div>
            <div
              className="p-8 flex-1 flex flex-col items-center gap-4 text-zinc-500 hover:text-primary-green hover:bg-offwhite border border-current rounded-md cursor-pointer"
              onClick={() => setStep("UPLOAD")}
            >
              <FileImage />
              <p className="font-bold">OCR</p>
              <span className="text-sm text-center">
                Envie uma Imagem e apenas revise os dados extraídos da questão
              </span>
            </div>
          </div>
        )}
        {step === "MANUAL" && (
          <CreateQuestionForm
            payload={extractedData || null}
            onBack={() => onBack("SELECTION")}
          />
        )}
        {step === "UPLOAD" && (
          <UploadFileForm
            onSuccess={onUploadSuccess}
            onBack={() => onBack("SELECTION")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
