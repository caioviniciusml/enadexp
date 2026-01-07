import { CreateListDialog } from "@/components/admin/listas/dialogs/create-list-dialog";
import { ListsListing } from "@/components/admin/listas/lists-listing";
import { getSession } from "@/lib/auth";

export default async function ListPage() {
  const session = await getSession();

  if (!session) return null;

  return (
    <div className="pb-8 w-full max-w-7xl flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <h1 className="text-primary-green text-2xl font-bold">Minhas Listas</h1>
        <CreateListDialog />
      </div>
      <ListsListing />
    </div>
  );
}
