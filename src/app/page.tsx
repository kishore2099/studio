'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-teal-500" href="https://habitquest.ai">
            HabitQuest AI!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Start building and tracking your micro-habits today!
        </p>

        <div className="mt-10">
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
      </main>
    </div>
  );
}
