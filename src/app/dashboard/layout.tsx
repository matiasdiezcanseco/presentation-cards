import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Settings, LogOut, FileText } from "lucide-react";
import { getSession } from "~/server/better-auth/server";
import { auth } from "~/server/better-auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            <FileText className="h-6 w-6" />
            <span>Cards</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
          >
            <LayoutDashboard className="h-5 w-5" />
            My Projects
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {session.user.name?.charAt(0) || "U"}
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {session.user.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {session.user.email}
                </p>
             </div>
          </div>
          <form className="mt-4">
              <button
                formAction={async () => {
                  "use server";
                  await auth.api.signOut({
                    headers: await headers(),
                  });
                  redirect("/");
                }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900 md:hidden">
            <Link href="/dashboard" className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                Cards
            </Link>
        </header>
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
