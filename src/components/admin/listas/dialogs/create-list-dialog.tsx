"use client";
import { useState } from "react";
import { Keyboard, Plus, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateRandomListForm } from "@/components/admin/listas/forms/create-random-list-form";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function CreateListDialog() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  function handleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen);
    if (!isOpen) {
      setMenuOpen(true);
    }
  }

  function onBack() {
    setMenuOpen(true);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit cursor-pointer">
          <Plus />
          Criar Lista
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-12 max-h-[80svh] w-full max-w-80 sm:max-w-xl lg:max-w-2xl grid gap-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            {menuOpen ? "Escolha uma Opção" : "Criar Lista Aleatória"}
          </DialogTitle>
        </DialogHeader>
        {menuOpen ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${pathname}/criar`}
              className="p-8 flex-1 flex flex-col items-center gap-4 text-zinc-500 hover:text-primary-green hover:bg-offwhite border border-current rounded-md cursor-pointer"
            >
              <Keyboard />
              <p className="font-bold">Lista Personalizada</p>
              <span className="text-sm text-center">
                Selecione manualmente cada questão da lista
              </span>
            </Link>
            <div
              className="p-8 flex-1 flex flex-col items-center gap-4 text-zinc-500 hover:text-primary-green hover:bg-offwhite border border-current rounded-md cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Sparkles />
              <p className="font-bold">Lista Aleatória</p>
              <span className="text-sm text-center">
                Gere uma lista aleatória baseada nos parâmetros que você
                escolher
              </span>
            </div>
          </div>
        ) : (
          <CreateRandomListForm onBack={onBack} />
        )}
      </DialogContent>
    </Dialog>
  );
}
