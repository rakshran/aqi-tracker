import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

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

// Custom tooltip showing all pollutants
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

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
    </div>
  );
};

export default function PollutionChart({ city, onInterventionClick }) {
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
        <h2 className="text-lg font-bold mb-1">
          {city.name}, {city.country}
        </h2>
        <p className="text-xs text-gray-600 line-clamp-2">
          {city.description}
        </p>
      </div>

      {/* Pollutant Toggles */}
      <div className="mb-3 p-3 bg-gray-50 rounded">
        <h3 className="text-xs font-semibold mb-2 text-gray-700">SELECT POLLUTANTS:</h3>
        <div className="flex flex-wrap gap-1.5">
          {availablePollutants.map((pollutant) => {
            const info = pollutantInfo[pollutant];
            const isVisible = visiblePollutants[pollutant];

            return (
              <button
                key={pollutant}
                onClick={() => togglePollutant(pollutant)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all border",
                  isVisible
                    ? "bg-white border-gray-900 shadow-sm"
                    : "bg-white border-gray-200 opacity-50 hover:opacity-75"
                )}
                aria-label={`${isVisible ? 'Hide' : 'Show'} ${info.name}`}
              >
                <span className="flex items-center gap-1">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span>{info.name}</span>
                </span>
              </button>
            );
          })}
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

      <div className="bg-gray-50 rounded p-3 flex-1 min-h-0">
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={city.data}
              margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="year"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickLine={false}
                domain={[0, maxValue]}
                label={{
                  value: 'Concentration',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />

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
    </div>
  );
}
