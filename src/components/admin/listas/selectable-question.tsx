import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/enums/enums";
import { Question } from "@/types/question";
import { useState } from "react";

const difficulties = new Map([
  [Difficulty.EASY, { text: "Facil", badgeColor: "bg-green-600" }],
  [Difficulty.MEDIUM, { text: "Medio", badgeColor: "bg-yellow-600" }],
  [Difficulty.HARD, { text: "Dificil", badgeColor: "bg-red-600" }],
]);

interface QuestionDialogProps {
  question: Question;
  onSelect: (questionId: string) => void;
}

export function SelectableQuestion({
  question,
  onSelect,
}: QuestionDialogProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  function getWordingSubstring() {
    return question.wording.substring(0, 255);
  }

  function getBadgeColor() {
    return difficulties.get(question.difficulty)?.badgeColor;
  }

  function getDifficultyText() {
    return difficulties.get(question.difficulty)?.text;
  }

  return (
    <div
      className={`p-6 md:p-8 min-h-48 flex flex-col gap-4 justify-between text-sm md:text-base bg-offwhite border cursor-pointer rounded-lg ${
        isSelected && "border-primary-green border-2"
      }`}
      onClick={() => {
        onSelect(question.id);
        setIsSelected(!isSelected);
      }}
    >
      <p className="break-all">
        {getWordingSubstring()} {question.wording.length >= 255 ? "..." : ""}
      </p>
      <div className="flex items-center gap-2">
        <Badge>{question.topic.title || "Sem Topico"}</Badge>
        <Badge className={getBadgeColor()}>{getDifficultyText()}</Badge>
        {question.enadeYear && (
          <Badge className="bg-sky-600">ENADE {question.enadeYear}</Badge>
        )}
      </div>
    </div>
  );
}
