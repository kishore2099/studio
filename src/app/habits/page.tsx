'use client';

import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {cn} from '@/lib/utils';
import {Progress} from '@/components/ui/progress';

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  completed: boolean;
  points: number;
}

const dummyHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    description: 'Drink 8 glasses of water per day',
    frequency: 'Daily',
    completed: true,
    points: 10,
  },
  {
    id: '2',
    name: 'Exercise',
    description: '30 minutes of exercise',
    frequency: 'Daily',
    completed: false,
    points: 15,
  },
  {
    id: '3',
    name: 'Read',
    description: 'Read for 20 minutes',
    frequency: 'Daily',
    completed: true,
    points: 12,
  },
];

const HabitItem = ({habit}: {habit: Habit}) => {
  const [isCompleted, setIsCompleted] = useState(habit.completed);
  const [progress, setProgress] = useState(75); // Example progress value

  useEffect(() => {
    setIsCompleted(habit.completed);
  }, [habit.completed]);

  const toggleHabitCompletion = () => {
    setIsCompleted(!isCompleted);
    // Here you would typically update the habit completion status in your data store
    // and potentially award points.
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-md shadow-sm bg-card text-card-foreground">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://picsum.photos/50/50" alt={habit.name} />
          <AvatarFallback>{habit.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <p className="text-sm text-muted-foreground">{habit.description}</p>
          <p className="text-xs mt-1">Frequency: {habit.frequency}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Progress value={progress} className="w-24" />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleHabitCompletion}
          className={cn(isCompleted && 'bg-green-500 text-green-50')}
        >
          {isCompleted ? <Icons.check /> : <Icons.plus />}
        </Button>
        <span className="text-sm text-gray-500">+{habit.points}</span>
      </div>
    </div>
  );
};

const HabitList = ({habits}: {habits: Habit[]}) => {
  return (
    <div className="space-y-4">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default function Habits() {
  const [habits, setHabits] = useState(dummyHabits);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Your Habits</h1>
        <p className="mt-3 text-2xl">Manage and track your micro-habits here.</p>

        <div className="mt-10 w-full max-w-3xl">
          <HabitList habits={habits} />
        </div>
      </main>
    </div>
  );
}
