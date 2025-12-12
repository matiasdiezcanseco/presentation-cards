"use client";

import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCard } from "~/server/actions/cards";

interface CardItemProps {
  card: {
    id: string;
    title: string;
    updatedAt: Date;
    backgroundColor: string;
  };
}

export function CardItem({ card }: CardItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    if (!confirm("Are you sure you want to delete this project?")) return;

    startTransition(async () => {
      try {
        await deleteCard(card.id);
      } catch (error) {
        console.error("Failed to delete card", error);
      }
    });
  };

  return (
    <Link
      href={`/editor/${card.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div 
        className="aspect-video w-full bg-gray-100 dark:bg-gray-900" 
        style={{ backgroundColor: card.backgroundColor }}
      >
        {/* Preview placeholder */}
        <div className="flex h-full items-center justify-center text-gray-400">
            <span className="text-xs">No preview</span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {card.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Edited {new Date(card.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="absolute right-2 top-2 hidden gap-2 group-hover:flex">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md bg-white/90 p-1.5 text-red-600 shadow-sm hover:bg-red-50 hover:text-red-700 dark:bg-gray-800/90 dark:text-red-400 dark:hover:bg-gray-700"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
}
