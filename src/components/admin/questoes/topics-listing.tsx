"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateTopicForm } from "@/components/admin/questoes/forms/update-topic-form";
import { DeleteTopicDialog } from "@/components/admin/questoes/dialogs/delete-topic-dialog";
import { useAllTopics } from "@/hooks/topics/use-all-topics";
import { useDeleteTopic } from "@/hooks/topics/use-delete-topic";
import type { Topic } from "@/types/topic";

export function TopicsListing() {
  const { data: topics} = useAllTopics();
  const { mutateAsync: deleteTopic } = useDeleteTopic();
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  async function onDeleteTopic(topicId: number) {
    await deleteTopic(topicId);
  }

  return (
    <section className="space-y-4">
      <h3 className="text-primary-green font-medium">
        Tópicos ({topics?.length})
      </h3>
      {topics && topics.length === 0 ? (
        <span className="text-sm text-zinc-600">Nenhum Tópico Encontrado</span>
      ) : (
        <div className="grid gap-4 max-h-80 overflow-y-auto">
          {topics?.map((topic) => (
            <div
              key={topic.id}
              className="p-3 flex items-center gap-2 bg-offwhite rounded-lg border"
            >
              {editingTopic?.id === topic.id ? (
                <div className="w-full flex gap-2">
                  <UpdateTopicForm
                    topic={topic}
                    setEditingTopic={setEditingTopic}
                  />
                  <Button
                    className="hover:bg-zinc-600 hover:text-white"
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTopic(null)}
                  >
                    <X />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex items-center gap-2">
                  <span className="font-medium text-sm">{topic.title}</span>
                  <div className="ml-auto flex gap-1">
                    <Button
                      className="hover:bg-primary-green hover:text-white"
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTopic(topic)}
                    >
                      <Pencil />
                    </Button>
                    <DeleteTopicDialog
                      topicId={topic.id}
                      deleteFn={() => onDeleteTopic(topic.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
