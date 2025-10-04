import React, { useState, useCallback, memo, useMemo } from 'react';
import type { EventData } from '../../types';
import './PromptDisplay.css';

interface PromptDisplayProps {
  eventData: EventData;
  generatedPrompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = memo(({ generatedPrompt }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Memoize prompt analysis for performance
  const promptAnalysis = useMemo(() => {
    if (!generatedPrompt) return { characterCount: 0, sections: 0, keywords: 0 };
    
    const characterCount = generatedPrompt.length;
    
    // Count sections (separated by commas or periods)
    const sections = generatedPrompt.split(/[,.]/g).filter(section => section.trim().length > 0).length;
    
    // Count descriptive keywords (rough estimate based on adjectives and style words)
    const keywords = generatedPrompt.match(/\b(modern|contemporary|clean|elegant|professional|vibrant|playful|creative|minimalist|vintage|bold|geometric|sophisticated|dynamic|colorful)\b/gi)?.length || 0;
    
    return { characterCount, sections, keywords };
  }, [generatedPrompt]);

  const { characterCount, sections, keywords } = promptAnalysis;

  // Copy to clipboard functionality
  const handleCopyToClipboard = useCallback(async () => {
    if (!generatedPrompt) return;

    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopyStatus('success');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = generatedPrompt;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopyStatus('success');
        } else {
          setCopyStatus('error');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
    }

    // Reset status after 2 seconds
    setTimeout(() => setCopyStatus('idle'), 2000);
  }, [generatedPrompt]);

  return (
    <div className="prompt-display">
      <div className="prompt-header">
        <h2>Generated AI Prompt</h2>
        <div className="prompt-stats">
          <span className="stat-item">
            <span className="stat-label">Characters:</span>
            <span className="stat-value">{characterCount}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">Sections:</span>
            <span className="stat-value">{sections}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">Style Keywords:</span>
            <span className="stat-value">{keywords}</span>
          </span>
        </div>
      </div>

      <div className="prompt-content">
        {generatedPrompt ? (
          <>
            <div className="prompt-text-container">
              <pre className="prompt-text">{generatedPrompt}</pre>
            </div>
            
            <div className="prompt-actions">
              <button 
                className={`copy-button ${copyStatus}`}
                onClick={handleCopyToClipboard}
                disabled={copyStatus !== 'idle'}
                aria-label="Copy prompt to clipboard"
              >
                {copyStatus === 'idle' && (
                  <>
                    <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Prompt
                  </>
                )}
                {copyStatus === 'success' && (
                  <>
                    <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Copied!
                  </>
                )}
                {copyStatus === 'error' && (
                  <>
                    <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Failed to Copy
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="prompt-placeholder">
            <div className="placeholder-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <h3>Fill in the event details</h3>
            <p>Your AI-optimized poster prompt will appear here as you complete the form above.</p>
          </div>
        )}
      </div>

      {generatedPrompt && (
        <div className="prompt-footer">
          <p className="prompt-tip">
            <strong>Tip:</strong> Copy this prompt and paste it into your favorite AI image generator 
            (like DALL-E, Midjourney, or Stable Diffusion) for best results.
          </p>
        </div>
      )}
    </div>
  );
});

PromptDisplay.displayName = 'PromptDisplay';

export default PromptDisplay;