export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <select
      value={selectedCity?.id || ''}
      onChange={(e) => {
        const city = cities.find(c => c.id === e.target.value);
        if (city) onSelectCity(city);
      }}
      className="w-full px-3 md:px-4 py-3 md:py-2 border-2 border-gray-300 rounded-lg bg-white text-sm md:text-base font-medium focus:outline-none focus:border-gray-900 transition-all min-h-[44px] md:min-h-0 appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem'
      }}
    >
      <option value="" disabled>Select a city...</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}
