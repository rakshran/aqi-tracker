import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function InterventionsPanel({ interventions, selectedIntervention, onSelectIntervention }) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3 text-gray-700 sticky top-0 bg-gray-50 pb-2">KEY INTERVENTIONS</h3>
      <div className="space-y-2">
        {interventions.map((intervention, index) => {
          const isSelected = selectedIntervention?.year === intervention.year;

          return (
            <button
              key={index}
              onClick={() => onSelectIntervention(intervention)}
              className={cn(
                "w-full text-left p-2.5 rounded border transition-all",
                "hover:border-gray-400 hover:shadow-sm",
                isSelected
                  ? "border-gray-900 bg-white shadow-sm"
                  : "border-gray-200 bg-white"
              )}
              aria-label={`View details for ${intervention.title}`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="size-8 rounded-full bg-[#D73847] text-white flex items-center justify-center font-bold text-xs tabular-nums">
                    {intervention.year}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs mb-1 leading-tight">{intervention.title}</h4>
                  <p className="text-xs text-gray-600 mb-1.5 leading-snug line-clamp-3">
                    {intervention.description}
                  </p>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded inline-block">
                      {intervention.impact}
                    </span>

                    {/* Show affected pollutants */}
                    {intervention.affectedPollutants && intervention.affectedPollutants.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {intervention.affectedPollutants.map((pollutant) => {
                          const info = pollutantInfo[pollutant];
                          if (!info) return null;

                          return (
                            <span
                              key={pollutant}
                              className="inline-flex items-center gap-0.5 text-xs px-1 py-0.5 bg-gray-100 rounded"
                              title={info.description}
                            >
                              <div
                                className="size-1.5 rounded-full"
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
