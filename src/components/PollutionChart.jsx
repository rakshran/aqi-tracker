import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { cn } from '../utils/cn';
import { pollutantInfo, dataSources } from '../data/citiesData';
import AboutDataModal from './AboutDataModal';

// Custom star shape for intervention markers
const StarShape = (props) => {
  const { cx, cy, size = 10, isHidden = false, interventionTitle = '' } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  // Create a 5-pointed star path
  const points = [];
  for (let i = 0; i < 5; i++) {
    // Outer points
    const outerAngle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const outerX = cx + size * Math.cos(outerAngle);
    const outerY = cy + size * Math.sin(outerAngle);
    points.push(`${outerX},${outerY}`);

    // Inner points
    const innerAngle = outerAngle + Math.PI / 5;
    const innerX = cx + (size * 0.4) * Math.cos(innerAngle);
    const innerY = cy + (size * 0.4) * Math.sin(innerAngle);
    points.push(`${innerX},${innerY}`);
  }

  const actualSize = isHovered ? size * 1.3 : size;
  const scaledPoints = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const outerX = cx + actualSize * Math.cos(outerAngle);
    const outerY = cy + actualSize * Math.sin(outerAngle);
    scaledPoints.push(`${outerX},${outerY}`);

    const innerAngle = outerAngle + Math.PI / 5;
    const innerX = cx + (actualSize * 0.4) * Math.cos(innerAngle);
    const innerY = cy + (actualSize * 0.4) * Math.sin(innerAngle);
    scaledPoints.push(`${innerX},${innerY}`);
  }

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isHidden ? 'help' : 'pointer' }}
    >
      <polygon
        points={scaledPoints.join(' ')}
        fill={isHidden ? '#D1D5DB' : '#F59E0B'}
        stroke={isHidden ? '#9CA3AF' : '#fff'}
        strokeWidth={2}
        opacity={isHidden ? 0.5 : 1}
        onClick={props.onClick}
        role="button"
        aria-label={`Intervention: ${interventionTitle}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            props.onClick?.();
          }
        }}
      />
      {isHidden && isHovered && (
        <title>Hidden: Toggle affected pollutants to view</title>
      )}
    </g>
  );
};

// Custom tooltip showing all pollutants with source citation
const CustomTooltip = ({ active, payload, city }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const source = city && city.primarySource ? dataSources[city.primarySource] : null;

  return (
    <div className="bg-white border border-gray-200 rounded shadow-lg p-3 max-w-xs">
      <div className="flex items-center justify-between mb-2 border-b pb-1">
        <p className="font-semibold text-sm">{data.year}</p>
        {data.isInterpolated && (
          <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
            Estimated
          </span>
        )}
      </div>
      <div className="space-y-1">
        {Object.keys(pollutantInfo).map((pollutant) => {
          if (data[pollutant] !== undefined) {
            const info = pollutantInfo[pollutant];
            return (
              <div key={pollutant} className="flex justify-between items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="font-medium">{info.name}:</span>
                </span>
                <span className="tabular-nums font-semibold">
                  {data[pollutant]} {info.unit}
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
      {data.isInterpolated && (
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t italic">
          Values interpolated for intervention year
        </p>
      )}
      {source && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Source: {source.shortName}
          </p>
        </div>
      )}
    </div>
  );
};

export default function PollutionChart({ city, onInterventionClick }) {
  const [activeTab, setActiveTab] = useState('graph');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [visiblePollutants, setVisiblePollutants] = useState(() => {
    // Default to showing all available pollutants for the city
    const availablePollutants = Object.keys(pollutantInfo).filter(
      p => city?.data[0]?.[p] !== undefined
    );
    return Object.fromEntries(availablePollutants.map(p => [p, true]));
  });

  // Get available pollutants for this city
  const availablePollutants = useMemo(() => {
    if (!city) return [];
    return Object.keys(pollutantInfo).filter(
      pollutant => city.data.some(d => d[pollutant] !== undefined)
    );
  }, [city]);

  const togglePollutant = (pollutant) => {
    setVisiblePollutants(prev => ({ ...prev, [pollutant]: !prev[pollutant] }));
  };

  if (!city) return null;

  // Calculate the domain for Y-axis based on visible pollutants
  const maxValue = useMemo(() => {
    let max = 0;
    city.data.forEach(dataPoint => {
      Object.keys(visiblePollutants).forEach(pollutant => {
        if (visiblePollutants[pollutant] && dataPoint[pollutant]) {
          max = Math.max(max, dataPoint[pollutant]);
        }
      });
    });
    return Math.ceil(max * 1.1); // Add 10% padding
  }, [city.data, visiblePollutants]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-3">
        <h2 className="text-base md:text-lg font-bold mb-1">
          {city.name}, {city.country}
        </h2>
        <p className="text-xs text-gray-600 line-clamp-2">
          {city.description}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-3 border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('graph')}
            className={cn(
              "px-3 md:px-4 py-2.5 md:py-2 text-sm font-medium border-b-2 transition-colors min-h-[44px] md:min-h-0",
              activeTab === 'graph'
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            Graph
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              "px-3 md:px-4 py-2.5 md:py-2 text-sm font-medium border-b-2 transition-colors min-h-[44px] md:min-h-0",
              activeTab === 'details'
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            Details
          </button>
        </div>
      </div>

      {/* Graph Tab */}
      {activeTab === 'graph' && (
        <>
          {/* Pollutant Toggles */}
          <div className="mb-3 p-2.5 md:p-3 bg-gray-50 rounded">
            <h3 className="text-xs font-semibold mb-2 text-gray-700">SELECT POLLUTANTS:</h3>
            <div className="flex flex-wrap gap-2">
              {availablePollutants.map((pollutant) => {
                const info = pollutantInfo[pollutant];
                const isVisible = visiblePollutants[pollutant];

                return (
                  <button
                    key={pollutant}
                    onClick={() => togglePollutant(pollutant)}
                    className={cn(
                      "px-3 py-2 rounded text-xs md:text-sm font-medium transition-all border min-h-[44px] md:min-h-0",
                      isVisible
                        ? "bg-white border-gray-900 shadow-sm"
                        : "bg-white border-gray-200 opacity-50 hover:opacity-75"
                    )}
                    aria-label={`${isVisible ? 'Hide' : 'Show'} ${info.name}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <div
                        className="size-2.5 md:size-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: info.color }}
                      />
                      <span>{info.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scientific Disclaimer - Causation vs Correlation */}
          <div className="mb-2 px-3 py-2 bg-amber-50 border border-amber-300 rounded text-xs">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <span className="font-semibold text-amber-900">Important: </span>
                <span className="text-amber-800">Air quality improvements result from multiple factors including economic conditions, weather patterns, technological advances, and various policies working together. Interventions marked on this chart are <strong>associated with</strong> changes in pollution levels, but causation is complex and multi-factorial. Stars indicate timing of policies, not definitive cause-and-effect. </span>
                <button
                  onClick={() => setShowAboutModal(true)}
                  className="text-amber-900 underline font-semibold hover:text-amber-700 transition-colors"
                >
                  Learn more about data limitations
                </button>
              </div>
            </div>
          </div>

          {/* Data Transparency Note */}
          <div className="mb-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded text-xs">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="font-semibold text-blue-900">Data Transparency: </span>
                <span className="text-blue-800">Dashed line segments indicate interpolated values estimated for intervention years where exact measurements were unavailable.</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded p-2 md:p-3 flex-1 min-h-0">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={city.data}
                  margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="year"
                stroke="#6b7280"
                style={{ fontSize: '10px' }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '10px' }}
                tickLine={false}
                domain={[0, maxValue]}
                label={{
                  value: 'Concentration',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '10px' }
                }}
              />
              <Tooltip content={<CustomTooltip city={city} />} />

              {/* Draw lines for each visible pollutant */}
              {availablePollutants.map((pollutant) => {
                if (!visiblePollutants[pollutant]) return null;

                const info = pollutantInfo[pollutant];

                return (
                  <Line
                    key={pollutant}
                    type="monotone"
                    dataKey={pollutant}
                    name={info.name}
                    stroke={info.color}
                    strokeWidth={2.5}
                    dot={(props) => {
                      // Show dots only for interpolated data points
                      const { cx, cy, payload } = props;
                      if (!payload.isInterpolated) return null;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4}
                          fill="white"
                          stroke={info.color}
                          strokeWidth={2}
                          opacity={0.9}
                        />
                      );
                    }}
                    activeDot={{ r: 5 }}
                  />
                );
              })}

              {/* Intervention markers */}
              {city.interventions.map((intervention, idx) => {
                const dataPoint = city.data.find(d => d.year === intervention.year);

                // If no data point for this exact year, try to find closest year within ±2 years
                let effectiveDataPoint = dataPoint;
                let effectiveYear = intervention.year;

                if (!dataPoint) {
                  // Look for closest data point within ±2 years
                  const nearby = city.data.filter(d =>
                    Math.abs(d.year - intervention.year) <= 2
                  );
                  if (nearby.length > 0) {
                    // Get closest year
                    effectiveDataPoint = nearby.reduce((prev, curr) =>
                      Math.abs(curr.year - intervention.year) < Math.abs(prev.year - intervention.year)
                        ? curr
                        : prev
                    );
                    effectiveYear = effectiveDataPoint.year;
                  }
                }

                if (!effectiveDataPoint) return null;

                // Determine target pollutant with better logic:
                // 1. First priority: affected pollutants that are currently visible
                // 2. Second priority: affected pollutants that exist in data (even if hidden)
                // 3. Fallback: any available pollutant with data
                const visibleAffectedPollutant = intervention.affectedPollutants?.find(
                  p => visiblePollutants[p] && effectiveDataPoint[p] !== undefined
                );

                const anyAffectedPollutant = intervention.affectedPollutants?.find(
                  p => effectiveDataPoint[p] !== undefined
                );

                const fallbackPollutant = availablePollutants.find(
                  p => effectiveDataPoint[p] !== undefined
                );

                const targetPollutant = visibleAffectedPollutant || anyAffectedPollutant || fallbackPollutant;

                if (!targetPollutant || !effectiveDataPoint[targetPollutant]) return null;

                // Determine if star should be shown as "hidden" (grayed out)
                // This happens when none of the affected pollutants are visible
                const isHidden = intervention.affectedPollutants &&
                  intervention.affectedPollutants.length > 0 &&
                  !intervention.affectedPollutants.some(p => visiblePollutants[p]);

                return (
                  <ReferenceDot
                    key={idx}
                    x={effectiveYear}
                    y={effectiveDataPoint[targetPollutant]}
                    shape={(props) => (
                      <StarShape
                        {...props}
                        size={10}
                        isHidden={isHidden}
                        interventionTitle={intervention.title}
                        onClick={() => onInterventionClick(intervention)}
                      />
                    )}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
        </>
      )}

      {/* Computation Details Tab */}
      {activeTab === 'details' && (
        <div className="flex-1 overflow-auto">
          <div className="space-y-4 md:space-y-6">
            {/* Data Sources Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4">
              <h3 className="text-sm font-bold mb-3 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Data Sources & Attribution
              </h3>

              {/* Primary Source */}
              {city.primarySource && dataSources[city.primarySource] && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-start gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900">Primary Data Source</p>
                      <p className="text-xs text-blue-800 mt-1">
                        {dataSources[city.primarySource].name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={dataSources[city.primarySource].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Website
                    </a>
                    {dataSources[city.primarySource].datasetUrl && (
                      <a
                        href={dataSources[city.primarySource].datasetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-blue-300 rounded text-xs text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                        Access Data
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* City-Specific Details */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-semibold text-gray-700">Data Period:</span>
                    <p className="text-gray-900">{city.dataPeriod}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Data Quality:</span>
                    <p className="text-gray-900 capitalize">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                        city.dataQuality === 'high' ? 'bg-green-100 text-green-800' :
                        city.dataQuality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {city.dataQuality}
                      </span>
                    </p>
                  </div>
                </div>

                {city.monitoringStations && city.monitoringStations.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Monitoring Stations:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {city.monitoringStations.map((station, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700">
                          {station}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {city.notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Notes:</span>
                    <p className="text-gray-600 mt-1 italic">{city.notes}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-700">Last Verified:</span>
                  <p className="text-gray-900">{city.lastVerified}</p>
                </div>

                <p className="text-gray-700 pt-2">
                  All measurements are annual averages expressed in µg/m³ (micrograms per cubic meter) for
                  particulate matter and gaseous pollutants, or mg/m³ (milligrams per cubic meter) for carbon monoxide.
                </p>
              </div>
            </div>

            {/* Interpolation Methodology */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
              <h3 className="text-sm font-bold mb-3 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Interpolation Methodology
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-gray-700">
                  Some data points are interpolated to provide estimated values for intervention years where
                  exact measurements were unavailable. These interpolated values are marked with the{' '}
                  <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium text-xs">
                    Estimated
                  </span>{' '}
                  badge and displayed with dashed line segments on the graph.
                </p>
                <p className="text-gray-700 font-semibold pt-2">Interpolation Method:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                  <li>Linear interpolation between nearest available data points</li>
                  <li>Used only for intervention years to align policy implementations with data visualization</li>
                  <li>Clearly marked with <code className="bg-gray-100 px-1 rounded">isInterpolated: true</code> flag in the data</li>
                  <li>Total interpolated points: {city.data.filter(d => d.isInterpolated).length} out of {city.data.length} data points</li>
                </ul>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4">
              <h3 className="text-sm font-bold mb-3 text-gray-900">Complete Data Values</h3>
              <div className="overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0">
                <table className="w-full text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Year</th>
                      {availablePollutants.map((pollutant) => {
                        const info = pollutantInfo[pollutant];
                        return (
                          <th key={pollutant} className="px-3 py-2 text-right font-semibold text-gray-700">
                            <div className="flex items-center justify-end gap-1.5">
                              <div
                                className="size-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: info.color }}
                              />
                              <span>{info.name}</span>
                              <span className="text-gray-500 font-normal">({info.unit})</span>
                            </div>
                          </th>
                        );
                      })}
                      <th className="px-3 py-2 text-center font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.data.map((dataPoint, idx) => {
                      const hasIntervention = city.interventions.some(i => i.year === dataPoint.year);
                      return (
                        <tr
                          key={idx}
                          className={cn(
                            "border-b border-gray-100",
                            dataPoint.isInterpolated ? "bg-amber-50" : "bg-white hover:bg-gray-50",
                            hasIntervention && "font-semibold"
                          )}
                        >
                          <td className="px-3 py-2 text-left">
                            <div className="flex items-center gap-2">
                              {dataPoint.year}
                              {hasIntervention && (
                                <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )}
                            </div>
                          </td>
                          {availablePollutants.map((pollutant) => (
                            <td key={pollutant} className="px-3 py-2 text-right tabular-nums">
                              {dataPoint[pollutant] !== undefined ? dataPoint[pollutant] : '—'}
                            </td>
                          ))}
                          <td className="px-3 py-2 text-center">
                            {dataPoint.isInterpolated ? (
                              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium text-xs">
                                Estimated
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">Measured</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Star icon indicates intervention year</span>
                </p>
                <p>
                  Highlighted rows indicate interpolated values
                </p>
              </div>
            </div>

            {/* Interventions Reference */}
            {city.interventions.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4">
                <h3 className="text-sm font-bold mb-3 text-gray-900">Policy Interventions Reference</h3>
                <div className="space-y-3">
                  {city.interventions.map((intervention, idx) => (
                    <div key={idx} className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold text-xs text-gray-900">
                            {intervention.year}: {intervention.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{intervention.description}</p>
                          <p className="text-xs text-gray-500 mt-1 italic">Impact: {intervention.impact}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {intervention.affectedPollutants?.map((pollutant) => {
                          const info = pollutantInfo[pollutant];
                          return (
                            <span
                              key={pollutant}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-gray-100"
                            >
                              <div
                                className="size-2 rounded-full"
                                style={{ backgroundColor: info.color }}
                              />
                              {info.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Data Modal */}
      <AboutDataModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </div>
  );
}
