"use client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateExamForm } from "../forms/create-exam-form";

interface CreateExamDialogProps {
  selectedQuestions: Array<string>;
}

export function CreateExamDialog({ selectedQuestions }: CreateExamDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedQuestions.length === 0} className="cursor-pointer">
          <Plus />
          Novo Simulado
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-12 max-h-[80svh] w-full max-w-80 md:max-w-md grid gap-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            Novo Simulado
          </DialogTitle>
        </DialogHeader>
        <CreateExamForm selectedQuestions={selectedQuestions} />
      </DialogContent>
    </Dialog>
  );
}
