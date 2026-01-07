"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";
import { QuestionOptionItem } from "../question-option-item";
import { useState } from "react";
import { UpdateQuestionForm } from "../forms/update-question-form";
import { Difficulty, UserRole } from "@/enums/enums";

const difficulties = new Map([
  [Difficulty.EASY, { text: "Facil", badgeColor: "bg-green-600" }],
  [Difficulty.MEDIUM, { text: "Medio", badgeColor: "bg-yellow-600" }],
  [Difficulty.HARD, { text: "Dificil", badgeColor: "bg-red-600" }],
]);

interface QuestionDialogProps {
  question: Question;
  userRole: UserRole;
}

export function QuestionDialog({ question, userRole }: QuestionDialogProps) {
  const [editingQuestion, setEditingQuestion] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    setEditingQuestion(false);
  }

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
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="p-6 md:p-8 min-h-48 flex flex-col gap-4 justify-between text-sm md:text-base bg-offwhite border cursor-pointer rounded-lg">
          <p className="break-all">
            {getWordingSubstring()}{" "}
            {question.wording.length >= 255 ? "..." : ""}
          </p>
          <div className="flex items-center gap-2">
            <Badge>{question.topic.title || "Sem Topico"}</Badge>
            <Badge className={getBadgeColor()}>{getDifficultyText()}</Badge>
            {question.enadeYear && (
              <Badge className="bg-sky-600">ENADE {question.enadeYear}</Badge>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-4 sm:p-16 max-h-[90svh] w-full max-w-80 sm:max-w-xl lg:max-w-4xl grid gap-4 overflow-y-auto overflow-x-auto">
        <DialogHeader className="flex justify-between">
          {editingQuestion ? (
            <DialogTitle className="text-lg text-primary-green font-bold">
              Editar Questão
            </DialogTitle>
          ) : (
            <div className="w-full flex justify-between">
              <div className="space-y-2">
                <DialogTitle className="text-zinc-500 text-sm">
                  ID: {question.id}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge>{question.topic.title || "Sem Topico"}</Badge>
                  <Badge className={getBadgeColor()}>
                    {getDifficultyText()}
                  </Badge>
                  {question.enadeYear && (
                    <Badge className="bg-sky-600">
                      ENADE {question.enadeYear}
                    </Badge>
                  )}
                </div>
              </div>
              {userRole === UserRole.PROFESSOR && (
                <Button
                  className="cursor-pointer"
                  onClick={() => setEditingQuestion(true)}
                >
                  Editar
                </Button>
              )}
            </div>
          )}
        </DialogHeader>
        {editingQuestion ? (
          <UpdateQuestionForm
            questionData={question}
            onBack={() => setEditingQuestion(false)}
          />
        ) : (
          <div className="grid gap-4">
            <p className="text-justify leading-relaxed font-bold">
              {question.wording}
            </p>
            <div className="grid gap-4">
              <QuestionOptionItem
                option={"A"}
                optionText={question.optionA}
                correctOption={question.correctOption}
              />
              <QuestionOptionItem
                option={"B"}
                optionText={question.optionB}
                correctOption={question.correctOption}
              />
              <QuestionOptionItem
                option={"C"}
                optionText={question.optionC}
                correctOption={question.correctOption}
              />
              <QuestionOptionItem
                option={"D"}
                optionText={question.optionD}
                correctOption={question.correctOption}
              />
              <QuestionOptionItem
                option={"E"}
                optionText={question.optionE}
                correctOption={question.correctOption}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
