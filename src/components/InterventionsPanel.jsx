import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

export default function InterventionsPanel({ interventions, selectedIntervention, onSelectIntervention }) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div id="interventions-panel">
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

                    {/* Show citation */}
                    {intervention.citation && (
                      <div className="pt-1 border-t border-gray-100">
                        <a
                          href={intervention.citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="font-medium">Citation</span>
                        </a>
                        {intervention.citationText && (
                          <p className="text-xs text-gray-600 mt-0.5 italic">
                            {intervention.citationText}
                          </p>
                        )}
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
