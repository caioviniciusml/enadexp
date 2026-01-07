import { QuestionOption } from "@/enums/enums";

interface SelectQuestionOptionProps {
  option: QuestionOption;
  optionText: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function SelectQuestionOption({
  option,
  optionText,
  isSelected,
  onSelect,
}: SelectQuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`p-2 flex gap-2 items-start text-left cursor-pointer ${
        isSelected ? "border border-primary-green bg-offwhite rounded-lg" : ""
      }`}
    >
      <div
        className={`
          p-3 size-2 flex items-center justify-center font-bold text-white text-sm rounded-full ${
            isSelected ? "bg-primary-green" : "bg-black"
          }
        `}
      >
        {option}
      </div>
      <p
        className={`
          ${isSelected ? "text-primary-green font-bold" : ""}
        `}
      >
        {optionText}
      </p>
    </button>
  );
}
