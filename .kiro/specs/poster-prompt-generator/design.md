# Design Document

## Overview

The Poster Prompt Generator is a single-page React application built with Vite and TypeScript that transforms event details into AI-optimized image generation prompts. The application features a modern glassmorphism design with a clean two-section layout: a form input area and a live prompt preview area.

## Architecture

### Technology Stack
- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: CSS3 with custom glassmorphism effects
- **State Management**: React useState hooks for form state
- **Development**: ESLint for code quality

### Application Structure
```
src/
├── components/
│   ├── EventForm/
│   │   ├── EventForm.tsx
│   │   ├── EventForm.css
│   │   └── FormField.tsx
│   ├── PromptDisplay/
│   │   ├── PromptDisplay.tsx
│   │   └── PromptDisplay.css
│   └── Layout/
│       ├── GlassContainer.tsx
│       └── GlassContainer.css
├── hooks/
│   └── usePromptGenerator.ts
├── types/
│   └── index.ts
├── utils/
│   └── promptTemplates.ts
├── App.tsx
├── App.css
└── main.tsx
```

## Components and Interfaces

### Core Types
```typescript
interface EventData {
  speakerName: string;
  eventDateTime: string;
  eventName: string;
  contactInfo: string;
  location: string;
  posterStyle: PosterStyle;
}

type PosterStyle = 'modern' | 'formal' | 'playful' | 'minimalist' | 'vintage' | 'bold';

interface PromptTemplate {
  style: PosterStyle;
  basePrompt: string;
  styleModifiers: string[];
  technicalParams: string;
}
```

### EventForm Component
- **Purpose**: Collects user input for event details
- **Props**: `onDataChange: (data: EventData) => void`
- **Features**:
  - Six form fields with appropriate input types
  - Real-time validation and formatting
  - Glassmorphism styling with backdrop blur
  - Responsive grid layout

### PromptDisplay Component
- **Purpose**: Shows generated AI prompt with copy functionality
- **Props**: `eventData: EventData, generatedPrompt: string`
- **Features**:
  - Live preview of generated prompt
  - One-click copy to clipboard
  - Syntax highlighting for prompt structure
  - Character count display

### GlassContainer Component
- **Purpose**: Reusable glassmorphism container
- **Props**: `children: ReactNode, className?: string`
- **Features**:
  - Translucent background with backdrop blur
  - Subtle border and shadow effects
  - Responsive padding and margins

## Data Models

### Form State Management
The application uses a single state object to manage all form data:

```typescript
const [eventData, setEventData] = useState<EventData>({
  speakerName: '',
  eventDateTime: '',
  eventName: '',
  contactInfo: '',
  location: '',
  posterStyle: 'modern'
});
```

### Prompt Generation Logic
The prompt generator uses template-based approach:

1. **Base Template**: Core structure for AI image generation
2. **Style Modifiers**: Specific keywords and descriptors per style
3. **Technical Parameters**: Aspect ratio, quality, and rendering hints
4. **Event Integration**: Seamless incorporation of user-provided details

### Style-Specific Prompt Variations

**Modern Style**:
- Keywords: "clean", "contemporary", "minimalist", "geometric"
- Colors: Neutral palettes, bold accents
- Typography: Sans-serif, clean lines

**Formal Style**:
- Keywords: "elegant", "professional", "sophisticated", "traditional"
- Colors: Classic combinations, muted tones
- Typography: Serif fonts, balanced layouts

**Playful Style**:
- Keywords: "vibrant", "creative", "fun", "dynamic", "colorful"
- Colors: Bright, energetic palettes
- Typography: Creative fonts, asymmetrical layouts

## Error Handling

### Form Validation
- **Required Fields**: Event name and date are mandatory
- **Format Validation**: Date/time format checking
- **Contact Info**: Basic email/phone format validation
- **Real-time Feedback**: Immediate visual indicators for validation errors

### Prompt Generation
- **Fallback Templates**: Default prompts when data is incomplete
- **Error States**: Clear messaging when generation fails
- **Input Sanitization**: Clean user input to prevent prompt injection

## Testing Strategy

### Unit Testing Focus Areas
- Prompt generation logic with different style combinations
- Form validation functions
- Event data transformation utilities
- Copy-to-clipboard functionality

### Integration Testing
- Form submission and prompt update flow
- Style selection and prompt modification
- Responsive design across device sizes

### User Experience Testing
- Glassmorphism effects across different browsers
- Performance with real-time prompt updates
- Accessibility compliance for form interactions

## Visual Design System

### Glassmorphism Implementation
```css
.glass-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Layout Structure
- **Two-row layout**: Form section (60% height) and prompt section (40% height)
- **Responsive breakpoints**: Mobile-first approach with tablet and desktop variants
- **Grid system**: CSS Grid for form layout, Flexbox for component alignment
- **Spacing**: Consistent 8px base unit system

### Color Palette
- **Primary**: Gradient backgrounds with transparency
- **Secondary**: Subtle accent colors for interactive elements
- **Text**: High contrast ratios for accessibility
- **Glass Effects**: Semi-transparent whites and subtle shadows

## Performance Considerations

### Optimization Strategies
- **Debounced Updates**: Prevent excessive prompt regeneration during typing
- **Memoization**: Cache prompt templates and style configurations
- **Lazy Loading**: Code splitting for style-specific prompt logic
- **Bundle Size**: Minimal dependencies, tree-shaking enabled

### Browser Compatibility
- **Modern Browsers**: Full glassmorphism support (Chrome 76+, Firefox 103+, Safari 14+)
- **Fallback Styles**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works without advanced CSS effects