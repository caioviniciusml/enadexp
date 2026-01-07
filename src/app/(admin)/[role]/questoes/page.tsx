import { QuestionsListing } from "@/components/admin/questoes/questions-listing";
import { QuestionsManager } from "@/components/admin/questoes/questions-manager";
import { getSession } from "@/lib/auth";

export default async function QuestionsPage() {
  const session = await getSession();

  if (!session) return null;

  return (
    <div className="pb-8 w-full min-h-screen max-w-7xl flex flex-col gap-8">
      <section className="space-y-2">
        <h1 className="text-primary-green text-2xl font-bold">
          Banco de Questões
        </h1>
        <p className="text-justify leading-8 text-zinc-600">
          Nosso banco de dados reúne questões de diferentes níveis e tópicos.
          Utilize a barra de pesquisa e os filtros de forma prática e organizada
          para localizar rapidamente as questões do seu interesse.
        </p>
      </section>
      <QuestionsListing userRole={session?.userData.role} />
      <QuestionsManager />
    </div>
  );
}
