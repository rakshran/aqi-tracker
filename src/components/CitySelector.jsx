import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
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
              "text-left p-3 rounded border-2 transition-all flex-shrink-0 w-44",
              "hover:border-gray-400 hover:shadow-sm",
              isSelected
                ? "border-gray-900 bg-gray-50 shadow-sm"
                : "border-gray-200 bg-white"
            )}
            aria-label={`View data for ${city.name}`}
          >
            <h3 className="font-bold text-sm mb-0.5 truncate">{city.name}</h3>
            <p className="text-xs text-gray-500 mb-2 truncate">{city.country}</p>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold tabular-nums">{latestValue}</span>
                <span className="text-xs text-gray-500">{info.unit}</span>
              </div>

              {improvement > 0 && (
                <div className="text-xs text-green-700 font-medium">
                  ↓ {improvement}% improvement
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
