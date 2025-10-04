import { useState, useEffect, useCallback, useRef } from 'react';
import type { EventData, PromptGeneratorHookResult } from '../types';
import { generatePrompt } from '../utils/promptTemplates';

// Debounce delay in milliseconds
const DEBOUNCE_DELAY = 300;

export const usePromptGenerator = (eventData: EventData): PromptGeneratorHookResult => {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to store the debounce timeout
  const debounceTimeoutRef = useRef<number | null>(null);

  // Memoized prompt generation function
  const generatePromptCallback = useCallback((data: EventData) => {
    try {
      setError(null);
      setIsGenerating(true);
      
      // Generate the prompt using the utility function
      const prompt = generatePrompt(data);
      setGeneratedPrompt(prompt);
      
      setIsGenerating(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate prompt');
      setIsGenerating(false);
    }
  }, []);

  // Debounced effect for real-time updates
  useEffect(() => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced update
    debounceTimeoutRef.current = window.setTimeout(() => {
      generatePromptCallback(eventData);
    }, DEBOUNCE_DELAY);

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [eventData, generatePromptCallback]);

  // Initial prompt generation on mount
  useEffect(() => {
    generatePromptCallback(eventData);
  }, []); // Empty dependency array for initial load only

  return {
    generatedPrompt,
    isGenerating,
    error
  };
};