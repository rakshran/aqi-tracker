import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

// Muted editorial colors (keep in sync with PollutionChart)
const editorialColors = {
  pm25: '#1A1A1A',
  pm10: '#6B6B6B',
  so2: '#8B3A7A',
  no2: '#3B5998',
  o3: '#7A9A6D',
  co: '#B87333',
};

export default function InterventionsPanel({ interventions, selectedIntervention, onSelectIntervention }) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div id="interventions-panel">
      <h3 className="font-sans text-xs uppercase tracking-widest text-ink/40 mb-4 pb-2 border-b border-black/10 sticky top-0 bg-canvas z-10">
        Key Interventions
      </h3>

      {/* Correlation Disclaimer */}
      <div className="mb-4 py-2 border-b border-black/10">
        <p className="text-xs font-sans text-ink/40 leading-relaxed">
          <span className="font-semibold text-ink/60">Note on Causation:</span>{' '}
          These interventions are temporally associated with air quality changes. Impact statements represent reported correlations, not proven causation.
        </p>
      </div>

      {/* Interventions as Table of Contents */}
      <div className="divide-y divide-black/10">
        {interventions.map((intervention, index) => {
          const isSelected = selectedIntervention?.year === intervention.year;

          return (
            <button
              key={index}
              onClick={() => onSelectIntervention(intervention)}
              className={cn(
                "relative w-full text-left py-3 px-2 pr-10 transition-colors min-h-[64px] group touch-manipulation",
                isSelected
                  ? "bg-accent/90"
                  : "active:bg-accent md:hover:bg-accent/70"
              )}
              aria-label={`View details for ${intervention.title}`}
            >
              {/* Mobile Layout */}
              <div className="md:hidden">
                <h4 className="font-serif font-bold text-base leading-tight text-ink pr-2">
                  {intervention.title}
                </h4>
                <p className="text-xs font-sans text-ink/50 mt-1 uppercase tracking-wider">
                  {intervention.year}
                </p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-start gap-3">
                <span className="font-sans tabular-nums text-xs text-ink/40 pt-0.5 w-10 flex-shrink-0 md:group-hover:text-ink">
                  {intervention.year}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm leading-tight text-ink">
                    {intervention.title}
                  </h4>
                  <p className="text-xs font-sans text-ink/50 mt-1 leading-snug line-clamp-2 md:group-hover:text-ink/70">
                    {intervention.description}
                  </p>
                  <p className="text-xs font-serif italic text-ink/40 mt-1 md:group-hover:text-ink/60">
                    {intervention.impact}
                  </p>

                  {intervention.affectedPollutants && intervention.affectedPollutants.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {intervention.affectedPollutants.map((pollutant) => {
                        const info = pollutantInfo[pollutant];
                        if (!info) return null;
                        const color = editorialColors[pollutant] || info.color;

                        return (
                          <span
                            key={pollutant}
                            className="inline-flex items-center gap-1 text-xs font-sans text-ink/40"
                            title={info.description}
                          >
                            <div
                              className="w-2 h-0.5"
                              style={{ backgroundColor: color }}
                            />
                            {info.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/30 md:group-hover:text-ink">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
