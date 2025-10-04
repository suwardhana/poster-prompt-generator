# Poster Prompt Generator

A React-based web application that generates AI-optimized prompts for creating stunning event posters. Perfect for generating prompts for AI image generation tools like DALL-E, Midjourney, or Stable Diffusion.

## Features

- **Interactive Form Interface**: Easy-to-use form for entering event details
- **Multiple Design Styles**: Choose from 6 different poster styles:
  - Modern: Clean contemporary design with minimalist aesthetics
  - Formal: Elegant professional layouts with sophisticated typography
  - Playful: Vibrant energetic designs with creative layouts
  - Minimalist: Ultra-clean designs with abundant white space
  - Vintage: Retro nostalgic designs with aged textures
  - Bold: High-impact designs with dramatic contrasts

- **Real-time Prompt Generation**: Instantly generates optimized prompts as you type
- **Glass Morphism UI**: Modern, elegant interface with glass-like components
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy-to-Clipboard**: Easy copying of generated prompts for use in AI tools

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with modern features
- **Package Manager**: Bun
- **Deployment**: GitHub Actions with FTP deployment

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (if not using Bun)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd poster-prompt-generator
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
bun run build
```

The built files will be in the `dist/` directory.

## Usage

1. **Fill in Event Details**:
   - Speaker Name
   - Event Name
   - Date & Time
   - Location
   - Contact Information

2. **Choose a Style**: Select from the available poster styles that best fits your event

3. **Copy the Generated Prompt**: Use the generated prompt in your favorite AI image generation tool

4. **Generate Your Poster**: Paste the prompt into tools like:
   - DALL-E
   - Midjourney
   - Stable Diffusion
   - Adobe Firefly
   - Any other AI image generator

## Project Structure

```
src/
├── components/
│   ├── EventForm/          # Form components for event data input
│   ├── Layout/             # Layout components (GlassContainer)
│   └── PromptDisplay/      # Component for displaying generated prompts
├── hooks/
│   └── usePromptGenerator.ts # Custom hook for prompt generation logic
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── promptTemplates.ts # Prompt templates and generation utilities
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Deployment

The project is configured for automatic deployment using GitHub Actions. On every push to the repository:

1. The project is built using Bun
2. Built files are deployed via FTP to the hosting server
3. The live site is updated automatically

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Development Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## License

This project is private and not licensed for public use.

## Support

For questions or support, please open an issue in the repository.