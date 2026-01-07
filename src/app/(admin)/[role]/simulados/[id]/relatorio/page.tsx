import { ExamReportClient } from "@/components/admin/simulados/exam-report-client";
import { getSession } from "@/lib/auth";

export default async function ExamReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  if (!session) return null;

  return <ExamReportClient examId={id} userRole={session.userData.role} />;
}
