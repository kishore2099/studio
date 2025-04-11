'use client';

export default function Habits() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">
          Your Habits
        </h1>

        <p className="mt-3 text-2xl">
          Manage and track your micro-habits here.
        </p>
      </main>
    </div>
  );
}
