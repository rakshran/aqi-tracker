import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { cn } from '../utils/cn';
import { pollutantInfo } from '../data/citiesData';

// Custom star shape for intervention markers
const StarShape = (props) => {
  const { cx, cy, size = 8 } = props;

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

  return (
    <polygon
      points={points.join(' ')}
      fill="#F59E0B"
      stroke="#fff"
      strokeWidth={2}
      style={{ cursor: 'pointer' }}
      onClick={props.onClick}
    />
  );
};

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
                    shape={(props) => (
                      <StarShape
                        {...props}
                        size={8}
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
