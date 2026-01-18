import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function InterventionsPanel({ interventions, selectedIntervention, onSelectIntervention }) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div id="interventions-panel">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 sticky top-0 bg-gray-50 pb-2 z-10">KEY INTERVENTIONS</h3>

      {/* Correlation Disclaimer */}
      <div className="mb-3 p-2.5 bg-amber-50 border border-amber-200 rounded text-xs">
        <div className="flex items-start gap-2">
          <svg className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-amber-800 leading-relaxed">
            <span className="font-semibold">Note on Causation:</span> These interventions are <strong>temporally associated</strong> with air quality changes. However, pollution improvements result from multiple factors working together over time, not solely from individual policies. Impact statements represent reported correlations, not proven causation.
          </p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-2">
        {interventions.map((intervention, index) => {
          const isSelected = selectedIntervention?.year === intervention.year;

          return (
            <button
              key={index}
              onClick={() => onSelectIntervention(intervention)}
              className={cn(
                "w-full text-left p-3 md:p-2.5 rounded border transition-all min-h-[60px]",
                "hover:border-gray-400 hover:shadow-sm active:scale-98",
                isSelected
                  ? "border-amber-200 bg-amber-50 shadow-sm"
                  : "border-gray-200 bg-white"
              )}
              aria-label={`View details for ${intervention.title}`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold text-xs tabular-nums">
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
