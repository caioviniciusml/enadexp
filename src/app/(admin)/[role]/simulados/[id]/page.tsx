import { ExamPresentation } from "@/components/admin/simulados/exam-presentation";
import { getSession } from "@/lib/auth";

export default async function ListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  if (!session) return null;

  return <ExamPresentation userRole={session.userData.role} examId={id} />;
}
