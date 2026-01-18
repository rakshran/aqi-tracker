import { useState } from 'react';
import { citiesData } from './data/citiesData';
import CitySelector from './components/CitySelector';
import PollutionChart from './components/PollutionChart';
import InterventionsPanel from './components/InterventionsPanel';

function App() {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [showInterventions, setShowInterventions] = useState(false);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedIntervention(null);
  };

  const handleInterventionClick = (intervention) => {
    setSelectedIntervention(intervention);
    setShowInterventions(true);
    // Scroll to interventions panel
    setTimeout(() => {
      const panel = document.getElementById('interventions-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Compact Header */}
      <header className="border-b border-gray-200 bg-white px-4 md:px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold">Historical Air Pollution Trends</h1>
          {/* Mobile Interventions Toggle */}
          <button
            onClick={() => setShowInterventions(!showInterventions)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle interventions panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showInterventions ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content: Responsive Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Section: City Selector + Chart - Full width on mobile, 3/4 on desktop */}
        <div className="flex-1 lg:w-3/4 flex flex-col overflow-hidden lg:border-r border-gray-200">
          {/* City Selector */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 overflow-y-auto flex-shrink-0">
            <h2 className="text-sm font-semibold mb-3 text-gray-700">SELECT CITY</h2>
            <CitySelector
              cities={citiesData}
              selectedCity={selectedCity}
              onSelectCity={handleCitySelect}
            />
          </div>

          {/* Chart */}
          {selectedCity && (
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
              <PollutionChart
                city={selectedCity}
                onInterventionClick={handleInterventionClick}
              />
            </div>
          )}
        </div>

        {/* Right Section: Interventions - Drawer on mobile, sidebar on desktop */}
        {selectedCity && (
          <>
            {/* Mobile Overlay */}
            {showInterventions && (
              <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowInterventions(false)}
              />
            )}

            {/* Interventions Panel */}
            <div
              className={`
                fixed lg:relative inset-y-0 right-0 z-50 lg:z-auto
                w-80 lg:w-1/4
                bg-gray-50 lg:bg-gray-50
                transform transition-transform duration-300 ease-in-out
                lg:transform-none
                flex flex-col overflow-hidden
                ${showInterventions ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
              `}
            >
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <InterventionsPanel
                  interventions={selectedCity.interventions}
                  selectedIntervention={selectedIntervention}
                  onSelectIntervention={setSelectedIntervention}
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
