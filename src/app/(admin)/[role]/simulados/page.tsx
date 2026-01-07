import { ExamsListing } from "@/components/admin/simulados/exams-listing";
import { NewExamButton } from "@/components/admin/simulados/new-exam-button";
import { UserRole } from "@/enums/enums";
import { getSession } from "@/lib/auth";

export default async function ExamsPage() {
  const session = await getSession();

  if (!session) return null;

  return (
    <div className="pb-8 w-full max-w-7xl flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <h1 className="text-primary-green text-2xl font-bold">Simulados</h1>
        {session.userData.role === UserRole.PROFESSOR && <NewExamButton />}
      </div>
      <ExamsListing userRole={session.userData.role} />
    </div>
  );
}
