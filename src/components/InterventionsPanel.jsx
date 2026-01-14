import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function InterventionsPanel({ interventions, selectedIntervention, onSelectIntervention }) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-balance">Key Interventions</h3>
      <div className="space-y-3">
        {interventions.map((intervention, index) => {
          const isSelected = selectedIntervention?.year === intervention.year;

          return (
            <button
              key={index}
              onClick={() => onSelectIntervention(intervention)}
              className={cn(
                "w-full text-left p-4 rounded border transition-all",
                "hover:border-gray-400 hover:shadow-sm",
                isSelected
                  ? "border-gray-900 bg-gray-50 shadow-sm"
                  : "border-gray-200 bg-white"
              )}
              aria-label={`View details for ${intervention.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="size-10 rounded-full bg-[#D73847] text-white flex items-center justify-center font-bold text-sm tabular-nums">
                    {intervention.year}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold mb-1 text-balance">{intervention.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 text-pretty">
                    {intervention.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                      {intervention.impact}
                    </span>

                    {/* Show affected pollutants */}
                    {intervention.affectedPollutants && intervention.affectedPollutants.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-500">Reduced:</span>
                        {intervention.affectedPollutants.map((pollutant) => {
                          const info = pollutantInfo[pollutant];
                          if (!info) return null;

                          return (
                            <span
                              key={pollutant}
                              className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 bg-white border border-gray-200 rounded"
                              title={info.description}
                            >
                              <div
                                className="size-2 rounded-full"
                                style={{ backgroundColor: info.color }}
                              />
                              {info.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
