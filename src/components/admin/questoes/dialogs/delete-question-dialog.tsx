"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteQuestionDialogProps {
  isUsed: boolean;
  deleteFn: () => void;
}

export function DeleteQuestionDialog({
  isUsed,
  deleteFn,
}: DeleteQuestionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          variant={"destructive"}
        >
          <Trash2 />
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-12 max-w-80 md:max-w-96 max-h-[90vh] flex flex-col items-center gap-8">
        <DialogHeader>
          <DialogTitle className="rounded-full bg-red-300 p-4">
            <AlertTriangle className="text-red-800" />
          </DialogTitle>
        </DialogHeader>
        {isUsed ? (
          <div className="grid gap-8">
            <p className="text-center text-md text-zinc-600">
              Essa questão está sendo usada em listas e/ou simulados existentes
              e não pode ser excluída.
            </p>
            <DialogClose className="py-2 bg-primary-green text-sm text-white rounded-md cursor-pointer">
              Entendido
            </DialogClose>
          </div>
        ) : (
          <div className="grid gap-8">
            <p className="text-center text-md text-zinc-600">
              Você tem certeza que deseja excluir esta questão?
            </p>
            <DialogFooter className="flex flex-row gap-4">
              <DialogClose className="flex-1 py-1 px-4 text-sm text-white bg-zinc-600 rounded-md cursor-pointer">
                Cancelar
              </DialogClose>
              <Button
                className="flex-1 cursor-pointer"
                variant="destructive"
                onClick={deleteFn}
              >
                Excluir
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}