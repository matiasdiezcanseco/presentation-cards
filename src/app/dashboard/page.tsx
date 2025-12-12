import { getUserCards } from "~/server/actions/cards";
import { CreateCardButton } from "./create-card-button";
import { CardItem } from "./card-item";

export default async function DashboardPage() {
  const cards = await getUserCards();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Projects
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your presentation cards and designs.
          </p>
        </div>
        <CreateCardButton />
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No projects found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new presentation card.
          </p>
          <div className="mt-6">
            <CreateCardButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
