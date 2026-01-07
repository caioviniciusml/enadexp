import { QuestionOption } from "@/enums/enums";
import { Question } from "@/types/question";
import { SelectQuestionOption } from "./select-question-option";

interface ExamQuestionItemProps {
  question: Question;
  selectedAnswer?: QuestionOption;
  onSelect: (option: QuestionOption) => void;
}

export function ExamQuestionItem({
  question,
  selectedAnswer,
  onSelect,
}: ExamQuestionItemProps) {
  if (!question) return null;

  return (
    <div className="grid gap-4">
      <p className="text-justify leading-relaxed font-bold">
        {question.wording}
      </p>
      <div className="grid gap-4">
        <SelectQuestionOption
          option={QuestionOption.A}
          optionText={question.optionA}
          isSelected={selectedAnswer === QuestionOption.A}
          onSelect={() => onSelect(QuestionOption.A)}
        />
        <SelectQuestionOption
          option={QuestionOption.B}
          optionText={question.optionB}
          isSelected={selectedAnswer === QuestionOption.B}
          onSelect={() => onSelect(QuestionOption.B)}
        />
        <SelectQuestionOption
          option={QuestionOption.C}
          optionText={question.optionC}
          isSelected={selectedAnswer === QuestionOption.C}
          onSelect={() => onSelect(QuestionOption.C)}
        />
        <SelectQuestionOption
          option={QuestionOption.D}
          optionText={question.optionD}
          isSelected={selectedAnswer === QuestionOption.D}
          onSelect={() => onSelect(QuestionOption.D)}
        />
        <SelectQuestionOption
          option={QuestionOption.E}
          optionText={question.optionE}
          isSelected={selectedAnswer === QuestionOption.E}
          onSelect={() => onSelect(QuestionOption.E)}
        />
      </div>
    </div>
  );
}
