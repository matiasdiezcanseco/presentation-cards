"use client";

import { Trash2, MoreVertical, Pencil, X, Check } from "lucide-react";
import Link from "next/link";
import { useState, useTransition, useRef, useEffect } from "react";
import { deleteCard, updateCard } from "~/server/actions/cards";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when renaming starts
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    if (!confirm("Are you sure you want to delete this project?")) return;

    startTransition(async () => {
      try {
        await deleteCard(card.id);
      } catch (error) {
        console.error("Failed to delete card", error);
      }
    });
  };

  const handleRenameStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setNewTitle(card.title);
    setIsRenaming(true);
  };

  const handleRenameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!newTitle.trim() || newTitle === card.title) {
      setIsRenaming(false);
      return;
    }

    startTransition(async () => {
      try {
        await updateCard(card.id, { title: newTitle.trim() });
        setIsRenaming(false);
      } catch (error) {
        console.error("Failed to rename card", error);
      }
    });
  };

  const handleRenameCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRenaming(false);
    setNewTitle(card.title);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
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
        {isRenaming ? (
          <form
            onSubmit={handleRenameSubmit}
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 rounded border border-indigo-500 bg-white px-2 py-1 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending}
              className="rounded p-1 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-700"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleRenameCancel}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <h3 className="truncate font-semibold text-gray-900 dark:text-white">
            {card.title}
          </h3>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Edited {new Date(card.updatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className="absolute right-2 top-2 hidden group-hover:block"
      >
        <button
          onClick={handleMenuToggle}
          disabled={isPending}
          className="rounded-md bg-white/90 p-1.5 text-gray-600 shadow-sm hover:bg-gray-100 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <button
              onClick={handleRenameStart}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Pencil className="h-4 w-4" />
              Rename
            </button>
            <button
              onClick={handleDelete}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
