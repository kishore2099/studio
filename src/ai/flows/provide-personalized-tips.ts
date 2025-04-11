// src/ai/flows/provide-personalized-tips.ts
'use server';

/**
 * @fileOverview Provides personalized tips and encouragement based on user habit progress.
 *
 * This file defines a Genkit flow that takes user habit progress as input and generates personalized tips and encouragement
 * to help the user stay motivated and overcome challenges.
 *
 * @exports providePersonalizedTips - A function that triggers the flow to provide personalized tips.
 * @exports PersonalizedTipsInput - The input type for the providePersonalizedTips function.
 * @exports PersonalizedTipsOutput - The output type for the providePersonalizedTips function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PersonalizedTipsInputSchema = z.object({
  habitName: z.string().describe('The name of the habit.'),
  progressPercentage: z.number().describe('The percentage of the habit completed.'),
  streakLength: z.number().describe('The current streak length for the habit.'),
  challenges: z.string().describe('Any challenges the user is facing with the habit.'),
});
export type PersonalizedTipsInput = z.infer<typeof PersonalizedTipsInputSchema>;

const PersonalizedTipsOutputSchema = z.object({
  tip: z.string().describe('A personalized tip to help the user with their habit.'),
  encouragement: z.string().describe('A message of encouragement for the user.'),
});
export type PersonalizedTipsOutput = z.infer<typeof PersonalizedTipsOutputSchema>;

export async function providePersonalizedTips(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  return providePersonalizedTipsFlow(input);
}

const providePersonalizedTipsPrompt = ai.definePrompt({
  name: 'providePersonalizedTipsPrompt',
  input: {
    schema: z.object({
      habitName: z.string().describe('The name of the habit.'),
      progressPercentage: z.number().describe('The percentage of the habit completed.'),
      streakLength: z.number().describe('The current streak length for the habit.'),
      challenges: z.string().describe('Any challenges the user is facing with the habit.'),
    }),
  },
  output: {
    schema: z.object({
      tip: z.string().describe('A personalized tip to help the user with their habit.'),
      encouragement: z.string().describe('A message of encouragement for the user.'),
    }),
  },
  prompt: `You are an AI habit coach. Provide a personalized tip and encouragement to the user based on their habit progress.

  Habit: {{habitName}}
  Progress: {{progressPercentage}}%
  Streak Length: {{streakLength}} days
  Challenges: {{challenges}}

  Tip: // A practical and specific tip to help the user improve their habit.
  Encouragement: // A short message to motivate the user and keep them going.
  `,
});

const providePersonalizedTipsFlow = ai.defineFlow<
  typeof PersonalizedTipsInputSchema,
  typeof PersonalizedTipsOutputSchema
>({
  name: 'providePersonalizedTipsFlow',
  inputSchema: PersonalizedTipsInputSchema,
  outputSchema: PersonalizedTipsOutputSchema,
}, async input => {
  const {output} = await providePersonalizedTipsPrompt(input);
  return output!;
});
