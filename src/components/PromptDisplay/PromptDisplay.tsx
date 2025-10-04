import React from 'react';
import type { EventData } from '../../types';
import './PromptDisplay.css';

interface PromptDisplayProps {
  eventData: EventData;
  generatedPrompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ eventData, generatedPrompt }) => {
  // Component implementation will be added in later tasks
  return (
    <div className="prompt-display">
      <h2>Generated Prompt</h2>
      <p>Prompt display implementation coming in task 5</p>
    </div>
  );
};

export default PromptDisplay;