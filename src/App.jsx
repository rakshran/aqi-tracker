import { useState } from 'react';
import { citiesData } from './data/citiesData';
import CitySelector from './components/CitySelector';
import PollutionChart from './components/PollutionChart';
import InterventionsPanel from './components/InterventionsPanel';
import AboutSelectionModal from './components/AboutSelectionModal';

function App() {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [showInterventions, setShowInterventions] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedIntervention(null);
    setShowInterventions(false);
  };

  const handleInterventionClick = (intervention) => {
    setSelectedIntervention(intervention);
    setShowInterventions(true);
    setTimeout(() => {
      const panel = document.getElementById('interventions-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas overflow-x-hidden">
      {/* Masthead */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-canvas flex-shrink-0">
        <div className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3 min-h-[56px]">
          <div className="min-w-0">
            <h1 className="font-serif text-xl md:text-3xl font-bold tracking-editorial text-ink">
              Historical Air Pollution Trends
            </h1>
            <p className="hidden md:block font-sans text-xs uppercase tracking-widest text-ink/50 mt-1">
              A visual investigation into urban air quality
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAboutModal(true)}
              className="hidden md:inline-flex items-center px-3 py-2 min-h-[44px] font-sans text-xs uppercase tracking-widest text-ink/60 border border-black/10 hover:text-ink hover:border-ink transition-colors"
              aria-label="About city selection"
            >
              About
            </button>
            <button
              onClick={() => setShowControls(!showControls)}
              className="md:hidden inline-flex items-center px-3 py-2 min-h-[44px] font-sans text-xs uppercase tracking-widest border border-black/10 active:bg-accent transition-colors"
              aria-label="Toggle navigation controls"
            >
              {showControls ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content: Editorial Grid */}
      <main className="flex-1 min-h-0 flex flex-col md:flex-row">
        {/* Left Column: City Selector + Chart */}
        <div className="w-full md:w-3/4 flex flex-col border-b md:border-b-0 md:border-r border-black/10">
          {/* City Selector Row */}
          <div className={`${showControls ? 'block' : 'hidden'} md:block px-4 md:px-8 py-4 border-b border-black/10 flex-shrink-0`}>
            <label className="font-sans text-xs uppercase tracking-widest text-ink/50 mb-2 block">
              Select City
            </label>
            <CitySelector
              cities={citiesData}
              selectedCity={selectedCity}
              onSelectCity={handleCitySelect}
            />
            {/* Selection Bias Notice */}
            <div className="mt-3 py-2 border-t border-black/10 text-xs font-sans">
              <p className="text-ink/50 leading-relaxed">
                <span className="font-semibold text-ink/70">Dataset Limitation:</span>{' '}
                These cities were selected for data availability and documented improvements. This creates selection bias.{' '}
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="inline-flex min-h-[44px] items-center text-ink underline md:hover:text-ink/70 active:text-ink/70 transition-colors"
                >
                  Learn more
                </button>
              </p>
            </div>
            <button
              onClick={() => setShowAboutModal(true)}
              className="mt-3 w-full md:hidden min-h-[44px] border border-black/10 font-sans text-xs uppercase tracking-widest active:bg-accent transition-colors"
            >
              About Methodology
            </button>
          </div>

          {/* Chart */}
          {selectedCity && (
            <div className="flex-1 min-h-[520px] md:min-h-0 px-4 md:px-8 py-4 md:py-6 border-b md:border-b-0 border-black/10">
              <PollutionChart
                city={selectedCity}
                onInterventionClick={handleInterventionClick}
              />
            </div>
          )}
        </div>

        {/* Right Column: Interventions */}
        {selectedCity && (
          <section className="w-full md:w-1/4 flex flex-col">
            <div className="px-4 md:px-6 py-3 border-b border-black/10 flex items-center justify-between md:block">
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-editorial text-ink">
                Milestones
              </h2>
              <button
                onClick={() => setShowInterventions(!showInterventions)}
                className="md:hidden inline-flex items-center px-3 py-2 min-h-[44px] font-sans text-xs uppercase tracking-widest border border-black/10 active:bg-accent transition-colors"
                aria-label="Toggle milestones panel"
              >
                {showInterventions ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={`${showInterventions ? 'block' : 'hidden'} md:block flex-1 overflow-y-auto px-4 md:px-6 py-4`}>
                <InterventionsPanel
                  interventions={selectedCity.interventions}
                  selectedIntervention={selectedIntervention}
                  onSelectIntervention={setSelectedIntervention}
                />
            </div>
          </section>
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
