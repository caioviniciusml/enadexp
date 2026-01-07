"use client";
import { useState } from "react";
import { Rows2, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionsFilters } from "@/components/admin/questoes/questions-filters";
import { QuestionDialog } from "@/components/admin/questoes/dialogs/question-dialog";
import { useAllQuestions } from "@/hooks/questions/use-all-questions";
import { Difficulty, UserRole } from "@/enums/enums";

interface QuestionsListingProps {
  userRole: UserRole;
}

export function QuestionsListing({ userRole }: QuestionsListingProps) {
  const { data: questions, isPending, isError } = useAllQuestions();
  const [cols, setCols] = useState<1 | 2>(2);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | null>(
    null
  );
  const [topicsFilter, setTopicsFilter] = useState<Array<number>>([]);
  const [enadeFilter, setEnadeFilter] = useState<boolean>(false);

  const filteredQuestions = questions?.filter((question) => {
    if (
      searchTerm &&
      !(
        question.wording
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        question.id.includes(searchTerm)
      )
    )
      return false;

    if (topicsFilter.length >= 1 && !topicsFilter.includes(question.topicId))
      return false;

    if (difficultyFilter && question.difficulty !== difficultyFilter)
      return false;

    if (enadeFilter && !question.enadeYear) return false;

    return true;
  });

  if (isError || !questions) return null;

  return (
    <section className="grid gap-8">
      <QuestionsFilters
        difficultyFilter={difficultyFilter}
        topicsFilter={topicsFilter}
        enadeFilter={enadeFilter}
        setSearchTerm={setSearchTerm}
        setDifficultyFilter={setDifficultyFilter}
        setTopicsFilter={setTopicsFilter}
        setEnadeFilter={setEnadeFilter}
      />
      <div className="flex justify-between">
        <span className="text-center text-sm text-zinc-600 font-medium">
          {filteredQuestions?.length} Questões Encontradas
        </span>
        <div className="hidden md:flex gap-2">
          <Button
            variant="outline"
            data-selected={cols}
            className="data-[selected=1]:bg-primary-green data-[selected=1]:text-white text-green-800 border-green-800 hover:text-green-800 cursor-pointer"
            size="icon-sm"
            onClick={() => setCols(1)}
          >
            <Rows2 />
          </Button>
          <Button
            variant="outline"
            data-selected={cols}
            className="data-[selected=2]:bg-primary-green data-[selected=2]:text-white text-green-800 border-green-800 hover:text-green-800 cursor-pointer"
            size="icon-sm"
            onClick={() => setCols(2)}
          >
            <Grid2X2 />
          </Button>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-4 lg:gap-8 ${
          cols === 1 ? "md:grid-cols-1" : "md:grid-cols-2"
        }`}
      >
        {isPending ? (
          <span className="text-primary-green">Carregando...</span>
        ) : (
          filteredQuestions?.map((question) => (
            <QuestionDialog
              key={question.id}
              question={question}
              userRole={userRole}
            />
          ))
        )}
      </div>
    </section>
  );
}
