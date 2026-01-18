export default function AboutSelectionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        aria-hidden="true"
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
              <h2 className="text-xl font-bold text-gray-900">About City Selection</h2>
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
            <div className="px-6 py-5 space-y-5 text-sm">
              {/* Important Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-amber-800">Important: Selection Bias Acknowledgment</h3>
                    <p className="mt-2 text-sm text-amber-700">
                      This dataset is <strong>not representative</strong> of global air quality trends. The cities shown were selected based on data availability and documented policy interventions, creating inherent bias toward success stories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why These Cities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why These 8 Cities?</h3>
                <p className="text-gray-700 mb-3">
                  Cities were selected based on the following criteria:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li><strong>Long-term data availability:</strong> 20+ years of reliable monitoring data from government sources</li>
                  <li><strong>Documented interventions:</strong> Verifiable policy measures with official records</li>
                  <li><strong>Observable trends:</strong> Measurable changes in air quality over time</li>
                  <li><strong>English-language documentation:</strong> Accessibility of policy documents and research</li>
                </ul>
              </div>

              {/* Types of Bias */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selection Bias in This Dataset</h3>

                <div className="space-y-4">
                  {/* Success-Oriented Bias */}
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-gray-900 mb-1">1. Success-Oriented Bias</h4>
                    <p className="text-gray-700 mb-2"><strong>What's included:</strong> Cities that experienced measurable improvements or implemented major interventions</p>
                    <p className="text-gray-700"><strong>What's missing:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 ml-3 text-xs space-y-0.5">
                      <li>Cities where air quality worsened despite interventions</li>
                      <li>Cities with deteriorating pollution and no policy response</li>
                      <li>Cities that improved initially but later regressed</li>
                      <li>Failed policy experiments and ineffective interventions</li>
                    </ul>
                  </div>

                  {/* Geographic Bias */}
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-gray-900 mb-1">2. Geographic Bias</h4>
                    <p className="text-gray-700 mb-2"><strong>Regions represented:</strong> North America (3 cities), Europe (1 city), Asia (4 cities)</p>
                    <p className="text-gray-700"><strong>Regions missing:</strong></p>
                    <ul className="list-disc list-inside text-gray-600 ml-3 text-xs space-y-0.5">
                      <li>Africa (0 cities) - Limited long-term monitoring data</li>
                      <li>South America (0 cities) - Data access and language barriers</li>
                      <li>Central Asia (0 cities) - Data reliability challenges</li>
                      <li>Oceania (0 cities) - Different pollution profiles</li>
                      <li>Middle East (0 cities) - Data accessibility limitations</li>
                    </ul>
                  </div>

                  {/* Data Availability Bias */}
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-gray-900 mb-1">3. Data Availability Bias</h4>
                    <ul className="list-disc list-inside text-gray-600 ml-3 text-xs space-y-0.5">
                      <li>Cities with established environmental agencies are over-represented</li>
                      <li>Cities in countries with open data policies are favored</li>
                      <li>Historical data skews toward industrialized nations</li>
                      <li>English-language sources preferred</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Implications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What This Means</h3>
                <p className="text-gray-700 mb-2">
                  <strong>This dataset may create misleading impressions:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li><strong>Overstating policy effectiveness:</strong> Showing primarily positive outcomes may suggest policies are more uniformly successful than reality</li>
                  <li><strong>Underrepresenting challenges:</strong> Difficulty of addressing pollution in rapidly industrializing regions is not fully captured</li>
                  <li><strong>Creating false optimism:</strong> May suggest pollution problems are easily solved, ignoring structural barriers</li>
                </ul>
              </div>

              {/* Appropriate Use */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Appropriate Uses
                    </h4>
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 ml-3">
                      <li>Educational exploration of trends</li>
                      <li>Understanding policy timelines</li>
                      <li>Identifying case studies for research</li>
                      <li>Appreciating complexity of air quality management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Inappropriate Uses
                    </h4>
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1 ml-3">
                      <li>Claiming universal policy effectiveness</li>
                      <li>Generalizing to unrepresented cities</li>
                      <li>Drawing causal conclusions</li>
                      <li>Using as sole source for research</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">For a More Complete Picture</h3>
                <p className="text-xs text-blue-800 mb-2">
                  Supplement this project with comprehensive global databases:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>
                    <a href="https://ourworldindata.org/air-pollution" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline font-medium">
                      Our World in Data - Air Pollution
                    </a>
                  </li>
                  <li>
                    <a href="https://www.who.int/data/gho/data/themes/air-pollution" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline font-medium">
                      WHO Air Quality Database
                    </a>
                  </li>
                  <li>
                    <a href="https://www.iqair.com/world-air-quality-report" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 underline font-medium">
                      IQAir World Air Quality Report
                    </a>
                  </li>
                </ul>
              </div>
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
