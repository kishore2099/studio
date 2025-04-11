'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {summarizeHabitProgress} from '@/ai/flows/summarize-habit-progress';

export default function Dashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      const input = {
        habitsCompleted: 25,
        habitsMissed: 5,
        streak: 10,
        totalHabits: 30,
      };

      try {
        const response = await summarizeHabitProgress(input);
        setSummary(response.summary);
      } catch (error) {
        console.error('Error fetching habit progress summary:', error);
        setSummary('Failed to load summary.');
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to your HabitQuest AI Dashboard!</h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Habit Progress</CardTitle>
              <CardDescription>{summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={75} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-4">
          <Button onClick={() => router.push('/habits')}>View Habits</Button>
          <Button onClick={() => router.push('/ai-coaching')}>AI Coaching</Button>
          <Button onClick={() => router.push('/statistics')}>Statistics</Button>
        </div>
      </main>
    </div>
  );
}
