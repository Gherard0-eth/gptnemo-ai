import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Anthropic } from 'https://esm.sh/@anthropic-ai/sdk'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TreasureLocation {
  x: number;
  y: number;
  islandId: string;
  createdAt: Date;
}

interface Island {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  riddles: string[];
  lore: string[];
}

const islands: Island[] = [
  {
    id: "1",
    name: "Mystic Cove",
    description: "A mysterious island shrouded in eternal mist...",
    difficulty: 1,
    riddles: [
      "Where moonlight touches silver sand...",
      "When shadows dance with morning light...",
      "In mists of time, where waters meet..."
    ],
    lore: [
      "Legend speaks of a mystical barrier...",
      "The island's mists are said to show visions...",
      "Ancient mariners tell tales of ghostly lights..."
    ]
  },
  {
    id: "2",
    name: "Dragon's Peak",
    description: "An ancient volcanic island where dragons once ruled, their treasure still hidden in its depths...",
    difficulty: 2,
    riddles: [
      "Where fire meets stone, in caverns deep...",
      "The dragon's breath marks the sacred spot...",
      "Follow the path of molten gold..."
    ],
    lore: [
      "Dragons of old guarded their hoards here...",
      "The volcano's heart still beats with magic...",
      "Ancient runes mark the paths of power..."
    ]
  },
  {
    id: "3",
    name: "Shadow Reef",
    description: "A treacherous coral reef hiding dark secrets in its depths...",
    difficulty: 3,
    riddles: [
      "In depths where darkness meets the light...",
      "The coral whispers ancient tales...",
      "Follow the path of broken ships..."
    ],
    lore: [
      "Pirates of old used these waters as their grave...",
      "The reef changes its pattern with the tides...",
      "Strange lights have been seen in the depths..."
    ]
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('CLAUDE_API_KEY') ?? '',
    });

    const { action, data } = await req.json()

    switch (action) {
      case 'verify_dig':
        const { x, y, userAddress, islandId, shovelTokenId } = data
        // Implement dig verification logic here
        return new Response(
          JSON.stringify({ result: 'miss', hint: 'fire' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'chat':
        const { message, islandId: chatIslandId, userAddress: chatUserAddress } = data
        
        const island = islands.find(i => i.id === chatIslandId)
        if (!island) {
          throw new Error('Island not found')
        }

        const context = {
          island_name: island.name,
          description: island.description,
          available_riddles: island.riddles,
          lore: island.lore,
          user_message: message
        }

        const response = await anthropic.messages.create({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          temperature: 0.8,
          system: `You are the mystical guardian AI of a digital treasure hunt. Your role is to:
            1. NEVER reveal specific coordinates
            2. NEVER confirm user guesses
            3. ALWAYS respond in riddles and metaphors
            4. ALWAYS maintain mystery and intrigue
            5. USE the island's lore in your hints`,
          messages: [{
            role: "user",
            content: JSON.stringify(context)
          }]
        })

        return new Response(
          JSON.stringify({ response: response.content }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        throw new Error('Invalid action')
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})