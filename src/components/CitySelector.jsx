import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cities.map((city) => {
        const latestData = city.data[city.data.length - 1];
        const oldestData = city.data[0];
        const isSelected = selectedCity?.id === city.id;

        // Show PM2.5 if available, otherwise PM10
        const primaryPollutant = latestData.pm25 !== undefined ? 'pm25' : 'pm10';
        const latestValue = latestData[primaryPollutant];
        const oldestValue = oldestData[primaryPollutant];
        const improvement = oldestValue && latestValue
          ? ((oldestValue - latestValue) / oldestValue * 100).toFixed(0)
          : 0;

        const info = pollutantInfo[primaryPollutant];

        return (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
            className={cn(
              "text-left p-4 rounded border-2 transition-all",
              "hover:border-gray-400 hover:shadow-md",
              isSelected
                ? "border-gray-900 bg-gray-50 shadow-md"
                : "border-gray-200 bg-white"
            )}
            aria-label={`View data for ${city.name}`}
          >
            <h3 className="font-bold text-lg mb-1">{city.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{city.country}</p>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums">{latestValue}</span>
                <span className="text-xs text-gray-500">{info.unit} {info.name} ({latestData.year})</span>
              </div>

              {improvement > 0 && (
                <div className="text-sm text-green-700 font-medium">
                  ↓ {improvement}% since {oldestData.year}
                </div>
              )}

              {/* Show available pollutants */}
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.keys(pollutantInfo).map((pollutant) => {
                  if (latestData[pollutant] !== undefined) {
                    const pInfo = pollutantInfo[pollutant];
                    return (
                      <span
                        key={pollutant}
                        className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 bg-gray-100 rounded"
                      >
                        <div
                          className="size-2 rounded-full"
                          style={{ backgroundColor: pInfo.color }}
                        />
                        {pInfo.name}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
