import React from 'react';
import { dataSources, citiesData } from '../data/citiesData';

export default function Sources() {
  // Group cities by their primary source
  const citiesBySource = React.useMemo(() => {
    const grouped = {};
    citiesData.forEach(city => {
      const sourceId = city.primarySource;
      if (!grouped[sourceId]) {
        grouped[sourceId] = [];
      }
      grouped[sourceId].push(city);
    });
    return grouped;
  }, []);

  // Get reliability badge color
  const getReliabilityColor = (reliability) => {
    switch (reliability) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Data Sources</h1>
        <p className="text-sm md:text-base text-gray-600">
          All air quality data presented in this visualization is compiled from official government
          environmental agencies and authoritative research institutions. Below is a comprehensive
          list of data sources with full attribution and verification information.
        </p>
      </div>

      {/* Data Quality Statement */}
      <div className="mb-6 md:mb-8 p-4 md:p-5 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 mb-1">Data Verification</h3>
            <p className="text-xs md:text-sm text-blue-800">
              All data sources are official governmental environmental monitoring agencies or
              peer-reviewed research publications. Data quality is assessed based on monitoring
              network coverage, measurement protocols, and temporal consistency. Each city entry
              includes specific monitoring station names for verification purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-6 md:space-y-8">
        {Object.entries(dataSources).map(([sourceId, source]) => {
          const cities = citiesBySource[sourceId] || [];

          return (
            <div key={sourceId} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
              {/* Source Header */}
              <div className="mb-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {source.name}
                  </h2>
                  <span className={`px-2.5 py-1 rounded text-xs font-medium border ${getReliabilityColor(source.reliability)}`}>
                    {source.reliability.toUpperCase()} Reliability
                  </span>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  {source.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-3 text-xs md:text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Official Website
                  </a>
                  {source.datasetUrl && (
                    <a
                      href={source.datasetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      Access Data
                    </a>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded">
                <div>
                  <span className="text-xs font-semibold text-gray-700">Update Frequency:</span>
                  <p className="text-sm text-gray-900 capitalize">{source.updateFrequency}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-700">Source ID:</span>
                  <p className="text-sm text-gray-900 font-mono">{source.id}</p>
                </div>
              </div>

              {/* Cities using this source */}
              {cities.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Cities Using This Source ({cities.length}):
                  </h3>
                  <div className="space-y-3">
                    {cities.map(city => (
                      <div key={city.id} className="bg-gray-50 rounded p-3 border border-gray-100">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-sm text-gray-900">
                            {city.name}, {city.country}
                          </h4>
                          <span className="text-xs text-gray-500">{city.dataPeriod}</span>
                        </div>

                        {/* Monitoring Stations */}
                        {city.monitoringStations && city.monitoringStations.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs font-medium text-gray-600">Monitoring Stations:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {city.monitoringStations.map((station, idx) => (
                                <span key={idx} className="inline-block px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700">
                                  {station}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Data Quality */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Quality:</span>
                            <span className={`px-1.5 py-0.5 rounded ${getReliabilityColor(city.dataQuality)}`}>
                              {city.dataQuality}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Last Verified:</span>
                            <span>{city.lastVerified}</span>
                          </span>
                        </div>

                        {/* Notes */}
                        {city.notes && (
                          <p className="mt-2 text-xs text-gray-600 italic border-l-2 border-gray-300 pl-2">
                            {city.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Methodology Reference */}
      <div className="mt-8 p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Methodology & Verification</h3>
        <p className="text-xs md:text-sm text-gray-600 mb-3">
          For detailed information about data collection, processing methodologies, interpolation
          techniques, and verification procedures, please refer to our comprehensive methodology
          documentation.
        </p>
        <a
          href="https://github.com/rakshran/aqi-tracker/blob/main/DATA_METHODOLOGY.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Data Methodology Documentation
        </a>
      </div>

      {/* Citation Information */}
      <div className="mt-6 p-4 md:p-5 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          How to Cite This Data
        </h3>
        <p className="text-xs md:text-sm text-gray-700 mb-2">
          When using data from this visualization, please cite both the original data source and this project:
        </p>
        <div className="bg-white border border-amber-300 rounded p-3 font-mono text-xs text-gray-800 overflow-x-auto">
          <p className="mb-2">
            <strong>Project Citation:</strong><br />
            Historical Air Pollution Trends. (2024). Air Quality Data Visualization.<br />
            Retrieved from https://github.com/rakshran/aqi-tracker
          </p>
          <p>
            <strong>Data Source Citation:</strong><br />
            [Specific agency name]. ([Year]). [Dataset name]. Retrieved from [URL]
          </p>
        </div>
      </div>
    </div>
  );
}
