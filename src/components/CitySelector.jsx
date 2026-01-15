export default function CitySelector({ cities, selectedCity, onSelectCity }) {
  return (
    <select
      value={selectedCity?.id || ''}
      onChange={(e) => {
        const city = cities.find(c => c.id === e.target.value);
        if (city) onSelectCity(city);
      }}
      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:border-gray-900 transition-all"
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
