import type { PromptTemplate, PosterStyle, EventData } from '../types';

// Base prompt structure for AI image generation
export const BASE_PROMPT = "Create a professional event poster with the following details:";

// Technical parameters for optimal AI generation
export const TECHNICAL_PARAMS = "high quality, 8k resolution, poster design, professional layout, clear typography, --ar 2:3 --v 6 --style raw";

// Style-specific prompt templates with enhanced contextual descriptions
export const PROMPT_TEMPLATES: Record<PosterStyle, PromptTemplate> = {
  modern: {
    style: 'modern',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'clean contemporary design',
      'minimalist geometric layout',
      'sleek sans-serif typography',
      'neutral color palette with strategic bold accents',
      'plenty of white space',
      'modern grid system',
      'subtle shadows and depth'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  formal: {
    style: 'formal',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'elegant professional design',
      'sophisticated traditional layout',
      'refined serif typography',
      'classic color combinations (navy, burgundy, gold)',
      'balanced symmetrical composition',
      'formal business aesthetic',
      'premium quality appearance'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  playful: {
    style: 'playful',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'vibrant energetic design',
      'creative dynamic layout',
      'fun colorful palette',
      'playful typography with character',
      'asymmetrical creative composition',
      'bright engaging colors',
      'youthful spirited aesthetic'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  minimalist: {
    style: 'minimalist',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'ultra-minimal clean design',
      'simple uncluttered layout',
      'abundant white space',
      'subtle monochromatic colors',
      'focused essential typography',
      'zen-like simplicity',
      'elegant restraint'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  vintage: {
    style: 'vintage',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'retro nostalgic design',
      'vintage classic layout',
      'aged paper textures',
      'antique typography styles',
      'muted earthy color palette',
      'weathered distressed effects',
      'timeless historical aesthetic'
    ],
    technicalParams: TECHNICAL_PARAMS
  },
  bold: {
    style: 'bold',
    basePrompt: BASE_PROMPT,
    styleModifiers: [
      'striking high-impact design',
      'dramatic powerful layout',
      'bold contrasting colors',
      'strong commanding typography',
      'dynamic visual hierarchy',
      'attention-grabbing composition',
      'confident assertive aesthetic'
    ],
    technicalParams: TECHNICAL_PARAMS
  }
};

// Utility function to get template by style
export const getPromptTemplate = (style: PosterStyle): PromptTemplate => {
  return PROMPT_TEMPLATES[style];
};

// Utility function to format event data into prompt text
export const formatEventDetails = (eventData: EventData): string => {
  const details = [];
  
  if (eventData.eventName) {
    details.push(`Event: "${eventData.eventName}"`);
  }
  
  if (eventData.speakerName) {
    details.push(`Speaker: ${eventData.speakerName}`);
  }
  
  if (eventData.eventDateTime) {
    const date = new Date(eventData.eventDateTime);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    details.push(`Date & Time: ${formattedDate} at ${formattedTime}`);
  }
  
  if (eventData.location) {
    details.push(`Location: ${eventData.location}`);
  }
  
  if (eventData.contactInfo) {
    details.push(`Contact: ${eventData.contactInfo}`);
  }
  
  return details.join(', ');
};

// Utility function to generate complete prompt from event data and style
export const generatePrompt = (eventData: EventData): string => {
  const template = getPromptTemplate(eventData.posterStyle);
  const eventDetails = formatEventDetails(eventData);
  const styleKeywords = template.styleModifiers.join(', ');
  const styleGuidance = getStyleGuidance(eventData.posterStyle);
  
  // Build contextual prompt based on style
  let contextualPrompt = template.basePrompt;
  
  // Add event details if available
  if (eventDetails) {
    contextualPrompt += ` ${eventDetails}.`;
  }
  
  // Add style-specific guidance
  contextualPrompt += ` Design should feature: ${styleKeywords}.`;
  
  // Add style guidance for better context
  contextualPrompt += ` ${styleGuidance}.`;
  
  // Add technical parameters
  contextualPrompt += ` ${template.technicalParams}`;
  
  return contextualPrompt;
};

// Utility function to get style-specific design guidance
export const getStyleGuidance = (style: PosterStyle): string => {
  const guidanceMap: Record<PosterStyle, string> = {
    modern: "Focus on clean lines, contemporary typography, and a balanced composition with plenty of white space",
    formal: "Emphasize elegance and professionalism with traditional layouts, serif fonts, and sophisticated color schemes",
    playful: "Use vibrant colors, creative typography, and dynamic layouts that convey energy and fun",
    minimalist: "Keep the design simple and uncluttered, using minimal elements and subtle color palettes",
    vintage: "Incorporate retro design elements, aged textures, and classic typography reminiscent of past eras",
    bold: "Create high visual impact with strong contrasts, dramatic typography, and striking design elements"
  };
  
  return guidanceMap[style];
};

// Utility function to get style-specific color recommendations
export const getStyleColors = (style: PosterStyle): string[] => {
  const colorMap: Record<PosterStyle, string[]> = {
    modern: ["#2C3E50", "#ECF0F1", "#3498DB", "#E74C3C"],
    formal: ["#1A237E", "#8D6E63", "#FFD700", "#FFFFFF"],
    playful: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"],
    minimalist: ["#FFFFFF", "#F8F9FA", "#6C757D", "#212529"],
    vintage: ["#8B4513", "#DEB887", "#CD853F", "#F5DEB3"],
    bold: ["#FF0000", "#000000", "#FFFF00", "#FFFFFF"]
  };
  
  return colorMap[style];
};