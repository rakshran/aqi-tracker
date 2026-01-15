import { useState } from 'react';
import { citiesData } from './data/citiesData';
import CitySelector from './components/CitySelector';
import PollutionChart from './components/PollutionChart';
import InterventionsPanel from './components/InterventionsPanel';

function App() {
  const [selectedCity, setSelectedCity] = useState(citiesData[0]);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedIntervention(null);
  };

  const handleInterventionClick = (intervention) => {
    setSelectedIntervention(intervention);
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
      <header className="border-b border-gray-200 bg-white px-6 py-3 flex-shrink-0">
        <h1 className="text-xl font-bold">Historical Air Pollution Trends</h1>
      </header>

      {/* Main Content: Single Viewport Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Section: 3/4 - City Selector + Chart */}
        <div className="w-3/4 flex flex-col overflow-hidden border-r border-gray-200">
          {/* City Selector */}
          <div className="px-6 py-4 border-b border-gray-200 overflow-y-auto flex-shrink-0">
            <h2 className="text-sm font-semibold mb-3 text-gray-700">SELECT CITY</h2>
            <CitySelector
              cities={citiesData}
              selectedCity={selectedCity}
              onSelectCity={handleCitySelect}
            />
          </div>

          {/* Chart */}
          {selectedCity && (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <PollutionChart
                city={selectedCity}
                onInterventionClick={handleInterventionClick}
              />
            </div>
          )}
        </div>

        {/* Right Section: 1/4 - Interventions */}
        <div className="w-1/4 flex flex-col overflow-hidden bg-gray-50">
          {selectedCity && (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <InterventionsPanel
                interventions={selectedCity.interventions}
                selectedIntervention={selectedIntervention}
                onSelectIntervention={setSelectedIntervention}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
