import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import { cn } from '../utils/cn';
import { getAQICategory } from '../data/citiesData';

// Custom dot component for intervention markers
const InterventionDot = ({ cx, cy, payload, interventions, onInterventionClick }) => {
  const intervention = interventions.find(i => i.year === payload.year);
  if (!intervention) return null;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#D73847"
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onClick={() => onInterventionClick(intervention)}
      />
    </g>
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const category = getAQICategory(data.aqi);

  return (
    <div className="bg-white border border-gray-200 rounded shadow-lg p-3">
      <p className="font-semibold text-sm mb-1">{data.year}</p>
      <p className="text-sm">
        <span className="font-medium">AQI:</span> {data.aqi}
      </p>
      <p className={cn("text-xs font-medium mt-1", category.textColor)}>
        {category.label}
      </p>
    </div>
  );
};

export default function PollutionChart({ city, onInterventionClick }) {
  const [hoveredYear, setHoveredYear] = useState(null);

  if (!city) return null;

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

      <div className="bg-gray-50 rounded p-4 mb-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={city.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
                label={{ value: 'AQI (PM2.5)', angle: -90, position: 'insideLeft', style: { fontSize: '14px' } }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Reference lines for AQI categories */}
              <ReferenceLine y={50} stroke="#6BAB3E" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={100} stroke="#F6B900" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={150} stroke="#E56E5A" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={200} stroke="#D73847" strokeDasharray="3 3" strokeOpacity={0.3} />

              <Line
                type="monotone"
                dataKey="aqi"
                stroke="#3B5998"
                strokeWidth={3}
                dot={(props) => (
                  <InterventionDot
                    {...props}
                    interventions={city.interventions}
                    onInterventionClick={onInterventionClick}
                  />
                )}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#3B5998]" />
          <span>AQI Trend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#D73847] border-2 border-white" />
          <span>Key Intervention</span>
        </div>
      </div>

      {/* AQI Category Reference */}
      <div className="mt-6 p-4 bg-white border border-gray-200 rounded">
        <h3 className="text-sm font-semibold mb-3">AQI Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#6BAB3E' }} />
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#F6B900' }} />
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#E56E5A' }} />
            <span>Unhealthy for Sensitive (101-150)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#D73847' }} />
            <span>Unhealthy (151-200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#8B3A7A' }} />
            <span>Very Unhealthy (201-300)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded" style={{ backgroundColor: '#7E0023' }} />
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
