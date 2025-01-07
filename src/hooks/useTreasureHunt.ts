import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserStore } from '@/stores/useUserStore';
import { usePrizePoolStore } from '@/stores/usePrizePoolStore';
import { useDashboardStore } from '@/stores/useDashboardStore';

export const useTreasureHunt = () => {
  const [isDigging, setIsDigging] = useState(false);
  const { toast } = useToast();
  const { username } = useUserStore();
  const { addAmount } = usePrizePoolStore();
  const { addInflow } = useDashboardStore();

  const verifyDig = async (
    x: number, 
    y: number, 
    islandId: string, 
    shovelTokenId: number,
    userAddress: string
  ) => {
    setIsDigging(true);
    try {
      const { data, error } = await supabase.functions.invoke('tee-agent', {
        body: {
          action: 'dig',
          x,
          y,
          island_id: islandId,
          shovel_token_id: shovelTokenId,
          user_address: userAddress
        }
      });

      if (error) throw error;

      if (data.result === 'hit') {
        // Handle treasure found!
        const treasureAmount = 0.1; // Example amount
        addAmount(treasureAmount);
        addInflow(treasureAmount, islandId);
        
        toast({
          title: "🎉 Treasure Found!",
          description: "You've discovered the treasure! The reward has been added to the prize pool.",
        });
        
        return {
          success: true,
          found: true,
          signature: data.signature
        };
      } else if (data.result === 'miss') {
        toast({
          title: "Keep Digging!",
          description: data.hint === 'fire' ? "You're getting warmer! 🔥" : "Nothing here... yet!",
        });
        
        return {
          success: true,
          found: false,
          hint: data.hint
        };
      }

      return { success: false, error: 'Unknown response from server' };
    } catch (err) {
      console.error('Dig verification error:', err);
      toast({
        title: "Error",
        description: "Failed to verify dig attempt. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: err.message };
    } finally {
      setIsDigging(false);
    }
  };

  const generateNewTreasure = async (islandId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('tee-agent', {
        body: {
          action: 'generate',
          island_id: islandId
        }
      });

      if (error) throw error;

      toast({
        title: "New Treasure Generated",
        description: "A new treasure has been hidden on the island!",
      });

      return true;
    } catch (err) {
      console.error('Error generating new treasure:', err);
      toast({
        title: "Error",
        description: "Failed to generate new treasure location.",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendChatMessage = async (message: string, islandId: string, userAddress: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('tee-agent', {
        body: {
          action: 'chat',
          message,
          island_id: islandId,
          user_address: userAddress
        }
      });

      if (error) throw error;

      return {
        success: true,
        response: data.response
      };
    } catch (err) {
      console.error('Chat error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  };

  return {
    verifyDig,
    generateNewTreasure,
    sendChatMessage,
    isDigging
  };
};