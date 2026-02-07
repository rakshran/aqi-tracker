import React from 'react';

export default function AboutDataModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-canvas border border-ink max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-canvas border-b border-ink px-6 py-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold tracking-editorial text-ink">About This Data</h2>
              <button
                onClick={onClose}
                className="text-ink/30 hover:text-ink transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-8">
              {/* Causation vs Correlation Section */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">
                  Important: Causation vs. Correlation
                </h3>
                <p className="text-sm font-sans text-ink/60 leading-relaxed mb-4">
                  The interventions marked on the charts are <strong className="text-ink">temporally associated</strong> with
                  changes in air quality, but this visualization <strong className="text-ink">does not prove causation</strong>.
                  Air quality improvements are the result of complex, multi-factorial processes.
                </p>

                <div className="border-t border-b border-grid py-4 space-y-3">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-ink/40">Why We Cannot Claim Causation</h4>
                  <ul className="space-y-2 text-sm font-sans text-ink/60">
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Multiple Simultaneous Factors:</strong> Numerous policies, economic changes, technological advances, and weather patterns influence air quality simultaneously.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Temporal Lag:</strong> Policy impacts often take years to materialize. A policy enacted in year X may not show measurable effects until year X+5.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Economic Confounders:</strong> Economic recessions, industrial shifts, and deindustrialization can reduce emissions independent of environmental policy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Weather Variability:</strong> Annual weather patterns (wind, precipitation, temperature inversions) significantly affect measured pollution levels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Technological Progress:</strong> Ongoing technological improvements in engines, fuels, and industrial processes occur independently of specific regulations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink/30 mt-0.5">—</span>
                      <span><strong className="text-ink/80">Regional/Transboundary Effects:</strong> Pollution transport from neighboring regions affects local measurements, especially for Delhi and Beijing.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* What This Data Shows */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">What This Data Shows</h3>
                <div className="space-y-2">
                  {[
                    ['Historical trends', 'in air quality measurements over time'],
                    ['Temporal correlation', 'between policy implementation and pollution changes'],
                    ['Documented interventions', 'that were implemented during periods of air quality change'],
                    ['Case studies', 'of cities that experienced significant air quality improvements'],
                  ].map(([bold, rest], i) => (
                    <p key={i} className="text-sm font-sans text-ink/60 flex items-start gap-2">
                      <span className="text-severity-good mt-0.5">+</span>
                      <span><strong className="text-ink/80">{bold}</strong> {rest}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* What This Data Does NOT Show */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">What This Data Does NOT Show</h3>
                <div className="space-y-2">
                  {[
                    ['Definitive causation', 'between specific policies and pollution reductions'],
                    ['Controlled experiments', 'isolating single policy effects'],
                    ['Statistical significance testing', 'or confidence intervals'],
                    ['Failed interventions', 'or cities where pollution worsened (selection bias)'],
                    ['Within-city inequality', '(pollution varies by neighborhood, not shown in city averages)'],
                  ].map(([bold, rest], i) => (
                    <p key={i} className="text-sm font-sans text-ink/60 flex items-start gap-2">
                      <span className="text-severity-hazardous mt-0.5">×</span>
                      <span><strong className="text-ink/80">{bold}</strong> {rest}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* How to Interpret Impact Statements */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">How to Interpret Impact Statements</h3>
                <div className="space-y-3 text-sm font-sans">
                  <p className="text-ink/60">
                    Impact statements (e.g., "emissions declined ~75% after implementation") represent:
                  </p>
                  <ul className="space-y-2 ml-4 text-ink/60">
                    <li><strong className="text-ink/80">Reported correlations</strong> from government reports or academic studies</li>
                    <li><strong className="text-ink/80">Observed trends</strong> following policy implementation</li>
                    <li><strong className="text-ink/80">Estimated effects</strong> based on modeling or sector-specific measurements</li>
                  </ul>
                  <blockquote className="border-l-2 border-ink pl-4 py-2 text-ink/50 italic font-serif">
                    These statements should be read as "X% reduction was observed in the years following
                    this intervention" rather than "this intervention directly caused X% reduction."
                  </blockquote>
                </div>
              </section>

              {/* Recommended Use */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">Recommended Use of This Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-grid p-4">
                    <h4 className="font-sans text-xs uppercase tracking-widest text-severity-good mb-2">
                      Appropriate Uses
                    </h4>
                    <ul className="space-y-1 text-xs font-sans text-ink/50">
                      <li>— Educational exploration of trends</li>
                      <li>— Understanding policy timelines</li>
                      <li>— Identifying case studies for further research</li>
                      <li>— Visualizing long-term air quality changes</li>
                      <li>— Sparking interest in environmental policy</li>
                    </ul>
                  </div>

                  <div className="border border-grid p-4">
                    <h4 className="font-sans text-xs uppercase tracking-widest text-severity-hazardous mb-2">
                      Inappropriate Uses
                    </h4>
                    <ul className="space-y-1 text-xs font-sans text-ink/50">
                      <li>— Claiming definitive policy effectiveness</li>
                      <li>— Academic research without validation</li>
                      <li>— Policy advocacy without caveats</li>
                      <li>— Cost-benefit analyses</li>
                      <li>— Ignoring confounding factors</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Further Reading */}
              <section className="pb-2">
                <h3 className="font-serif text-lg font-bold text-ink mb-3">Further Reading</h3>
                <p className="text-sm font-sans text-ink/60 mb-3">
                  For rigorous analysis of air quality policy effectiveness, consult:
                </p>
                <ul className="space-y-1.5 ml-4 font-sans text-sm">
                  <li>
                    <a href="https://www.epa.gov/air-research" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      EPA Air Quality Research
                    </a>
                  </li>
                  <li>
                    <a href="https://ourworldindata.org/air-pollution" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      Our World in Data: Air Pollution
                    </a>
                  </li>
                  <li>
                    <a href="https://www.who.int/health-topics/air-pollution" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      WHO Air Pollution Resources
                    </a>
                  </li>
                  <li>
                    <span className="text-ink/40 font-sans">Peer-reviewed journals on environmental economics and policy evaluation</span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-canvas border-t border-ink px-6 py-4">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-ink text-canvas font-sans text-xs uppercase tracking-widest hover:bg-transparent hover:text-ink border border-ink transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
