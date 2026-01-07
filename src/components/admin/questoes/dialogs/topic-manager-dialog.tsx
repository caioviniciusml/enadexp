"use client"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTopicForm } from "@/components/admin/questoes/forms/create-topic-form";
import { TopicsListing } from "@/components/admin/questoes/topics-listing";

export function TopicManagerDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex-1 md:flex-0 cursor-pointer">
          Gerenciar Topicos
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-12 max-w-xl max-h-[90vh] grid gap-8">
        <DialogHeader>
          <DialogTitle className="text-primary-green">
            Gerenciar Tópicos
          </DialogTitle>
        </DialogHeader>
        <CreateTopicForm />
        <TopicsListing />
        <DialogFooter>
          <Button
            className="cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
