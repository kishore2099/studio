'use server';
/**
 * @fileOverview Summarizes the user's habit progress, highlighting successes and areas for improvement.
 *
 * - summarizeHabitProgress - A function that summarizes habit progress.
 * - SummarizeHabitProgressInput - The input type for the summarizeHabitProgress function.
 * - SummarizeHabitProgressOutput - The return type for the summarizeHabitProgress function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeHabitProgressInputSchema = z.object({
  habitsCompleted: z.number().describe('Number of habits completed.'),
  habitsMissed: z.number().describe('Number of habits missed.'),
  streak: z.number().describe('Current streak of habit completion.'),
  totalHabits: z.number().describe('Total number of habits tracked.'),
});
export type SummarizeHabitProgressInput = z.infer<
  typeof SummarizeHabitProgressInputSchema
>;

const SummarizeHabitProgressOutputSchema = z.object({
  summary: z.string().describe('A personalized summary of habit progress.'),
});
export type SummarizeHabitProgressOutput = z.infer<
  typeof SummarizeHabitProgressOutputSchema
>;

export async function summarizeHabitProgress(
  input: SummarizeHabitProgressInput
): Promise<SummarizeHabitProgressOutput> {
  return summarizeHabitProgressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHabitProgressPrompt',
  input: {
    schema: z.object({
      habitsCompleted: z.number().describe('Number of habits completed.'),
      habitsMissed: z.number().describe('Number of habits missed.'),
      streak: z.number().describe('Current streak of habit completion.'),
      totalHabits: z.number().describe('Total number of habits tracked.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A personalized summary of habit progress.'),
    }),
  },
  prompt: `You are a personal AI habit coach. You will summarize the habit progress of the user, highlighting successes and areas for improvement. Focus on encouragement and motivation.

Here's a summary of the user's habit data:

Habits Completed: {{{habitsCompleted}}}
Habits Missed: {{{habitsMissed}}}
Current Streak: {{{streak}}}
Total Habits Tracked: {{{totalHabits}}}

Provide a personalized summary of their habit progress:
`,
});

const summarizeHabitProgressFlow = ai.defineFlow<
  typeof SummarizeHabitProgressInputSchema,
  typeof SummarizeHabitProgressOutputSchema
>(
  {
    name: 'summarizeHabitProgressFlow',
    inputSchema: SummarizeHabitProgressInputSchema,
    outputSchema: SummarizeHabitProgressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
