export default function AboutSelectionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 z-50"
        onClick={onClose}
        aria-hidden="true"
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
              <h2 className="font-serif text-xl font-bold tracking-editorial text-ink">About City Selection</h2>
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
            <div className="px-6 py-6 space-y-8 text-sm">
              {/* Important Notice */}
              <div className="border-l-2 border-accent pl-4 py-2">
                <h3 className="font-sans text-xs uppercase tracking-widest text-ink/40 mb-2">Selection Bias Acknowledgment</h3>
                <p className="font-sans text-ink/60 leading-relaxed">
                  This dataset is <strong className="text-ink">not representative</strong> of global air quality trends. The cities shown were selected based on data availability and documented policy interventions, creating inherent bias toward success stories.
                </p>
              </div>

              {/* Why These Cities */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">Why These 8 Cities?</h3>
                <p className="font-sans text-ink/60 mb-3">
                  Cities were selected based on the following criteria:
                </p>
                <ul className="space-y-1.5 font-sans text-ink/60 ml-4">
                  <li>— <strong className="text-ink/80">Long-term data availability:</strong> 20+ years of reliable monitoring data from government sources</li>
                  <li>— <strong className="text-ink/80">Documented interventions:</strong> Verifiable policy measures with official records</li>
                  <li>— <strong className="text-ink/80">Observable trends:</strong> Measurable changes in air quality over time</li>
                  <li>— <strong className="text-ink/80">English-language documentation:</strong> Accessibility of policy documents and research</li>
                </ul>
              </section>

              {/* Types of Bias */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">Selection Bias in This Dataset</h3>

                <div className="space-y-4">
                  {/* Success-Oriented Bias */}
                  <div className="border-t border-grid pt-3">
                    <h4 className="font-serif font-semibold text-ink mb-1">1. Success-Oriented Bias</h4>
                    <p className="font-sans text-ink/60 mb-2"><strong className="text-ink/80">What's included:</strong> Cities that experienced measurable improvements or implemented major interventions</p>
                    <p className="font-sans text-ink/60 mb-1"><strong className="text-ink/80">What's missing:</strong></p>
                    <ul className="font-sans text-ink/50 ml-4 text-xs space-y-0.5">
                      <li>— Cities where air quality worsened despite interventions</li>
                      <li>— Cities with deteriorating pollution and no policy response</li>
                      <li>— Cities that improved initially but later regressed</li>
                      <li>— Failed policy experiments and ineffective interventions</li>
                    </ul>
                  </div>

                  {/* Geographic Bias */}
                  <div className="border-t border-grid pt-3">
                    <h4 className="font-serif font-semibold text-ink mb-1">2. Geographic Bias</h4>
                    <p className="font-sans text-ink/60 mb-2"><strong className="text-ink/80">Regions represented:</strong> North America (3 cities), Europe (1 city), Asia (4 cities)</p>
                    <p className="font-sans text-ink/60 mb-1"><strong className="text-ink/80">Regions missing:</strong></p>
                    <ul className="font-sans text-ink/50 ml-4 text-xs space-y-0.5">
                      <li>— Africa (0 cities) — Limited long-term monitoring data</li>
                      <li>— South America (0 cities) — Data access and language barriers</li>
                      <li>— Central Asia (0 cities) — Data reliability challenges</li>
                      <li>— Oceania (0 cities) — Different pollution profiles</li>
                      <li>— Middle East (0 cities) — Data accessibility limitations</li>
                    </ul>
                  </div>

                  {/* Data Availability Bias */}
                  <div className="border-t border-grid pt-3">
                    <h4 className="font-serif font-semibold text-ink mb-1">3. Data Availability Bias</h4>
                    <ul className="font-sans text-ink/50 ml-4 text-xs space-y-0.5">
                      <li>— Cities with established environmental agencies are over-represented</li>
                      <li>— Cities in countries with open data policies are favored</li>
                      <li>— Historical data skews toward industrialized nations</li>
                      <li>— English-language sources preferred</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Implications */}
              <section>
                <h3 className="font-serif text-lg font-bold text-ink mb-3">What This Means</h3>
                <p className="font-sans text-ink/60 mb-2">
                  <strong className="text-ink/80">This dataset may create misleading impressions:</strong>
                </p>
                <ul className="space-y-1.5 font-sans text-ink/60 ml-4">
                  <li>— <strong className="text-ink/80">Overstating policy effectiveness:</strong> Showing primarily positive outcomes may suggest policies are more uniformly successful than reality</li>
                  <li>— <strong className="text-ink/80">Underrepresenting challenges:</strong> Difficulty of addressing pollution in rapidly industrializing regions is not fully captured</li>
                  <li>— <strong className="text-ink/80">Creating false optimism:</strong> May suggest pollution problems are easily solved, ignoring structural barriers</li>
                </ul>
              </section>

              {/* Appropriate Use */}
              <section className="border-t border-grid pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-grid p-4">
                    <h4 className="font-sans text-xs uppercase tracking-widest text-severity-good mb-2">
                      Appropriate Uses
                    </h4>
                    <ul className="font-sans text-xs text-ink/50 space-y-1">
                      <li>— Educational exploration of trends</li>
                      <li>— Understanding policy timelines</li>
                      <li>— Identifying case studies for research</li>
                      <li>— Appreciating complexity of air quality management</li>
                    </ul>
                  </div>
                  <div className="border border-grid p-4">
                    <h4 className="font-sans text-xs uppercase tracking-widest text-severity-hazardous mb-2">
                      Inappropriate Uses
                    </h4>
                    <ul className="font-sans text-xs text-ink/50 space-y-1">
                      <li>— Claiming universal policy effectiveness</li>
                      <li>— Generalizing to unrepresented cities</li>
                      <li>— Drawing causal conclusions</li>
                      <li>— Using as sole source for research</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Additional Resources */}
              <section className="border-t border-grid pt-4">
                <h3 className="font-sans text-xs uppercase tracking-widest text-ink/40 mb-3">For a More Complete Picture</h3>
                <p className="text-xs font-sans text-ink/50 mb-2">
                  Supplement this project with comprehensive global databases:
                </p>
                <ul className="space-y-1 text-xs font-sans">
                  <li>
                    <a href="https://ourworldindata.org/air-pollution" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      Our World in Data — Air Pollution
                    </a>
                  </li>
                  <li>
                    <a href="https://www.who.int/data/gho/data/themes/air-pollution" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      WHO Air Quality Database
                    </a>
                  </li>
                  <li>
                    <a href="https://www.iqair.com/world-air-quality-report" target="_blank" rel="noopener noreferrer" className="text-ink/60 underline hover:text-ink transition-colors">
                      IQAir World Air Quality Report
                    </a>
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
