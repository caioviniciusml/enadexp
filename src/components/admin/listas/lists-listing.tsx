"use client";
import { ListCard } from "@/components/admin/listas/list-card";
import { usePathname } from "next/navigation";
import { useAllLists } from "@/hooks/lists/use-all-lists";

export function ListsListing() {
  const pathname = usePathname();
  const { data: listsData } = useAllLists();

  if (!listsData) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listsData.length > 0 ? (
        listsData.map((list) => (
          <ListCard
            key={list.id}
            title={list.title}
            createdAt={list.createdAt}
            questionsCount={list._count.listQuestions}
            redirectTo={`${pathname}/${list.id}`}
          />
        ))
      ) : (
        <span className="text-zinc-600 font-medium">
          Nenhuma Lista Encontrada
        </span>
      )}
    </section>
  );
}
