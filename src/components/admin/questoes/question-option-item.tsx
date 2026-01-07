import { QuestionOption } from "@/enums/enums";

interface QuestionOptionProps {
  option: string;
  optionText: string;
  correctOption: QuestionOption | null;
}

export function QuestionOptionItem({
  option,
  optionText,
  correctOption,
}: QuestionOptionProps) {
  return (
    <div className="flex gap-2">
      <div
        className={`p-3 size-2 flex items-center justify-center font-bold text-white text-sm rounded-full ${
          option === correctOption ? "bg-primary-green" : "bg-black"
        }`}
      >
        {option}
      </div>
      <p
        className={
          option === correctOption ? "text-primary-green font-bold" : ""
        }
      >
        {optionText}
      </p>
    </div>
  );
}
