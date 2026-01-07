import { ListPresentation } from "@/components/admin/listas/list-presentation";
import { getSession } from "@/lib/auth";

export default async function ListPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  if (!session) return null;

  return <ListPresentation userRole={session.userData.role} listId={id} />;
}
