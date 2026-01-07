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
import { InserListNameForm } from "../forms/insert-list-name-form";

interface InsertListNameDialogProps {
  selectedQuestions: Array<string>;
}

export function InsertListNameDialog({
  selectedQuestions,
}: InsertListNameDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={selectedQuestions.length === 0}
          className="cursor-pointer"
        >
          <Plus />
          Criar Lista
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-12 max-h-[80svh] w-full max-w-80 md:max-w-md grid gap-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            Nome da Lista
          </DialogTitle>
        </DialogHeader>
        <InserListNameForm selectedQuestions={selectedQuestions} />
      </DialogContent>
    </Dialog>
  );
}
