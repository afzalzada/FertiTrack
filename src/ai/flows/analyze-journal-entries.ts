'use server';

/**
 * @fileOverview A flow that analyzes journal entries and provides personalized insights and advice.
 *
 * - analyzeJournalEntries - A function that handles the analysis of journal entries.
 * - AnalyzeJournalEntriesInput - The input type for the analyzeJournalEntries function.
 * - AnalyzeJournalEntriesOutput - The return type for the analyzeJournalEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJournalEntriesInputSchema = z.object({
  journalEntries: z
    .string()
    .describe('The journal entries to analyze, as a single string.'),
});
export type AnalyzeJournalEntriesInput = z.infer<typeof AnalyzeJournalEntriesInputSchema>;

const AnalyzeJournalEntriesOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and advice based on the journal entries.'),
});
export type AnalyzeJournalEntriesOutput = z.infer<typeof AnalyzeJournalEntriesOutputSchema>;

export async function analyzeJournalEntries(input: AnalyzeJournalEntriesInput): Promise<AnalyzeJournalEntriesOutput> {
  return analyzeJournalEntriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalEntriesPrompt',
  input: {schema: AnalyzeJournalEntriesInputSchema},
  output: {schema: AnalyzeJournalEntriesOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized insights and advice based on a user's journal entries.

  Analyze the following journal entries and provide helpful and empathetic advice and insights to the user, in markdown format.

  Journal Entries:
  {{journalEntries}}`,
});

const analyzeJournalEntriesFlow = ai.defineFlow(
  {
    name: 'analyzeJournalEntriesFlow',
    inputSchema: AnalyzeJournalEntriesInputSchema,
    outputSchema: AnalyzeJournalEntriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
