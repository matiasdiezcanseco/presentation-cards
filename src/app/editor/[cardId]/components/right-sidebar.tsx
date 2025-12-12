"use client";

import { useEditorStore } from "~/stores/editor-store";

export function RightSidebar() {
  const { card, selectedElementIds, elements } = useEditorStore();

  const selectedElements = elements.filter((el) =>
    selectedElementIds.includes(el.id)
  );

  return (
    <aside className="flex w-64 flex-col border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Properties
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {selectedElements.length === 0 ? (
          <div className="space-y-4">
            {/* Card properties when nothing is selected */}
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Canvas
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Width
                  </label>
                  <input
                    type="number"
                    value={card?.width ?? 1200}
                    readOnly
                    className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Height
                  </label>
                  <input
                    type="number"
                    value={card?.height ?? 630}
                    readOnly
                    className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={card?.backgroundColor ?? "#ffffff"}
                      readOnly
                      className="h-8 w-8 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                    />
                    <input
                      type="text"
                      value={card?.backgroundColor ?? "#ffffff"}
                      readOnly
                      className="flex-1 rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedElements.length === 1 ? (
          <div className="space-y-4">
            {/* Single element properties */}
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Element
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Type
                  </label>
                  <p className="text-sm capitalize text-gray-900 dark:text-white">
                    {selectedElements[0]?.type}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                      X
                    </label>
                    <input
                      type="number"
                      value={selectedElements[0]?.x ?? 0}
                      readOnly
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                      Y
                    </label>
                    <input
                      type="number"
                      value={selectedElements[0]?.y ?? 0}
                      readOnly
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                      Width
                    </label>
                    <input
                      type="number"
                      value={selectedElements[0]?.width ?? 0}
                      readOnly
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                      Height
                    </label>
                    <input
                      type="number"
                      value={selectedElements[0]?.height ?? 0}
                      readOnly
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {selectedElements.length} elements selected
          </div>
        )}
      </div>
    </aside>
  );
}
