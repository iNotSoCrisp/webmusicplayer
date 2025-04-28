# BeatProbe - Music Streaming Application

BeatProbe is a modern music streaming web application built with React and Vite. It features a sleek, responsive design with music playback, search functionality, and custom playlists.

## Features

- **Modern UI**: Sleek and responsive design with a focus on user experience
- **Music Streaming**: Play songs from various sources including Spotify integration
- **Search**: Find your favorite tracks instantly
- **Playlists**: Create and manage your custom playlists
- **Contact**: Reach out and connect via email or social platforms

## Landing Page

The application features a modern landing page inspired by lofi aesthetics:

- **Default Route**: The landing page now appears when you first open the application
- **Features**:
  - Stunning gradient background with parallax effects
  - Bold, engaging typography
  - Animated elements that respond to scrolling
  - "Get Started" button that takes users to the main application
  - Highlights of key features

## App Structure

- **Landing Page**: `/` - The initial page users see when visiting the site
- **Main App**: `/app/*` - The main application with the following routes:
  - **Home**: `/app/home` - Main dashboard
  - **Search**: `/app/search` - Search for music
  - **Stream**: `/app/stream` - Stream music
  - **Contact**: `/app/contact` - Contact information

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open your browser and navigate to `http://localhost:5173`
   - You'll see the landing page by default
   - Click "Get Started" to enter the main application

## Project Structure

- `/src`: Application source code
  - `/components`: Reusable React components
  - `/pages`: Page components
  - `/context`: Context providers
  - `/styles`: CSS stylesheets
  - `/services`: API service functions
  - `/assets`: Static assets
  - `/data`: Mock data and constants

## Adding Background Images

To complete the landing page, add these images to your `/public/assets` directory:

- `lofi-desk-bg.jpg` - Main background image of a cozy desk
- `lamp.png` - Decorative lamp image (with transparency)
- `plant-left.png` - Decorative plant for left side
- `plant-right.png` - Decorative plant for right side
- `window-glow.png` - Subtle window light effect

You can find suitable images from royalty-free sources or create your own.

## License

[MIT License](LICENSE)
