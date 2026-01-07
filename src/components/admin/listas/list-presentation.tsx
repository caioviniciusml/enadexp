"use client";
import { useList } from "@/hooks/lists/use-list";
import { QuestionItem } from "./question-item";
import { Button } from "@/components/ui/button";
import { useDeleteList } from "@/hooks/lists/use-delete-list";
import { useRouter } from "next/navigation";
import { UserRole } from "@/enums/enums";
import { Spinner } from "@/components/ui/spinner";

interface ListPresentationProps {
  userRole: UserRole;
  listId: string;
}

export function ListPresentation({ userRole, listId }: ListPresentationProps) {
  const router = useRouter();
  const { data: listData, isError } = useList(listId);
  const { mutateAsync: deleteList, isPending } = useDeleteList();

  if (isError || !listData) return null;

  async function onDelete() {
    const responseStatus = await deleteList(listId);

    if (responseStatus === 204)
      router.push(`/${userRole.toLocaleLowerCase()}/listas`);
  }

  return (
    <div className="pb-8 w-full min-h-screen max-w-7xl flex flex-col gap-10">
      <div className="w-full flex justify-between">
        <h1 className="text-primary-green text-2xl font-bold">
          {listData?.title}
        </h1>
        <Button
          disabled={isPending}
          className="cursor-pointer"
          variant="destructive"
          onClick={onDelete}
        >
          {isPending ? (
            <span className="flex items-center gap-1">
              Deletando
              <Spinner />
            </span>
          ) : (
            <span className="flex items-center gap-1">Deletar</span>
          )}
        </Button>
      </div>
      {listData?.listQuestions.map((listQuestion) => (
        <QuestionItem
          key={listQuestion.question.id}
          question={listQuestion.question}
          showAnswers={false}
        />
      ))}
      <div className="flex flex-col gap-2">
        <span className="text-primary-green font-bold">GABARITO</span>
        {listData?.listQuestions.map((listQuestion, index) => (
          <span className="font-bold" key={listQuestion.question.id}>
            {index + 1} - {listQuestion.question.correctOption}
          </span>
        ))}
      </div>
    </div>
  );
}
