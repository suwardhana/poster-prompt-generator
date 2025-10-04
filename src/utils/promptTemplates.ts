import type { PromptTemplate, PosterStyle } from '../types';

// Base prompt structure for AI image generation
export const BASE_PROMPT = "Create a professional event poster with the following details:";

// Technical parameters for optimal AI generation
export const TECHNICAL_PARAMS = "high quality, 8k resolution, poster design, --ar 2:3 --v 6";

// Style-specific prompt templates
export const PROMPT_TEMPLATES: Record<PosterStyle, PromptTemplate> = {
  modern: {
    style: 'modern',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'clean',
      'contemporary',
      'minimalist',
      'geometric',
      'sleek typography',
      'neutral color palette with bold accents'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  formal: {
    style: 'formal',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'elegant',
      'professional',
      'sophisticated',
      'traditional',
      'serif typography',
      'classic color combinations'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  playful: {
    style: 'playful',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'vibrant',
      'creative',
      'fun',
      'dynamic',
      'colorful',
      'energetic design',
      'creative typography'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  minimalist: {
    style: 'minimalist',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'minimal',
      'simple',
      'clean lines',
      'lots of white space',
      'subtle colors',
      'focused typography'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  vintage: {
    style: 'vintage',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'retro',
      'vintage',
      'classic',
      'nostalgic',
      'aged textures',
      'vintage typography',
      'muted color palette'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  bold: {
    style: 'bold',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'bold',
      'striking',
      'high contrast',
      'dramatic',
      'powerful typography',
      'strong visual impact'
    ],
    technicalParams: TECHNICAL_PARAMS
  }
};

// Utility function to get template by style
export const getPromptTemplate = (style: PosterStyle): PromptTemplate => {
  return PROMPT_TEMPLATES[style];
};

// Utility function to generate prompt from event data and style
export const generatePrompt = (style: PosterStyle): string => {
  // Full implementation will be added in task 4
  const template = getPromptTemplate(style);
  return `${template.basePrompt} [Event details will be integrated in task 4]`;
};