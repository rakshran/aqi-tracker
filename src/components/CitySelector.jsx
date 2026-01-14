import { cn } from '../utils/cn';
import { getAQICategory } from '../data/citiesData';

export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cities.map((city) => {
        const latestData = city.data[city.data.length - 1];
        const oldestData = city.data[0];
        const improvement = oldestData.aqi - latestData.aqi;
        const improvementPercent = ((improvement / oldestData.aqi) * 100).toFixed(0);
        const category = getAQICategory(latestData.aqi);
        const isSelected = selectedCity?.id === city.id;

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
                <span className="text-2xl font-bold tabular-nums">{latestData.aqi}</span>
                <span className="text-xs text-gray-500">AQI ({latestData.year})</span>
              </div>

              <div className={cn("text-xs font-medium", category.textColor)}>
                {category.label}
              </div>

              {improvement > 0 && (
                <div className="text-sm text-green-700 font-medium">
                  ↓ {improvementPercent}% since {oldestData.year}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
