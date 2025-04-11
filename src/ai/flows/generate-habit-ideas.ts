'use server';
/**
 * @fileOverview Provides habit ideas to the user.
 *
 * - generateHabitIdeas - A function that generates habit ideas.
 * - GenerateHabitIdeasInput - The input type for the generateHabitIdeas function.
 * - GenerateHabitIdeasOutput - The return type for the generateHabitIdeas function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateHabitIdeasInputSchema = z.object({
  interests: z.string().describe('The interests of the user.'),
  currentHabits: z.string().optional().describe('The current habits of the user.'),
});
export type GenerateHabitIdeasInput = z.infer<typeof GenerateHabitIdeasInputSchema>;

const GenerateHabitIdeasOutputSchema = z.object({
  habitIdeas: z.array(z.string()).describe('The habit ideas for the user based on their interests.'),
});
export type GenerateHabitIdeasOutput = z.infer<typeof GenerateHabitIdeasOutputSchema>;

export async function generateHabitIdeas(input: GenerateHabitIdeasInput): Promise<GenerateHabitIdeasOutput> {
  return generateHabitIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHabitIdeasPrompt',
  input: {
    schema: z.object({
      interests: z.string().describe('The interests of the user.'),
      currentHabits: z.string().optional().describe('The current habits of the user.'),
    }),
  },
  output: {
    schema: z.object({
      habitIdeas: z.array(z.string()).describe('The habit ideas for the user based on their interests.'),
    }),
  },
  prompt: `You are an AI habit coach. Generate 5 micro-habit ideas for the user based on their interests. If the user has any current habits, avoid suggesting habits that conflict with those. Make sure the habits can be done in 5 minutes or less.

User Interests: {{{interests}}}
Current Habits: {{{currentHabits}}}`, 
});

const generateHabitIdeasFlow = ai.defineFlow<
  typeof GenerateHabitIdeasInputSchema,
  typeof GenerateHabitIdeasOutputSchema
>({
  name: 'generateHabitIdeasFlow',
  inputSchema: GenerateHabitIdeasInputSchema,
  outputSchema: GenerateHabitIdeasOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
