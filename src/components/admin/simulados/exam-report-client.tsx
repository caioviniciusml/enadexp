"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Users,
  FileText,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { useExamReport } from "@/hooks/exams/use-exam-report";
import { UserRole } from "@/enums/enums";
import { redirect } from "next/navigation";

type SortField = "name" | "score" | "date";
type SortDirection = "asc" | "desc";

interface ExamReportClientProps {
  examId: string;
  userRole: UserRole;
}

export function ExamReportClient({ examId, userRole }: ExamReportClientProps) {
  const { data: report, isPending } = useExamReport(examId);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const filteredAndSortedAttempts = useMemo(() => {
    if (!report) return [];
    const filtered = report.attempts.filter(
      (attempt) =>
        attempt.student.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        attempt.student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.student.name.localeCompare(b.student.name);
          break;
        case "score":
          comparison = a.correctAnswers - b.correctAnswers;
          break;
        case "date":
          const date1 = new Date(a.submittedAt);
          const date2 = new Date(b.submittedAt)
          comparison = date1.getTime() - date2.getTime();
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [report, searchQuery, sortField, sortDirection]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  }

  if (isPending) {
    return <span className="text-primary-green">Carregando...</span>;
  }

  if (!report) redirect(`/${userRole}/simulados`);

  return (
    <div className="pb-8 w-full min-h-screen max-w-7xl flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-primary-green">
        {report.examTitle}
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between text-primary-green">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Número de Questões
              </p>
              <p className="text-4xl font-bold">{report.totalQuestions}</p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-linear-to-tr from-secondary-yellow to-primary-green text-white">
              <FileText />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-primary-green">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Respostas Submetidas
              </p>
              <p className="text-4xl font-bold">{report.totalAttempts}</p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-linear-to-tr from-secondary-yellow to-primary-green text-white">
              <Users />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-primary-green">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Média de Questões Corretas
              </p>
              <p className="text-4xl font-bold">
                {report.averageCorrectAnswers.toFixed(1)}
                <span className="text-xl">/ {report.totalQuestions}</span>
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-lg bg-linear-to-tr from-secondary-yellow to-primary-green text-white">
              <TrendingUp />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary-green">Respostas Enviadas</h2>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Procurar Estudantes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("name")}
                      className="-ml-3 h-8 font-semibold"
                    >
                      Aluno
                      {sortField === "name" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                      {sortField !== "name" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("score")}
                      className="-ml-3 h-8 font-semibold"
                    >
                      Questões Corretas
                      {sortField === "score" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                      {sortField !== "score" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("date")}
                      className="-ml-3 h-8 font-semibold"
                    >
                      Enviado
                      {sortField === "date" &&
                        (sortDirection === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ))}
                      {sortField !== "date" && (
                        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                      )}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedAttempts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Nenhuma Resposta Submetida
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedAttempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">
                        {attempt.student.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {attempt.student.email}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          {attempt.correctAnswers}/{report.totalQuestions}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          (
                          {(
                            (attempt.correctAnswers / report.totalQuestions) *
                            100
                          ).toFixed(0)}
                          %)
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(attempt.submittedAt).toLocaleString("pt-BR")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
