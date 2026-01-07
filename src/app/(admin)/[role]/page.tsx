import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { UserRole } from "@/enums/enums";

export default async function HomePage() {
  const studentForm = "https://forms.gle/u7e4uJodEjKo5pKP6";
  const professorForm = "https://forms.gle/UDV8YRvE8Hqqy1rR7";

  const session = await getSession();

  if (!session) return null;

  const formLink =
    session.userData.role === UserRole.PROFESSOR ? professorForm : studentForm;

  return (
    <div className="py-8 lg:py-20 w-full max-w-4xl flex flex-col items-center gap-8 md:gap-16">
      <section className="space-y-4">
        <h1 className="text-primary-green text-4xl font-bold">Bem Vindo</h1>
        <p className="text-zinc-600 text-lg md:text-justify leading-8">
          Obrigado por participar da fase de testes do ENADExp. Sua colaboração
          será essencial para garantir que esta aplicação satisfaz as
          necessidades dos alunos e professores, no que se refere ao processo de
          preparação para o ENADE. Experimente as funcionalidades da aplicação e
          por fim responda o <b className="text-black">Formulário de Satisfação</b> clicando no
          botão abaixo.
        </p>
      </section>
      <Link className="w-fit" href={formLink}>
        <Button className="cursor-pointer" size="lg">
          Formulário de Satisfação
          <ExternalLink />
        </Button>
      </Link>
    </div>
  );
}
