import { cn } from '../utils/cn';

export default function CitySelector({
  cities,
  selectedCity,
  onSelectCity,
  className = '',
  ariaLabel = 'Select city',
}) {
  return (
    <div className="relative inline-flex items-center">
      {/* Visual display — styled to match heading */}
      <span
        className={cn(
          'px-1 py-2 border-b border-ink text-base md:text-lg font-serif font-medium text-ink min-h-[44px] md:min-h-0 flex items-center',
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%231A1A1A' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0 center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
          paddingRight: '2rem'
        }}
        aria-hidden="true"
      >
        {selectedCity?.name || 'Select a city...'}
      </span>

      {/* Invisible native select — 16px so dropdown renders at default size */}
      <select
        value={selectedCity?.id || ''}
        onChange={(e) => {
          const city = cities.find(c => c.id === e.target.value);
          if (city) onSelectCity(city);
        }}
        aria-label={ariaLabel}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ fontSize: '16px' }}
      >
        <option value="" disabled>Select a city...</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
