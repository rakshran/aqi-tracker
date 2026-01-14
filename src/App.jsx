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
    <div className="min-h-dvh bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 safe-area-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Historical Air Pollution Trends
          </h1>
          <p className="text-gray-600 text-pretty max-w-3xl">
            Explore how major cities around the world have battled air pollution and the
            interventions that led to significant improvements. Interactive data visualization
            showing decades of progress and key policy milestones.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City Selector */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-balance">Select a City</h2>
          <CitySelector
            cities={citiesData}
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
          />
        </section>

        {/* Chart */}
        {selectedCity && (
          <section className="mb-12">
            <PollutionChart
              city={selectedCity}
              onInterventionClick={handleInterventionClick}
            />
          </section>
        )}

        {/* Interventions */}
        {selectedCity && (
          <section id="interventions-panel">
            <InterventionsPanel
              interventions={selectedCity.interventions}
              selectedIntervention={selectedIntervention}
              onSelectIntervention={setSelectedIntervention}
            />
          </section>
        )}

        {/* About Section */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-balance">About This Data</h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-pretty text-gray-600 mb-4">
              This visualization shows historical trends for multiple air pollutants (PM2.5, PM10,
              SO₂, NO₂, O₃, CO) in major cities that have battled severe pollution. Values represent
              approximate annual average concentrations in µg/m³ or mg/m³. Toggle different pollutants
              on/off to see how specific interventions affected different types of air pollution.
            </p>
            <p className="text-pretty text-gray-600 mb-4">
              Red markers on the timeline indicate major policy interventions. Click on these
              markers or the intervention cards to learn which pollutants each policy targeted.
              Different interventions had varying impacts: coal bans reduced SO₂, catalytic
              converters cut NO₂ and CO, while diesel regulations lowered PM10.
            </p>
            <h3 className="text-lg font-semibold mb-3 mt-6">Key Lessons</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="text-pretty">
                <strong>Long-term commitment works:</strong> Cities like Los Angeles and London
                took decades of sustained effort, but achieved remarkable improvements.
              </li>
              <li className="text-pretty">
                <strong>Multiple interventions needed:</strong> No single policy solved the problem.
                Success required addressing vehicles, industry, energy, and urban planning.
              </li>
              <li className="text-pretty">
                <strong>Rapid change is possible:</strong> Beijing's dramatic improvement in just
                5-7 years shows that aggressive, coordinated action can yield fast results.
              </li>
              <li className="text-pretty">
                <strong>Political will is essential:</strong> Major improvements happened when
                governments prioritized air quality and invested significantly in solutions.
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-500 text-center">
            Data compiled from historical air quality records, government reports, and academic studies.
            Inspired by Our World in Data.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
