import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
}
