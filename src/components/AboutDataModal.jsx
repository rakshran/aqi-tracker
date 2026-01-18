import React from 'react';

export default function AboutDataModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">About This Data</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-6">
              {/* Causation vs Correlation Section */}
              <section>
                <div className="flex items-start gap-3 mb-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Important: Causation vs. Correlation
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The interventions marked on the charts are <strong>temporally associated</strong> with
                      changes in air quality, but this visualization <strong>does not prove causation</strong>.
                      Air quality improvements are the result of complex, multi-factorial processes.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-amber-900">Why We Can't Claim Causation:</h4>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Multiple Simultaneous Factors:</strong> Numerous policies, economic changes, technological advances, and weather patterns influence air quality simultaneously.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Temporal Lag:</strong> Policy impacts often take years to materialize. A policy enacted in year X may not show measurable effects until year X+5.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Economic Confounders:</strong> Economic recessions, industrial shifts, and deindustrialization can reduce emissions independent of environmental policy.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Weather Variability:</strong> Annual weather patterns (wind, precipitation, temperature inversions) significantly affect measured pollution levels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Technological Progress:</strong> Ongoing technological improvements in engines, fuels, and industrial processes occur independently of specific regulations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span><strong>Regional/Transboundary Effects:</strong> Pollution transport from neighboring regions affects local measurements, especially for Delhi and Beijing.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* What This Data Shows */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">What This Data Shows</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-blue-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Historical trends</strong> in air quality measurements over time</span>
                  </p>
                  <p className="text-sm text-blue-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Temporal correlation</strong> between policy implementation and pollution changes</span>
                  </p>
                  <p className="text-sm text-blue-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Documented interventions</strong> that were implemented during periods of air quality change</span>
                  </p>
                  <p className="text-sm text-blue-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Case studies</strong> of cities that experienced significant air quality improvements</span>
                  </p>
                </div>
              </section>

              {/* What This Data Does NOT Show */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">What This Data Does NOT Show</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-red-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span><strong>Definitive causation</strong> between specific policies and pollution reductions</span>
                  </p>
                  <p className="text-sm text-red-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span><strong>Controlled experiments</strong> isolating single policy effects</span>
                  </p>
                  <p className="text-sm text-red-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span><strong>Statistical significance testing</strong> or confidence intervals</span>
                  </p>
                  <p className="text-sm text-red-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span><strong>Failed interventions</strong> or cities where pollution worsened (selection bias)</span>
                  </p>
                  <p className="text-sm text-red-900 flex items-start gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span><strong>Within-city inequality</strong> (pollution varies by neighborhood, not shown in city averages)</span>
                  </p>
                </div>
              </section>

              {/* How to Interpret Impact Statements */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">How to Interpret Impact Statements</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    Impact statements (e.g., "emissions declined ~75% after implementation") represent:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700">
                      <strong>Reported correlations</strong> from government reports or academic studies
                    </li>
                    <li className="text-gray-700">
                      <strong>Observed trends</strong> following policy implementation
                    </li>
                    <li className="text-gray-700">
                      <strong>Estimated effects</strong> based on modeling or sector-specific measurements
                    </li>
                  </ul>
                  <p className="text-gray-700 italic border-l-4 border-gray-300 pl-3 py-2 bg-gray-50">
                    These statements should be read as "X% reduction was observed in the years following
                    this intervention" rather than "this intervention directly caused X% reduction."
                  </p>
                </div>
              </section>

              {/* Recommended Use */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Recommended Use of This Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-green-900 mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Appropriate Uses:
                    </h4>
                    <ul className="space-y-1 text-xs text-green-800">
                      <li>• Educational exploration of trends</li>
                      <li>• Understanding policy timelines</li>
                      <li>• Identifying case studies for further research</li>
                      <li>• Visualizing long-term air quality changes</li>
                      <li>• Sparking interest in environmental policy</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-semibold text-sm text-red-900 mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Inappropriate Uses:
                    </h4>
                    <ul className="space-y-1 text-xs text-red-800">
                      <li>• Claiming definitive policy effectiveness</li>
                      <li>• Academic research without validation</li>
                      <li>• Policy advocacy without caveats</li>
                      <li>• Cost-benefit analyses</li>
                      <li>• Ignoring confounding factors</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Further Reading */}
              <section className="pb-2">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Further Reading</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    For rigorous analysis of air quality policy effectiveness, consult:
                  </p>
                  <ul className="space-y-1.5 ml-4 text-blue-600">
                    <li>
                      <a href="https://www.epa.gov/air-research" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        EPA Air Quality Research
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://ourworldindata.org/air-pollution" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        Our World in Data: Air Pollution
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.who.int/health-topics/air-pollution" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        WHO Air Pollution Resources
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <span className="text-gray-700">Peer-reviewed journals on environmental economics and policy evaluation</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
