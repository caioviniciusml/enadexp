import { Badge } from "@/components/ui/badge";
import { Difficulty } from "@/enums/enums";
import { QuestionOptionItem } from "@/components/admin/questoes/question-option-item";
import { Question } from "@/types/question";

const difficulties = new Map([
  [Difficulty.EASY, { text: "Facil", badgeColor: "bg-green-600" }],
  [Difficulty.MEDIUM, { text: "Medio", badgeColor: "bg-yellow-600" }],
  [Difficulty.HARD, { text: "Dificil", badgeColor: "bg-red-600" }],
]);

interface QuestionDialogProps {
  question: Question;
  showAnswers: boolean
}

export function QuestionItem({ question, showAnswers }: QuestionDialogProps) {
  if (!question) return null;

  function getBadgeColor() {
    if (question) return difficulties.get(question?.difficulty)?.badgeColor;
  }

  function getDifficultyText() {
    if (question) return difficulties.get(question.difficulty)?.text;
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge>{question.topic.title || "Sem Topico"}</Badge>
        <Badge className={getBadgeColor()}>{getDifficultyText()}</Badge>
        {question.enadeYear && (
          <Badge className="bg-sky-600">ENADE {question.enadeYear}</Badge>
        )}
      </div>
      <div className="grid gap-4">
        <p className="text-justify leading-relaxed font-bold">
          {question.wording}
        </p>
        <div className="grid gap-4">
          <QuestionOptionItem
            option={"A"}
            optionText={question.optionA}
            correctOption={showAnswers ? question.correctOption : null}
          />
          <QuestionOptionItem
            option={"B"}
            optionText={question.optionB}
            correctOption={showAnswers ? question.correctOption : null}
          />
          <QuestionOptionItem
            option={"C"}
            optionText={question.optionC}
            correctOption={showAnswers ? question.correctOption : null}
          />
          <QuestionOptionItem
            option={"D"}
            optionText={question.optionD}
            correctOption={showAnswers ? question.correctOption : null}
          />
          <QuestionOptionItem
            option={"E"}
            optionText={question.optionE}
            correctOption={showAnswers ? question.correctOption : null}
          />
        </div>
      </div>
    </div>
  );
}
