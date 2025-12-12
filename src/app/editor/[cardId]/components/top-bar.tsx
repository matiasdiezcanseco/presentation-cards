"use client";

import { ArrowLeft, Save, Download } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { updateCard } from "~/server/actions/cards";
import { useEditorStore } from "~/stores/editor-store";

export function TopBar() {
  const { card } = useEditorStore();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(card?.title ?? "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (card && title !== card.title) {
      startTransition(async () => {
        try {
          await updateCard(card.id, { title });
        } catch (error) {
          console.error("Failed to update title", error);
          setTitle(card.title);
        }
      });
    }
  };

  const handleSave = () => {
    // Save functionality will be implemented in Feature 17
    console.log("Save clicked");
  };

  const handleExport = () => {
    // Export functionality will be implemented in Feature 18
    console.log("Export clicked");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTitleBlur();
              }
            }}
            className="rounded border border-indigo-500 bg-transparent px-2 py-1 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded px-2 py-1 text-lg font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            {title}
          </button>
        )}

        {isPending && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Saving...
          </span>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </header>
  );
}
