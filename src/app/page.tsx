import Link from "next/link";
import { getSession } from "~/server/better-auth/server";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-center">
          Presentation <span className="text-indigo-600 dark:text-indigo-400">Cards</span>
        </h1>
        <p className="text-2xl text-center max-w-2xl text-gray-600 dark:text-gray-300">
          Create beautiful, exportable cards for your ideas, code snippets, and social media posts.
        </p>
        
        <div className="flex gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white no-underline transition hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white no-underline transition hover:bg-indigo-700"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-white border border-gray-300 px-8 py-3 font-semibold text-gray-700 no-underline transition hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
