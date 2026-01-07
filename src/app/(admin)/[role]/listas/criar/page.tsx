import { QuestionsListingSelection } from "@/components/admin/listas/questions-listing-selection";
import { getSession } from "@/lib/auth";

export default async function ListPage() {
  const session = await getSession();

  if (!session) return null;

  return (
    <div className="pb-8 w-full min-h-screen max-w-7xl flex flex-col gap-10">
      <QuestionsListingSelection type="LIST" />
    </div>
  );
}
