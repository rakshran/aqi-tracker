# Historical Air Pollution Trends

An interactive data visualization showing how major cities around the world have battled air pollution and the key interventions that led to significant improvements.

## Features

- 📊 **Interactive temporal charts** showing decades of air quality data
- 🏙️ **8 major cities** with detailed historical data (Los Angeles, Beijing, London, Mexico City, Delhi, Tokyo, Seoul, Pittsburgh)
- 📍 **Key milestone markers** highlighting major policy interventions
- 📈 **Progress metrics** showing improvements over time
- 🎨 **Our World in Data inspired design** - clean, accessible, and data-focused
- 📱 **Fully responsive** - works on all devices

## Cities Covered

### Success Stories
- **Los Angeles, USA** - From severe smog capital to cleaner air through decades of regulation
- **London, UK** - Pioneering clean air legislation after the Great Smog of 1952
- **Beijing, China** - Dramatic improvement through aggressive interventions (2013-present)
- **Mexico City, Mexico** - Innovative programs like Hoy No Circula
- **Tokyo, Japan** - Post-war transformation to one of the cleanest megacities
- **Seoul, South Korea** - Public transport and emission control success
- **Pittsburgh, USA** - Steel city transformation through smoke control

### Current Battle
- **Delhi, India** - Ongoing efforts to combat severe pollution

## Key Interventions Highlighted

Each city's timeline shows major policy milestones:
- Clean air legislation and emission standards
- Vehicle restrictions and public transport improvements
- Industrial regulations and fuel standards
- Urban planning and infrastructure changes

## Technology Stack

Built following modern best practices and accessibility guidelines:

- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with default spacing/shadows
- **Recharts** - Declarative charting library
- **Motion** - Smooth animations (following compositor-only principle)

## Design Principles

Follows strict interface design constraints:
- ✅ Tailwind CSS defaults for spacing, radius, and shadows
- ✅ Accessible component interactions
- ✅ Text balance for headings, text-pretty for paragraphs
- ✅ Tabular numbers for data display
- ✅ Respects `prefers-reduced-motion`
- ✅ Mobile-safe with `h-dvh` and safe-area-inset

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is ready to deploy to any static hosting platform:

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically (configuration included in `vercel.json`)

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Use included `netlify.toml` configuration
4. Deploy automatically

### Other Platforms
Build the project with `npm run build` and deploy the `dist` folder to:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## Data Sources

Historical air quality data compiled from:
- Government environmental agencies
- WHO air quality database
- Academic research papers
- Our World in Data
- City-specific environmental reports

AQI values represent approximate annual averages based on PM2.5 or PM10 measurements.

## Project Structure

```
aqi-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── CitySelector.jsx
│   │   ├── PollutionChart.jsx
│   │   └── InterventionsPanel.jsx
│   ├── data/
│   │   └── citiesData.js    # Historical data and interventions
│   ├── utils/
│   │   └── cn.js            # Class name utility
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
└── package.json            # Dependencies
```

## Contributing

Contributions welcome! Please consider:
- Adding more cities with documented interventions
- Improving data accuracy with cited sources
- Enhancing accessibility features
- Optimizing performance

## License

MIT License - feel free to use this project for educational purposes.

## Inspiration

Design and approach inspired by [Our World in Data](https://ourworldindata.org/), the gold standard for data visualization and storytelling.

---

Built to show that dramatic air quality improvements are possible with sustained commitment and effective policy interventions.
