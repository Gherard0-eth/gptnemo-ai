import { Anthropic } from '@anthropic-ai/sdk';
import { islandData } from '@/data/islandData';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: localStorage.getItem('CLAUDE_API_KEY') || '',
});

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

class AIAgent {
  private currentTreasure: TreasureLocation | null = null;
  private readonly GRID_SIZE = 6;

  constructor() {
    this.generateNewTreasureLocation();
  }

  private generateNewTreasureLocation(): void {
    const islands = Object.keys(islandData);
    const randomIsland = islands[Math.floor(Math.random() * islands.length)];
    const x = Math.floor(Math.random() * this.GRID_SIZE);
    const y = Math.floor(Math.random() * this.GRID_SIZE);

    this.currentTreasure = {
      islandId: randomIsland,
      coordinates: { x, y }
    };
  }

  public getTreasureLocation(): TreasureLocation | null {
    return this.currentTreasure;
  }

  public resetTreasureLocation(): void {
    this.generateNewTreasureLocation();
  }

  private getIslandContext(): string {
    const context = Object.entries(islandData)
      .map(([id, island]) => `
        Island ${id}: ${island.name}
        Description: ${island.description}
        Climate: ${island.climate}
        Terrain: ${island.terrain}
        Danger Level: ${island.dangerLevel}
      `).join('\n');
    return context;
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const systemContext = this.getIslandContext();
      const treasureHint = this.currentTreasure 
        ? `The treasure is currently on Island ${this.currentTreasure.islandId}.` 
        : 'No treasure has been placed yet.';

      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are Gaptain Nemo, a pirate AI guide. Here's the context about our islands:\n${systemContext}\n${treasureHint}\n\nRespond to this user message in a pirate style, providing hints about the islands but never directly revealing the treasure's exact location: ${userMessage}`
          }
        ],
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Arr! Seems like my compass be broken. Try again later, matey!";
    }
  }
}

export const aiAgent = new AIAgent();