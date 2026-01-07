import { TopicManagerDialog } from "@/components/admin/questoes/dialogs/topic-manager-dialog";
import { getSession } from "@/lib/auth";
import { CreateQuestionDialog } from "./dialogs/create-question-dialog";
import { UserRole } from "@/enums/enums";

export async function QuestionsManager() {
  const session = await getSession();

  if (session?.userData.role !== UserRole.PROFESSOR) return null;

  return (
    <section className="p-4 md:p-8 mt-auto bottom-0 md:bottom-8 sticky z-10 w-full max-w-7xl flex justify-end gap-4 bg-primary-green border border-emerald-900 shadow-lg rounded-lg">
      <TopicManagerDialog />
      <CreateQuestionDialog />
    </section>
  );
}
