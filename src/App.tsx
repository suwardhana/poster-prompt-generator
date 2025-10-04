import { useState } from 'react'
import type { EventData } from './types'
import EventForm from './components/EventForm/EventForm'
import PromptDisplay from './components/PromptDisplay/PromptDisplay'
import GlassContainer from './components/Layout/GlassContainer'
import { usePromptGenerator } from './hooks/usePromptGenerator'
import './App.css'

function App() {
  const [eventData, setEventData] = useState<EventData>({
    speakerName: '',
    eventDateTime: '',
    eventName: '',
    contactInfo: '',
    location: '',
    posterStyle: 'modern'
  });

  const { generatedPrompt } = usePromptGenerator(eventData);

  const handleDataChange = (data: EventData) => {
    setEventData(data);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Poster Prompt Generator</h1>
        <p>Create AI-optimized prompts for stunning event posters with modern glassmorphism design</p>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <GlassContainer>
            <EventForm onDataChange={handleDataChange} />
          </GlassContainer>
        </section>
        
        <section className="prompt-section">
          <GlassContainer>
            <PromptDisplay eventData={eventData} generatedPrompt={generatedPrompt} />
          </GlassContainer>
        </section>
      </main>
    </div>
  )
}

export default App
