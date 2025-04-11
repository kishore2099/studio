'use client';

import {useState, useEffect} from 'react';
import {summarizeHabitProgress} from '@/ai/flows/summarize-habit-progress';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// Define chart configuration.
const chartConfig = {
  habitsCompleted: {
    label: 'Habits Completed',
  },
  habitsMissed: {
    label: 'Habits Missed',
  },
  streak: {
    label: 'Current Streak',
  },
};

// Define dummy data for demonstration.
const dummyProgressData = {
  habitsCompleted: 25,
  habitsMissed: 5,
  streak: 10,
  totalHabits: 30,
};

export default function Statistics() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await summarizeHabitProgress(dummyProgressData);
        setSummary(response.summary);
      } catch (error) {
        console.error('Error fetching habit progress summary:', error);
        setSummary('Failed to load summary.');
      }
    };

    fetchSummary();
  }, []);

  const pieChartData = [
    {name: 'Completed', value: dummyProgressData.habitsCompleted},
    {name: 'Missed', value: dummyProgressData.habitsMissed},
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, #F0F0F0, #FFFFFF)', // Light gray to white gradient
      }}
    >
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Your Statistics</h1>
        <p className="mt-3 text-2xl">View your progress, streaks, and achievements.</p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Habit Progress Summary</h2>
          <p className="mt-2">{summary}</p>
        </div>

        {/* Pie Chart */}
        <div className="mt-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold">Habit Completion Ratio</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip />
              <ChartLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Example Area Chart */}
        <div className="mt-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold">Weekly Completion Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              {week: '1', completed: 10},
              {week: '2', completed: 15},
              {week: '3', completed: 12},
              {week: '4', completed: 18},
            ]}>
              <XAxis dataKey="week" />
              <YAxis />
              <Area type="monotone" dataKey="completed" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
