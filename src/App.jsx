import { useEffect, useRef, useState } from 'react';
import { citiesData } from './data/citiesData';
import CitySelector from './components/CitySelector';
import PollutionChart from './components/PollutionChart';
import InterventionsPanel from './components/InterventionsPanel';

function App() {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [selectedInterventionSource, setSelectedInterventionSource] = useState(null);
  const [isSelectionFading, setIsSelectionFading] = useState(false);
  const [showInterventions, setShowInterventions] = useState(false);
  const interventionTimeoutRef = useRef(null);
  const interventionFadeTimeoutRef = useRef(null);

  const clearInterventionTimeouts = () => {
    if (interventionTimeoutRef.current) {
      clearTimeout(interventionTimeoutRef.current);
      interventionTimeoutRef.current = null;
    }
    if (interventionFadeTimeoutRef.current) {
      clearTimeout(interventionFadeTimeoutRef.current);
      interventionFadeTimeoutRef.current = null;
    }
  };

  const clearInterventionSelection = () => {
    setSelectedIntervention(null);
    setSelectedInterventionSource(null);
    setIsSelectionFading(false);
  };

  const startInterventionTimeout = () => {
    clearInterventionTimeouts();
    setIsSelectionFading(false);
    interventionTimeoutRef.current = setTimeout(() => {
      setIsSelectionFading(true);
      interventionFadeTimeoutRef.current = setTimeout(() => {
        clearInterventionSelection();
      }, 700);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearInterventionTimeouts();
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (showInterventions && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showInterventions]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    clearInterventionTimeouts();
    clearInterventionSelection();
  };

  const handleInterventionClick = (intervention) => {
    setSelectedIntervention(intervention);
    setSelectedInterventionSource('graph');
    setIsSelectionFading(false);
    startInterventionTimeout();
    setShowInterventions(true);
    setTimeout(() => {
      const panel = document.getElementById('interventions-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleInterventionPanelSelect = (intervention) => {
    clearInterventionTimeouts();
    setIsSelectionFading(false);
    setSelectedIntervention(intervention);
    setSelectedInterventionSource('panel');
  };

  return (
    <div className="h-screen flex flex-col bg-canvas overflow-hidden">
      {/* Masthead */}
      <header className="border-b border-ink px-4 md:px-8 py-4 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-editorial text-ink">
            AQI Trends in
          </h1>
          <CitySelector
            cities={citiesData}
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
            ariaLabel="Select city for air quality trend chart"
            className="w-auto min-w-[180px] md:min-w-[280px] max-w-full px-0 text-2xl md:text-3xl font-bold tracking-editorial"
          />
        </div>
      </header>

      {/* Main Content: Editorial Grid */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Column: Chart */}
        <div className="flex-1 md:w-3/4 flex flex-col overflow-hidden md:border-r border-ink/10">
          {/* Chart */}
          {selectedCity && (
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-8 md:pb-10">
              <PollutionChart
                city={selectedCity}
                onInterventionClick={handleInterventionClick}
              />
              {/* Mobile-only trigger to open interventions drawer */}
              <button
                onClick={() => setShowInterventions(true)}
                className="md:hidden mt-6 font-sans text-xs uppercase tracking-widest text-ink/60 hover:text-ink border-b border-ink/30 hover:border-ink pb-0.5 transition-colors"
              >
                View Key Interventions &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Interventions */}
        {selectedCity && (
          <>
            {/* Mobile Backdrop */}
            <div
              className={`
                md:hidden fixed inset-0 z-40 bg-black/50
                transition-opacity duration-300
                ${showInterventions ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
              onClick={() => setShowInterventions(false)}
              aria-hidden="true"
            />

            {/* Interventions Panel / Drawer */}
            <div
              className={`
                fixed md:relative inset-y-0 right-0 z-50 md:z-auto
                w-[85vw] md:w-1/4
                bg-canvas
                transform transition-transform duration-300 ease-out
                md:transform-none
                flex flex-col overflow-hidden
                shadow-lg md:shadow-none
                ${showInterventions ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
              `}
            >
              {/* Close button — mobile only */}
              <button
                onClick={() => setShowInterventions(false)}
                className="md:hidden absolute top-3 right-3 z-10 p-2 text-ink/60 hover:text-ink transition-colors"
                aria-label="Close interventions panel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
                <InterventionsPanel
                  interventions={selectedCity.interventions}
                  selectedIntervention={selectedIntervention}
                  shouldHighlightSelection={selectedInterventionSource === 'graph'}
                  isSelectionFading={isSelectionFading}
                  onSelectIntervention={handleInterventionPanelSelect}
                />
              </div>
            </div>
          </>
        )}
      </main>

    </div>
  );
}

export default App;
