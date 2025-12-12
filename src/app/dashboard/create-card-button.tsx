"use client";

import { useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCard } from "~/server/actions/cards";

export function CreateCardButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      try {
        const result = await createCard();
        if (result.success) {
          router.push(`/editor/${result.id}`);
        }
      } catch (error) {
        console.error("Failed to create card", error);
      }
    });
  };

  return (
    <button
      onClick={handleCreate}
      disabled={isPending}
      className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
    >
      <Plus className="h-4 w-4" />
      {isPending ? "Creating..." : "New Project"}
    </button>
  );
}
