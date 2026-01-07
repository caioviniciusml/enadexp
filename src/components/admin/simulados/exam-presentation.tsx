"use client";
import { Button } from "@/components/ui/button";
import { QuestionOption, UserRole } from "@/enums/enums";
import { Spinner } from "@/components/ui/spinner";
import { useExam } from "@/hooks/exams/use-exam";
import { useDeleteExam } from "@/hooks/exams/use-delete-exam";
import { ExamQuestionItem } from "./exam-question-item";
import { ExamAttempt } from "@/types/exam-attempt";
import { useState } from "react";
import { QuestionItem } from "../listas/question-item";
import { useSubmitExamAttempt } from "@/hooks/exams/use-submit-exam-attempt";

interface ListPresentationProps {
  userRole: UserRole;
  examId: string;
}

export function ExamPresentation({ userRole, examId }: ListPresentationProps) {
  const { data: examData, isError } = useExam(examId);
  const { mutateAsync: submitExamAttempt } = useSubmitExamAttempt();
  const { mutateAsync: deleteExam, isPending } = useDeleteExam();
  const [answers, setAnswers] = useState<ExamAttempt["answers"]>([]);

  if (isError || !examData) return null;

  function handleSelect(questionId: string, option: QuestionOption) {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);

      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedAnswer: option } : a
        );
      }

      return [...prev, { questionId, selectedAnswer: option }];
    });
  }

  async function onDelete() {
    await deleteExam(examId);
  }

  async function onSubmit() {
    if (examData)
      await submitExamAttempt({
        examId: examData?.id,
        examAttempt: { answers },
      });
  }

  return (
    <div className="pb-8 w-full min-h-screen max-w-7xl flex flex-col gap-10">
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
        <h1 className="text-primary-green text-2xl font-bold">
          {examData?.title}
        </h1>
        {userRole === UserRole.PROFESSOR && (
          <div className="flex items-center gap-2">
            <Button
              disabled={isPending || examData.id === "f99d49d8-0521-44d9-a854-e1d3616fddf5"}
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
        )}
      </div>
      {examData.questions.map((examQuestion) => {
        const selected = answers.find(
          (a) => a.questionId === examQuestion.question.id
        )?.selectedAnswer;

        if (userRole === UserRole.PROFESSOR) {
          return (
            <QuestionItem
              key={examQuestion.id}
              question={examQuestion.question}
              showAnswers={true}
            />
          );
        }

        return (
          <ExamQuestionItem
            key={examQuestion.id}
            question={examQuestion.question}
            selectedAnswer={selected}
            onSelect={(option) =>
              handleSelect(examQuestion.question.id, option)
            }
          />
        );
      })}
      {userRole !== UserRole.PROFESSOR && (
        <Button
          disabled={answers.length !== examData.questions.length}
          onClick={onSubmit}
        >
          Enviar Respostas
        </Button>
      )}
    </div>
  );
}
