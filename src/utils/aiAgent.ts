import Anthropic from '@anthropic-ai/sdk';
import { islandData } from '@/data/islandData';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface WinningCell {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

// Store winning cell in memory (this will reset on server restart)
let currentWinningCell: WinningCell | null = null;

export const generateNewWinningCell = (): WinningCell => {
  const islandIds = Object.keys(islandData);
  const randomIslandId = islandIds[Math.floor(Math.random() * islandIds.length)];
  
  const newWinningCell = {
    islandId: randomIslandId,
    coordinates: {
      x: Math.floor(Math.random() * 6), // 6x6 grid
      y: Math.floor(Math.random() * 6),
    },
  };

  currentWinningCell = newWinningCell;
  return newWinningCell;
};

export const getCurrentWinningCell = (): WinningCell | null => {
  return currentWinningCell;
};

export const resetWinningCell = (): WinningCell => {
  return generateNewWinningCell();
};

export const getAIResponse = async (message: string): Promise<string> => {
  // Prepare context about islands and current treasure location
  const islandsContext = Object.entries(islandData)
    .map(([id, data]) => `Island ${id}: ${data.name} - ${data.description}`)
    .join('\n\n');

  const systemPrompt = `You are Captain Nemo, a mysterious AI pirate guide. You have knowledge of these islands:

${islandsContext}

The treasure is currently hidden at coordinates (${currentWinningCell?.coordinates.x}, ${currentWinningCell?.coordinates.y}) on Island ${currentWinningCell?.islandId}.

Important rules:
1. Never directly reveal the exact location of the treasure
2. You can give subtle hints about the island where the treasure is located
3. Be mysterious and use pirate-themed language
4. Keep responses concise and engaging
5. If asked about coordinates or specific locations, deflect with pirate humor`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        { role: 'user', content: systemPrompt },
        { role: 'assistant', content: 'Understood, I will act as Captain Nemo and follow these rules.' },
        { role: 'user', content: message }
      ],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error getting AI response:', error);
    return "Arr! My crystal ball seems to be malfunctioning. Try again later, matey!";
  }
};