import { useEffect, useRef, useState } from 'react';
import { citiesData } from './data/citiesData';
import CitySelector from './components/CitySelector';
import PollutionChart from './components/PollutionChart';
import InterventionsPanel from './components/InterventionsPanel';
import AboutSelectionModal from './components/AboutSelectionModal';

function App() {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [selectedInterventionSource, setSelectedInterventionSource] = useState(null);
  const [isSelectionFading, setIsSelectionFading] = useState(false);
  const [showInterventions, setShowInterventions] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-editorial text-ink">
              Historical Air Pollution Trends
            </h1>
            <p className="font-sans text-xs uppercase tracking-widest text-ink/50 mt-1">
              A visual investigation into urban air quality
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAboutModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs uppercase tracking-widest text-ink/60 hover:text-ink border-b border-transparent hover:border-ink transition-colors"
              aria-label="About city selection"
            >
              About
            </button>
            {/* Mobile Interventions Toggle */}
            <button
              onClick={() => setShowInterventions(!showInterventions)}
              className="lg:hidden p-2 hover:bg-ink/5 transition-colors"
              aria-label="Toggle interventions panel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showInterventions ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Editorial Grid */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Column: City Selector + Chart */}
        <div className="flex-1 lg:w-3/4 flex flex-col overflow-hidden lg:border-r border-ink/10">
          {/* City Selector Row */}
          <div className="px-4 md:px-8 py-4 border-b border-grid overflow-y-auto flex-shrink-0">
            <label className="font-sans text-xs uppercase tracking-widest text-ink/50 mb-2 block">
              Select City
            </label>
            <CitySelector
              cities={citiesData}
              selectedCity={selectedCity}
              onSelectCity={handleCitySelect}
            />
            {/* Selection Bias Notice */}
            <div className="mt-3 py-2 border-t border-grid text-xs font-sans">
              <p className="text-ink/50 leading-relaxed">
                <span className="font-semibold text-ink/70">Dataset Limitation:</span>{' '}
                These cities were selected for data availability and documented improvements. This creates selection bias.{' '}
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="text-ink underline hover:text-ink/70 transition-colors"
                >
                  Learn more
                </button>
              </p>
            </div>
          </div>

          {/* Chart */}
          {selectedCity && (
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4">
              <PollutionChart
                city={selectedCity}
                onInterventionClick={handleInterventionClick}
              />
            </div>
          )}
        </div>

        {/* Right Column: Interventions */}
        {selectedCity && (
          <>
            {/* Mobile Overlay */}
            {showInterventions && (
              <div
                className="lg:hidden fixed inset-0 bg-ink/30 z-40"
                onClick={() => setShowInterventions(false)}
              />
            )}

            {/* Interventions Panel */}
            <div
              className={`
                fixed lg:relative inset-y-0 right-0 z-50 lg:z-auto
                w-80 lg:w-1/4
                bg-canvas
                transform transition-transform duration-300 ease-in-out
                lg:transform-none
                flex flex-col overflow-hidden
                ${showInterventions ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              `}
            >
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

      {/* About Selection Modal */}
      <AboutSelectionModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
}

export default App;
