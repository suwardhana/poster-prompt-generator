// Core types for the Poster Prompt Generator application

export interface EventData {
  speakerName: string;
  eventDateTime: string;
  eventName: string;
  contactInfo: string;
  location: string;
  posterStyle: PosterStyle;
}

export type PosterStyle = 'modern' | 'formal' | 'playful' | 'minimalist' | 'vintage' | 'bold';

export interface PromptTemplate {
  style: PosterStyle;
  basePrompt: string;
  styleModifiers: string[];
  technicalParams: string;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'datetime-local';
  required?: boolean;
  placeholder?: string;
}

export interface PromptGeneratorHookResult {
  generatedPrompt: string;
  isGenerating: boolean;
  error: string | null;
}