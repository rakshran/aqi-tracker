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

export default function InterventionsPanel({
  interventions,
  selectedIntervention,
  shouldHighlightSelection = false,
  isSelectionFading = false,
  onSelectIntervention
}) {
  if (!interventions || interventions.length === 0) return null;

  return (
    <div id="interventions-panel">
      <h3 className="font-sans text-xs uppercase tracking-widest text-ink/40 mb-4 pb-2 border-b border-ink sticky top-0 bg-canvas z-10">
        Key Interventions
      </h3>

      {/* Correlation Disclaimer */}
      <div className="mb-4 py-2 border-b border-grid">
        <p className="text-xs font-sans text-ink/40 leading-relaxed">
          <span className="font-semibold text-ink/60">Note on Causation:</span>{' '}
          These interventions are timeline context for observed changes, not proof of direct causation.
        </p>
      </div>

      {/* Interventions as Table of Contents */}
      <div className="divide-y divide-grid">
        {interventions.map((intervention, index) => {
          const isSelected = selectedIntervention?.year === intervention.year;
          const cardClassName = cn(
            "w-full text-left px-2 py-3 transition-colors duration-700 ease-out min-h-[60px] block",
            isSelected && shouldHighlightSelection && !isSelectionFading && "bg-accent",
            isSelected && shouldHighlightSelection && isSelectionFading && "bg-accent/0"
          );

          const cardContent = (
            <div className="flex items-start gap-3">
              {/* Year — monospace, left column */}
              <span className="font-sans tabular-nums text-xs text-ink/40 pt-0.5 w-10 flex-shrink-0">
                {intervention.year}
              </span>

              {/* Content — center */}
              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-sm leading-tight text-ink">
                  {intervention.title}
                </h4>
                <p className="text-xs font-sans text-ink/50 mt-1 leading-snug line-clamp-2">
                  {intervention.description}
                </p>

                {/* Affected pollutants */}
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
          );

          if (intervention.sourceUrl) {
            return (
              <a
                key={index}
                href={intervention.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSelectIntervention(intervention)}
                className={cardClassName}
                aria-label={`Open source for ${intervention.title}`}
              >
                {cardContent}
              </a>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onSelectIntervention(intervention)}
              className={cardClassName}
              aria-label={`View details for ${intervention.title}`}
            >
              {cardContent}
            </button>
          );
        })}
      </div>
    </div>
  );
}
