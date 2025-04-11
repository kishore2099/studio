'use client';

import {useState, useEffect} from 'react';
import {providePersonalizedTips} from '@/ai/flows/provide-personalized-tips';

export default function AICoaching() {
  const [tip, setTip] = useState('');
  const [encouragement, setEncouragement] = useState('');

  useEffect(() => {
    const fetchTips = async () => {
      const input = {
        habitName: 'Drink Water',
        progressPercentage: 60,
        streakLength: 5,
        challenges: 'Forgetting to drink water during work.',
      };

      try {
        const response = await providePersonalizedTips(input);
        setTip(response.tip);
        setEncouragement(response.encouragement);
      } catch (error) {
        console.error('Error fetching AI tips:', error);
        setTip('Failed to load tip.');
        setEncouragement('Failed to load encouragement.');
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">AI Coaching</h1>

        <p className="mt-3 text-2xl">
          Get personalized tips and encouragement from our AI coach.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Today's Tip</h2>
          <p className="mt-2">{tip}</p>

          <h2 className="text-2xl font-semibold mt-4">Encouragement</h2>
          <p className="mt-2">{encouragement}</p>
        </div>
      </main>
    </div>
  );
}
