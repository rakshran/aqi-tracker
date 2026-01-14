import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

// Custom tooltip showing all pollutants
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 rounded shadow-lg p-3 max-w-xs">
      <p className="font-semibold text-sm mb-2 border-b pb-1">{data.year}</p>
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
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-balance">
          {city.name}, {city.country}
        </h2>
        <p className="text-gray-600 text-pretty max-w-3xl">
          {city.description}
        </p>
      </div>

      {/* Pollutant Toggles */}
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="text-sm font-semibold mb-3">Select Pollutants to Display:</h3>
        <div className="flex flex-wrap gap-2">
          {availablePollutants.map((pollutant) => {
            const info = pollutantInfo[pollutant];
            const isVisible = visiblePollutants[pollutant];

            return (
              <button
                key={pollutant}
                onClick={() => togglePollutant(pollutant)}
                className={cn(
                  "px-3 py-1.5 rounded text-sm font-medium transition-all border-2",
                  isVisible
                    ? "bg-white border-gray-900 shadow-sm"
                    : "bg-white border-gray-200 opacity-50 hover:opacity-75"
                )}
                aria-label={`${isVisible ? 'Hide' : 'Show'} ${info.name}`}
              >
                <span className="flex items-center gap-1.5">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span>{info.name}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Click to toggle pollutants. Intervention markers show when policies were implemented.
        </p>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={city.data}
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="year"
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                tickLine={false}
                domain={[0, maxValue]}
                label={{
                  value: 'Concentration',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '14px' }
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
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                );
              })}

              {/* Intervention markers */}
              {city.interventions.map((intervention, idx) => {
                const dataPoint = city.data.find(d => d.year === intervention.year);
                if (!dataPoint) return null;

                // Use the first affected pollutant that's visible, or first available
                const targetPollutant = intervention.affectedPollutants?.find(
                  p => visiblePollutants[p] && dataPoint[p] !== undefined
                ) || availablePollutants.find(p => dataPoint[p] !== undefined);

                if (!targetPollutant || !dataPoint[targetPollutant]) return null;

                return (
                  <ReferenceDot
                    key={idx}
                    x={intervention.year}
                    y={dataPoint[targetPollutant]}
                    r={6}
                    fill="#D73847"
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onInterventionClick(intervention)}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend - Pollutant Info */}
      <div className="mt-4 p-4 bg-white border border-gray-200 rounded">
        <h3 className="text-sm font-semibold mb-3">Pollutant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {availablePollutants.map((pollutant) => {
            const info = pollutantInfo[pollutant];
            const latestValue = city.data[city.data.length - 1][pollutant];
            const earliestValue = city.data.find(d => d[pollutant] !== undefined)?.[pollutant];
            const improvement = earliestValue && latestValue
              ? ((earliestValue - latestValue) / earliestValue * 100).toFixed(0)
              : null;

            return (
              <div
                key={pollutant}
                className={cn(
                  "p-2 rounded border",
                  visiblePollutants[pollutant]
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50 opacity-60"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: info.color }}
                  />
                  <span className="font-semibold">{info.name}</span>
                </div>
                <p className="text-gray-600 mb-1">{info.description}</p>
                {latestValue !== undefined && (
                  <div className="space-y-0.5">
                    <p className="tabular-nums">
                      Latest: <span className="font-semibold">{latestValue} {info.unit}</span>
                    </p>
                    {improvement && improvement > 0 && (
                      <p className="text-green-700 font-medium">
                        ↓ {improvement}% improvement
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
