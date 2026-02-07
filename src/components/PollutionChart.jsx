import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { cn } from '../utils/cn';
import { pollutantInfo, dataSources } from '../data/citiesData';
import AboutDataModal from './AboutDataModal';

// Muted editorial color palette for pollutants
const editorialColors = {
  pm25: '#1A1A1A',
  pm10: '#6B6B6B',
  so2: '#8B3A7A',
  no2: '#3B5998',
  o3: '#7A9A6D',
  co: '#B87333',
};

// Diamond marker for intervention points (replacing star)
const DiamondShape = (props) => {
  const { cx, cy, size = 8, isHidden = false, interventionTitle = '' } = props;
  const [isHovered, setIsHovered] = React.useState(false);

  const actualSize = isHovered ? size * 1.3 : size;

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isHidden ? 'help' : 'pointer' }}
    >
      <rect
        x={cx - actualSize}
        y={cy - actualSize}
        width={actualSize * 2}
        height={actualSize * 2}
        transform={`rotate(45 ${cx} ${cy})`}
        fill={isHidden ? '#D1D5DB' : '#F2C94C'}
        stroke={isHidden ? '#9CA3AF' : '#1A1A1A'}
        strokeWidth={1.5}
        opacity={isHidden ? 0.4 : 1}
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

// Editorial tooltip — sharp, minimal, no rounded corners
const CustomTooltip = ({ active, payload, city }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const source = city && city.primarySource ? dataSources[city.primarySource] : null;

  return (
    <div className="bg-canvas border border-ink p-3 max-w-xs font-sans" style={{ boxShadow: 'none' }}>
      <div className="flex items-center justify-between mb-2 border-b border-grid pb-1.5">
        <p className="font-serif font-bold text-sm text-ink">{data.year}</p>
        {data.isInterpolated && (
          <span className="text-xs font-sans uppercase tracking-widest text-ink/50 ml-2">
            Est.
          </span>
        )}
      </div>
      <div className="space-y-1">
        {Object.keys(pollutantInfo).map((pollutant) => {
          if (data[pollutant] !== undefined) {
            const info = pollutantInfo[pollutant];
            const color = editorialColors[pollutant] || info.color;
            return (
              <div key={pollutant} className="flex justify-between items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-0.5 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-ink/70">{info.name}</span>
                </span>
                <span className="tabular-nums font-medium text-ink">
                  {data[pollutant]} <span className="text-ink/40">{info.unit}</span>
                </span>
              </div>
            );
          }
          return null;
        })}
      </div>
      {data.isInterpolated && (
        <p className="text-xs text-ink/40 mt-2 pt-2 border-t border-grid italic font-serif">
          Values interpolated for intervention year
        </p>
      )}
      {source && (
        <div className="mt-2 pt-2 border-t border-grid">
          <p className="text-xs text-ink/40 font-sans">
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
    const availablePollutants = Object.keys(pollutantInfo).filter(
      p => city?.data?.some(dataPoint => dataPoint[p] !== undefined)
    );
    return Object.fromEntries(availablePollutants.map(p => [p, true]));
  });

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

  const maxValue = useMemo(() => {
    let max = 0;
    city.data.forEach(dataPoint => {
      Object.keys(visiblePollutants).forEach(pollutant => {
        if (visiblePollutants[pollutant] && dataPoint[pollutant]) {
          max = Math.max(max, dataPoint[pollutant]);
        }
      });
    });
    return Math.ceil(max * 1.1);
  }, [city.data, visiblePollutants]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* City headline */}
      <div className="mb-4">
        <h2 className="font-serif text-xl md:text-2xl font-bold tracking-editorial text-ink">
          {city.name}, {city.country}
        </h2>
        <p className="text-xs font-sans text-ink/50 mt-1 leading-relaxed line-clamp-2">
          {city.description}
        </p>
      </div>

      {/* Tab Navigation — editorial underline style */}
      <div className="mb-4 border-b border-grid">
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab('graph')}
            className={cn(
              "px-4 py-2 font-sans text-xs uppercase tracking-widest border-b-2 transition-colors min-h-[44px] md:min-h-0",
              activeTab === 'graph'
                ? "border-ink text-ink"
                : "border-transparent text-ink/40 hover:text-ink/70"
            )}
          >
            Graph
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              "px-4 py-2 font-sans text-xs uppercase tracking-widest border-b-2 transition-colors min-h-[44px] md:min-h-0",
              activeTab === 'details'
                ? "border-ink text-ink"
                : "border-transparent text-ink/40 hover:text-ink/70"
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
          <div className="mb-3 py-3 border-b border-grid">
            <h3 className="text-xs font-sans uppercase tracking-widest text-ink/40 mb-2">Pollutants</h3>
            <div className="flex flex-wrap gap-2">
              {availablePollutants.map((pollutant) => {
                const info = pollutantInfo[pollutant];
                const isVisible = visiblePollutants[pollutant];
                const color = editorialColors[pollutant] || info.color;

                return (
                  <button
                    key={pollutant}
                    onClick={() => togglePollutant(pollutant)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-sans transition-all border rounded-full min-h-[44px] md:min-h-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40",
                      isVisible
                        ? "text-canvas shadow-sm"
                        : "bg-transparent opacity-70 hover:opacity-100"
                    )}
                    style={
                      isVisible
                        ? { backgroundColor: color, borderColor: color }
                        : { borderColor: color, color }
                    }
                    aria-label={`${isVisible ? 'Hide' : 'Show'} ${info.name}`}
                    aria-pressed={isVisible}
                  >
                    {info.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimers — editorial style */}
          <div className="mb-3 py-2 border-b border-grid">
            <p className="text-xs font-sans text-ink/40 leading-relaxed">
              <span className="font-semibold text-ink/60">Note:</span>{' '}
              Air quality changes result from multiple factors. Stars indicate policy timing, not definitive cause-and-effect.{' '}
              <button
                onClick={() => setShowAboutModal(true)}
                className="text-ink/60 underline hover:text-ink transition-colors"
              >
                Data limitations
              </button>
              {' · '}
              <span className="italic">Dashed segments = interpolated values.</span>
            </p>
          </div>

          {/* Chart Container — no background, directly on grid */}
          <div className="flex-1 min-h-0">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={city.data}
                  margin={{ top: 10, right: 10, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    horizontal={true}
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#E5E5E5"
                  />
                  <XAxis
                    dataKey="year"
                    stroke="#1A1A1A"
                    style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif' }}
                    tickLine={false}
                    axisLine={{ stroke: '#1A1A1A', strokeWidth: 1 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    stroke="#1A1A1A"
                    style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif' }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, maxValue]}
                    label={{
                      value: 'Concentration',
                      angle: -90,
                      position: 'insideLeft',
                      style: {
                        fontSize: '9px',
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fill: '#1A1A1A',
                        opacity: 0.4,
                      }
                    }}
                  />
                  <Tooltip
                    content={<CustomTooltip city={city} />}
                    cursor={{ stroke: '#F2C94C', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />

                  {/* Data lines */}
                  {availablePollutants.map((pollutant) => {
                    if (!visiblePollutants[pollutant]) return null;

                    const info = pollutantInfo[pollutant];
                    const color = editorialColors[pollutant] || info.color;

                    return (
                      <Line
                        key={pollutant}
                        type="monotone"
                        dataKey={pollutant}
                        name={info.name}
                        stroke={color}
                        strokeWidth={1.5}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (!payload.isInterpolated) return null;
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={3}
                              fill="#FDFBF7"
                              stroke={color}
                              strokeWidth={1.5}
                              opacity={0.9}
                            />
                          );
                        }}
                        activeDot={{ r: 4, fill: '#F2C94C', stroke: '#1A1A1A', strokeWidth: 1 }}
                      />
                    );
                  })}

                  {/* Intervention markers */}
                  {city.interventions.map((intervention, idx) => {
                    const dataPoint = city.data.find(d => d.year === intervention.year);

                    let effectiveDataPoint = dataPoint;
                    let effectiveYear = intervention.year;

                    if (!dataPoint) {
                      const nearby = city.data.filter(d =>
                        Math.abs(d.year - intervention.year) <= 2
                      );
                      if (nearby.length > 0) {
                        effectiveDataPoint = nearby.reduce((prev, curr) =>
                          Math.abs(curr.year - intervention.year) < Math.abs(prev.year - intervention.year)
                            ? curr
                            : prev
                        );
                        effectiveYear = effectiveDataPoint.year;
                      }
                    }

                    if (!effectiveDataPoint) return null;

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

                    const isHidden = intervention.affectedPollutants &&
                      intervention.affectedPollutants.length > 0 &&
                      !intervention.affectedPollutants.some(p => visiblePollutants[p]);

                    return (
                      <ReferenceDot
                        key={idx}
                        x={effectiveYear}
                        y={effectiveDataPoint[targetPollutant]}
                        shape={(props) => (
                          <DiamondShape
                            {...props}
                            size={7}
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

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* Data Sources Section */}
            <div className="border-b border-grid pb-6">
              <h3 className="font-serif text-lg font-bold mb-3 text-ink">
                Data Sources & Attribution
              </h3>

              {/* Primary Source */}
              {city.primarySource && dataSources[city.primarySource] && (
                <div className="mb-4 py-3 border-t border-b border-grid">
                  <p className="text-xs font-sans uppercase tracking-widest text-ink/40 mb-1">Primary Data Source</p>
                  <p className="text-sm font-serif text-ink">
                    {dataSources[city.primarySource].name}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={dataSources[city.primarySource].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 border border-ink text-xs font-sans text-ink hover:bg-ink hover:text-canvas transition-colors"
                    >
                      Visit Website
                    </a>
                    {dataSources[city.primarySource].datasetUrl && (
                      <a
                        href={dataSources[city.primarySource].datasetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 border border-ink text-xs font-sans text-ink hover:bg-ink hover:text-canvas transition-colors"
                      >
                        Access Data
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* City-Specific Details */}
              <div className="space-y-3 text-xs font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="uppercase tracking-widest text-ink/40 text-xs">Data Period</span>
                    <p className="text-ink mt-0.5">{city.dataPeriod}</p>
                  </div>
                  <div>
                    <span className="uppercase tracking-widest text-ink/40 text-xs">Data Quality</span>
                    <p className="text-ink mt-0.5 capitalize">
                      <span className={cn(
                        "inline-block px-2 py-0.5 text-xs border",
                        city.dataQuality === 'high' ? 'border-severity-good text-severity-good' :
                        city.dataQuality === 'medium' ? 'border-severity-moderate text-severity-moderate' :
                        'border-severity-hazardous text-severity-hazardous'
                      )}>
                        {city.dataQuality}
                      </span>
                    </p>
                  </div>
                </div>

                {city.monitoringStations && city.monitoringStations.length > 0 && (
                  <div>
                    <span className="uppercase tracking-widest text-ink/40 text-xs">Monitoring Stations</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {city.monitoringStations.map((station, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 border border-grid text-xs text-ink/70">
                          {station}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {city.notes && (
                  <div className="pt-3 border-t border-grid">
                    <span className="uppercase tracking-widest text-ink/40 text-xs">Notes</span>
                    <p className="text-ink/60 mt-1 italic font-serif">{city.notes}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-grid">
                  <span className="uppercase tracking-widest text-ink/40 text-xs">Last Verified</span>
                  <p className="text-ink mt-0.5">{city.lastVerified}</p>
                </div>

                <p className="text-ink/50 pt-3 border-t border-grid">
                  All measurements are annual averages expressed in µg/m³ (micrograms per cubic meter) for
                  particulate matter and gaseous pollutants, or mg/m³ (milligrams per cubic meter) for carbon monoxide.
                </p>
              </div>
            </div>

            {/* Interpolation Methodology */}
            <div className="border-b border-grid pb-6">
              <h3 className="font-serif text-lg font-bold mb-3 text-ink">
                Interpolation Methodology
              </h3>
              <div className="space-y-2 text-xs font-sans">
                <p className="text-ink/60">
                  Some data points are interpolated to provide estimated values for intervention years where
                  exact measurements were unavailable. These interpolated values are marked with the{' '}
                  <span className="font-semibold text-ink/70 uppercase tracking-widest">Est.</span>{' '}
                  indicator and displayed with dashed line segments on the graph.
                </p>
                <p className="text-ink/70 font-semibold pt-2">Interpolation Method:</p>
                <ul className="list-disc list-inside space-y-1 text-ink/50 ml-2">
                  <li>Linear interpolation between nearest available data points</li>
                  <li>Used only for intervention years to align policy implementations with data visualization</li>
                  <li>Clearly marked with <code className="px-1 border border-grid text-ink/70">isInterpolated: true</code> flag in the data</li>
                  <li>Total interpolated points: {city.data.filter(d => d.isInterpolated).length} out of {city.data.length} data points</li>
                </ul>
              </div>
            </div>

            {/* Data Table */}
            <div className="border-b border-grid pb-6">
              <h3 className="font-serif text-lg font-bold mb-3 text-ink">Complete Data Values</h3>
              <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                <table className="w-full text-xs font-sans border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="px-3 py-2 text-left font-sans uppercase tracking-widest text-ink/50 text-xs">Year</th>
                      {availablePollutants.map((pollutant) => {
                        const info = pollutantInfo[pollutant];
                        const color = editorialColors[pollutant] || info.color;
                        return (
                          <th key={pollutant} className="px-3 py-2 text-right font-sans uppercase tracking-widest text-ink/50 text-xs">
                            <div className="flex items-center justify-end gap-1.5">
                              <div
                                className="w-3 h-0.5 flex-shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              <span>{info.name}</span>
                            </div>
                          </th>
                        );
                      })}
                      <th className="px-3 py-2 text-center font-sans uppercase tracking-widest text-ink/50 text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {city.data.map((dataPoint, idx) => {
                      const hasIntervention = city.interventions.some(i => i.year === dataPoint.year);
                      return (
                        <tr
                          key={idx}
                          className={cn(
                            "border-b border-grid transition-colors",
                            dataPoint.isInterpolated ? "bg-accent/5" : "hover:bg-accent/10",
                            hasIntervention && "font-semibold"
                          )}
                        >
                          <td className="px-3 py-2 text-left tabular-nums">
                            <div className="flex items-center gap-2">
                              {dataPoint.year}
                              {hasIntervention && (
                                <span className="w-2 h-2 bg-accent border border-ink/20 rotate-45 inline-block" />
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
                              <span className="text-xs font-sans uppercase tracking-widest text-ink/40">
                                Est.
                              </span>
                            ) : (
                              <span className="text-ink/30 text-xs">Measured</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 pt-3 border-t border-grid text-xs text-ink/40 font-sans space-y-1">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent border border-ink/20 rotate-45 inline-block" />
                  <span>Diamond indicates intervention year</span>
                </p>
                <p>
                  Highlighted rows indicate interpolated values
                </p>
              </div>
            </div>

            {/* Interventions Reference */}
            {city.interventions.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-bold mb-3 text-ink">Policy Interventions Reference</h3>
                <div className="divide-y divide-grid">
                  {city.interventions.map((intervention, idx) => (
                    <div key={idx} className="py-3">
                      <div className="flex items-start gap-3">
                        <span className="font-sans tabular-nums text-xs text-ink/40 pt-0.5 w-10 flex-shrink-0">
                          {intervention.year}
                        </span>
                        <div className="flex-1">
                          <p className="font-serif font-semibold text-sm text-ink">
                            {intervention.title}
                          </p>
                          <p className="text-xs font-sans text-ink/50 mt-1">{intervention.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 ml-[52px]">
                        {intervention.affectedPollutants?.map((pollutant) => {
                          const info = pollutantInfo[pollutant];
                          const color = editorialColors[pollutant] || info.color;
                          return (
                            <span
                              key={pollutant}
                              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-sans border border-grid"
                            >
                              <div
                                className="w-2 h-0.5"
                                style={{ backgroundColor: color }}
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
