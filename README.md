# Discord ↔ X Journal System

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

A two-way synchronization system between Discord and X (Twitter) for trading journal accountability, education, and public engagement.

## Features

- **Discord → X**: Automatically post Discord journal entries as tweets
- **X → Discord**: Mirror your original tweets into a Discord channel
- **TypeScript**: Fully typed for reliability and developer experience
- **Open Source**: Built as a portfolio-ready, production-minded project

## Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- Discord Bot Token
- X (Twitter) API credentials with read/write access

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/discord-x-journal.git
cd discord-x-journal

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials
\`\`\`

### Running Locally

\`\`\`bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Project Status

🚧 **Phase 1 Complete**: Project bootstrap and Express health check  
⏳ **Phase 2 In Progress**: Discord bot integration  

## Roadmap

- [ ] Discord → X message sync
- [ ] X → Discord tweet sync (polling-based MVP)
- [ ] Media attachment support
- [ ] Webhook-based X sync
- [ ] Discord slash commands for control

## License

MIT
