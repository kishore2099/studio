'use server';

/**
 * @fileOverview Implements a simple AI chatbot.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The chatbot response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {
    schema: z.object({
      message: z.string().describe('The user message.'),
    }),
  },
  output: {
    schema: z.object({
      response: z.string().describe('The chatbot response.'),
    }),
  },
  prompt: `You are an AI habit coach. Respond to the user message appropriately.

User Message: {{{message}}}`,
});

const chatFlow = ai.defineFlow<typeof ChatInputSchema, typeof ChatOutputSchema>(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
