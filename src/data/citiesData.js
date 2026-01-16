// Historical air quality data and interventions for major cities
// Multiple pollutant measurements (PM2.5, PM10, SO2, NO2, O3, CO) in µg/m³ or ppm

export const pollutantInfo = {
  pm25: {
    name: 'PM2.5',
    unit: 'µg/m³',
    color: '#D73847',
    description: 'Fine particulate matter (≤2.5μm)',
  },
  pm10: {
    name: 'PM10',
    unit: 'µg/m³',
    color: '#E56E5A',
    description: 'Coarse particulate matter (≤10μm)',
  },
  so2: {
    name: 'SO₂',
    unit: 'µg/m³',
    color: '#8B3A7A',
    description: 'Sulfur dioxide',
  },
  no2: {
    name: 'NO₂',
    unit: 'µg/m³',
    color: '#3B5998',
    description: 'Nitrogen dioxide',
  },
  o3: {
    name: 'O₃',
    unit: 'µg/m³',
    color: '#6BAB3E',
    description: 'Ozone',
  },
  co: {
    name: 'CO',
    unit: 'mg/m³',
    color: '#F6B900',
    description: 'Carbon monoxide',
  },
};

export const citiesData = [
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    description: 'Once known for severe smog, LA transformed through decades of strict regulations and technological innovation.',
    data: [
      { year: 1955, pm10: 185, so2: 145, no2: 98, o3: 142, co: 12.5 },
      { year: 1960, pm10: 178, so2: 138, no2: 95, o3: 138, co: 11.8 },
      { year: 1965, pm10: 172, so2: 132, no2: 92, o3: 135, co: 11.2 },
      { year: 1970, pm10: 165, so2: 125, no2: 88, o3: 132, co: 10.8 },
      { year: 1975, pm10: 142, so2: 98, no2: 72, o3: 125, co: 8.5 },
      { year: 1980, pm10: 125, so2: 75, no2: 62, o3: 118, co: 6.8 },
      { year: 1985, pm10: 108, so2: 58, no2: 55, o3: 112, co: 5.2 },
      { year: 1990, pm10: 95, so2: 45, no2: 48, o3: 105, co: 4.5 },
      { year: 1995, pm10: 82, pm25: 38, so2: 35, no2: 42, o3: 98, co: 3.8 },
      { year: 2000, pm10: 72, pm25: 32, so2: 28, no2: 38, o3: 92, co: 3.2 },
      { year: 2005, pm10: 62, pm25: 26, so2: 22, no2: 32, o3: 85, co: 2.5 },
      { year: 2006, pm10: 60, pm25: 25, so2: 21.2, no2: 31.2, o3: 83.6, co: 2.4, isInterpolated: true }, // Interpolated for Port Clean Air Action Plan
      { year: 2010, pm10: 52, pm25: 21, so2: 18, no2: 28, o3: 78, co: 2.0 },
      { year: 2015, pm10: 45, pm25: 17, so2: 14, no2: 24, o3: 72, co: 1.5 },
      { year: 2020, pm10: 38, pm25: 13, so2: 10, no2: 20, o3: 68, co: 1.2 },
      { year: 2023, pm10: 35, pm25: 12, so2: 8, no2: 18, o3: 65, co: 1.0 },
    ],
    interventions: [
      {
        year: 1970,
        title: 'Clean Air Act',
        titleUrl: 'https://www.epa.gov/clean-air-act-overview/evolution-clean-air-act',
        description: 'Federal legislation establishing national air quality standards and requiring states to develop implementation plans.',
        impact: 'Major regulatory framework',
        affectedPollutants: ['pm10', 'so2', 'no2', 'co'],
      },
      {
        year: 1975,
        title: 'Catalytic Converters Mandated',
        titleUrl: 'https://www.sciencehistory.org/stories/magazine/clean-machine/',
        description: 'New cars required to have catalytic converters, dramatically reducing tailpipe emissions of NOx, CO, and hydrocarbons.',
        impact: 'Reduced vehicle emissions by 75%',
        affectedPollutants: ['no2', 'co', 'o3'],
      },
      {
        year: 1990,
        title: 'Reformulated Gasoline Program',
        titleUrl: 'https://www.epa.gov/gasoline-standards/reformulated-gasoline',
        description: 'Introduction of cleaner-burning gasoline with reduced volatile organic compounds.',
        impact: 'Cut smog-forming emissions by 15%',
        affectedPollutants: ['o3', 'no2'],
      },
      {
        year: 2006,
        title: 'Port Clean Air Action Plan',
        titleUrl: 'https://cleanairactionplan.org/about-the-plan/',
        description: 'Regulations targeting diesel emissions from ships, trucks, and cargo-handling equipment at LA ports.',
        impact: 'Reduced port-related emissions by 87%',
        affectedPollutants: ['pm25', 'pm10', 'no2', 'so2'],
      },
    ],
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    description: 'Beijing implemented aggressive measures to combat severe air pollution, showing dramatic improvements in recent years.',
    data: [
      { year: 1998, pm10: 152, so2: 98, no2: 68, co: 3.2 },
      { year: 2000, pm10: 165, so2: 105, no2: 72, co: 3.5 },
      { year: 2002, pm10: 178, so2: 115, no2: 78, co: 3.8 },
      { year: 2004, pm10: 192, so2: 125, no2: 85, co: 4.2 },
      { year: 2006, pm10: 205, so2: 135, no2: 92, co: 4.5 },
      { year: 2008, pm10: 175, so2: 115, no2: 82, co: 3.8 },
      { year: 2010, pm10: 198, pm25: 102, so2: 125, no2: 88, o3: 95, co: 4.2 },
      { year: 2012, pm10: 212, pm25: 108, so2: 132, no2: 95, o3: 98, co: 4.5 },
      { year: 2013, pm10: 225, pm25: 115, so2: 138, no2: 102, o3: 102, co: 4.8 },
      { year: 2014, pm10: 195, pm25: 98, so2: 118, no2: 92, o3: 95, co: 4.2 },
      { year: 2015, pm10: 172, pm25: 85, so2: 95, no2: 82, o3: 88, co: 3.5 },
      { year: 2016, pm10: 148, pm25: 72, so2: 75, no2: 72, o3: 82, co: 2.8 },
      { year: 2017, pm10: 125, pm25: 58, so2: 58, no2: 62, o3: 78, co: 2.2 },
      { year: 2018, pm10: 108, pm25: 50, so2: 48, no2: 55, o3: 75, co: 1.8 },
      { year: 2019, pm10: 92, pm25: 42, so2: 38, no2: 48, o3: 72, co: 1.5 },
      { year: 2020, pm10: 78, pm25: 38, so2: 28, no2: 42, o3: 68, co: 1.2 },
      { year: 2021, pm10: 68, pm25: 33, so2: 22, no2: 38, o3: 65, co: 1.0 },
      { year: 2022, pm10: 58, pm25: 30, so2: 18, no2: 35, o3: 62, co: 0.9 },
      { year: 2023, pm10: 52, pm25: 28, so2: 15, no2: 32, o3: 60, co: 0.8 },
    ],
    interventions: [
      {
        year: 2008,
        title: 'Olympic Games Cleanup',
        titleUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10131504/',
        description: 'Temporary factory closures, vehicle restrictions, and industrial relocations for Beijing Olympics.',
        impact: 'Short-term AQI reduction of 30%',
        affectedPollutants: ['pm10', 'so2', 'no2'],
      },
      {
        year: 2013,
        title: 'Air Pollution Action Plan',
        titleUrl: 'https://aqli.epic.uchicago.edu/post/china-national-air-quality-action-plan-2013',
        description: 'Comprehensive 5-year plan targeting coal use, vehicle emissions, and industrial pollution with $270B investment.',
        impact: 'Set aggressive PM2.5 reduction targets',
        affectedPollutants: ['pm25', 'pm10', 'so2', 'no2', 'co'],
      },
      {
        year: 2017,
        title: 'Coal-Fired Heating Ban',
        titleUrl: 'https://www.nature.com/articles/s41560-019-0386-2',
        description: 'Banned coal heating in urban areas, switching 2.5M households to electric or gas heating.',
        impact: 'Reduced winter PM2.5 by 25%',
        affectedPollutants: ['pm25', 'pm10', 'so2', 'co'],
      },
      {
        year: 2020,
        title: 'Strictest Vehicle Emission Standards',
        titleUrl: 'https://www.transportpolicy.net/standard/china-light-duty-emissions/',
        description: 'Implemented China 6b emission standards, equivalent to Euro 6, for new vehicles.',
        impact: 'Cut new vehicle emissions by 50%',
        affectedPollutants: ['no2', 'pm25', 'co'],
      },
    ],
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    description: 'After the deadly Great Smog of 1952, London pioneered clean air legislation that transformed the city.',
    data: [
      { year: 1952, pm10: 285, so2: 325, no2: 85, co: 15.2 },
      { year: 1955, pm10: 215, so2: 245, no2: 78, co: 11.5 },
      { year: 1956, pm10: 205.6, so2: 233, no2: 76.8, co: 11, isInterpolated: true }, // Interpolated for Clean Air Act
      { year: 1960, pm10: 168, so2: 185, no2: 72, co: 8.8 },
      { year: 1965, pm10: 142, so2: 148, no2: 68, co: 7.2 },
      { year: 1968, pm10: 127.6, so2: 126.4, no2: 64.4, co: 6.4, isInterpolated: true }, // Interpolated for Clean Air Act Extension
      { year: 1970, pm10: 118, so2: 112, no2: 62, co: 5.8 },
      { year: 1975, pm10: 98, so2: 85, no2: 58, co: 4.5 },
      { year: 1980, pm10: 82, so2: 65, no2: 52, co: 3.8 },
      { year: 1985, pm10: 72, so2: 52, no2: 48, co: 3.2 },
      { year: 1990, pm10: 62, so2: 42, no2: 45, co: 2.8 },
      { year: 1995, pm10: 55, pm25: 28, so2: 35, no2: 42, o3: 52, co: 2.2 },
      { year: 2000, pm10: 48, pm25: 24, so2: 28, no2: 38, o3: 48, co: 1.8 },
      { year: 2003, pm10: 44.4, pm25: 21.6, so2: 24.4, no2: 36.2, o3: 46.2, co: 1.6, isInterpolated: true }, // Interpolated for Congestion Charge
      { year: 2005, pm10: 42, pm25: 20, so2: 22, no2: 35, o3: 45, co: 1.5 },
      { year: 2010, pm10: 38, pm25: 17, so2: 18, no2: 32, o3: 42, co: 1.2 },
      { year: 2015, pm10: 32, pm25: 14, so2: 14, no2: 28, o3: 38, co: 1.0 },
      { year: 2019, pm10: 28.8, pm25: 11.6, so2: 10.8, no2: 23.2, o3: 35.6, co: 0.8, isInterpolated: true }, // Interpolated for Ultra Low Emission Zone (ULEZ)
      { year: 2020, pm10: 28, pm25: 11, so2: 10, no2: 22, o3: 35, co: 0.8 },
      { year: 2023, pm10: 24, pm25: 9, so2: 8, no2: 18, o3: 32, co: 0.7 },
    ],
    interventions: [
      {
        year: 1956,
        title: 'Clean Air Act',
        titleUrl: 'https://en.wikipedia.org/wiki/Clean_Air_Act_1956',
        description: 'World\'s first major clean air legislation, creating "smoke control areas" where only smokeless fuels could be burned.',
        impact: 'Eliminated deadly coal smog',
        affectedPollutants: ['pm10', 'so2', 'co'],
      },
      {
        year: 1968,
        title: 'Clean Air Act Extension',
        titleUrl: 'https://www.britannica.com/topic/Clean-Air-Acts',
        description: 'Expanded smoke control areas and strengthened enforcement, covering most urban areas.',
        impact: 'Further reduced smoke emissions by 80%',
        affectedPollutants: ['pm10', 'so2'],
      },
      {
        year: 2003,
        title: 'Congestion Charge',
        titleUrl: 'https://en.wikipedia.org/wiki/London_congestion_charge',
        description: 'Daily charge for driving in central London, reducing traffic and encouraging public transport use.',
        impact: 'Reduced central London traffic by 30%',
        affectedPollutants: ['no2', 'pm25', 'co'],
      },
      {
        year: 2019,
        title: 'Ultra Low Emission Zone (ULEZ)',
        titleUrl: 'https://www.london.gov.uk/programmes-strategies/environment-and-climate-change/pollution-and-air-quality/ultra-low-emission-zone-ulez-london',
        description: 'Strictest emission standards for vehicles entering central London, with daily charges for non-compliant vehicles.',
        impact: 'Cut roadside NO2 by 44% in central zone',
        affectedPollutants: ['no2', 'pm25', 'pm10'],
      },
    ],
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    description: 'Once declared the most polluted city on Earth, Mexico City has made significant progress through innovative programs.',
    data: [
      { year: 1988, pm10: 235, so2: 168, no2: 125, o3: 198, co: 8.5 },
      { year: 1989, pm10: 231.5, so2: 165, no2: 123.5, o3: 195, co: 8.4, isInterpolated: true }, // Interpolated for Hoy No Circula Program
      { year: 1990, pm10: 228, so2: 162, no2: 122, o3: 192, co: 8.2 },
      { year: 1991, pm10: 221.5, so2: 155, no2: 118.5, o3: 188.5, co: 7.9, isInterpolated: true }, // Interpolated for Unleaded Gasoline & Catalytic Converters
      { year: 1992, pm10: 215, so2: 148, no2: 115, o3: 185, co: 7.5 },
      { year: 1995, pm10: 192, so2: 128, no2: 102, o3: 172, co: 6.5 },
      { year: 1998, pm10: 175, pm25: 82, so2: 112, no2: 92, o3: 158, co: 5.8 },
      { year: 2000, pm10: 162, pm25: 75, so2: 98, no2: 85, o3: 145, co: 5.2 },
      { year: 2005, pm10: 142, pm25: 65, so2: 78, no2: 72, o3: 125, co: 4.2 },
      { year: 2007, pm10: 134, pm25: 61, so2: 71.6, no2: 68, o3: 118.2, co: 3.9, isInterpolated: true }, // Interpolated for Metrobús Expansion
      { year: 2010, pm10: 122, pm25: 55, so2: 62, no2: 62, o3: 108, co: 3.5 },
      { year: 2014, pm10: 108.4, pm25: 49.4, so2: 50.8, no2: 54, o3: 95.2, co: 2.9, isInterpolated: true }, // Interpolated for PROAIRE (Clean Air Program)
      { year: 2015, pm10: 105, pm25: 48, so2: 48, no2: 52, o3: 92, co: 2.8 },
      { year: 2020, pm10: 88, pm25: 40, so2: 35, no2: 45, o3: 78, co: 2.2 },
      { year: 2023, pm10: 78, pm25: 36, so2: 28, no2: 40, o3: 68, co: 1.8 },
    ],
    interventions: [
      {
        year: 1989,
        title: 'Hoy No Circula Program',
        titleUrl: 'https://en.wikipedia.org/wiki/Hoy_No_Circula',
        description: 'Vehicle restriction program preventing cars from driving one day per week based on license plate number.',
        impact: 'Reduced daily vehicles by 20%',
        affectedPollutants: ['no2', 'co', 'o3', 'pm10'],
      },
      {
        year: 1991,
        title: 'Unleaded Gasoline & Catalytic Converters',
        titleUrl: 'https://www.upi.com/Archives/1990/09/01/Mexico-set-with-new-gas-for-first-catalytic-converters/8888652161600/',
        description: 'Mandatory unleaded fuel and catalytic converters for all new vehicles.',
        impact: 'Reduced lead emissions by 95%',
        affectedPollutants: ['no2', 'co', 'pm10'],
      },
      {
        year: 2007,
        title: 'Metrobús Expansion',
        titleUrl: 'https://en.wikipedia.org/wiki/Mexico_City_Metrob%C3%BAs',
        description: 'Major expansion of bus rapid transit system, providing clean public transport alternative.',
        impact: 'Serves 1M+ passengers daily',
        affectedPollutants: ['no2', 'pm25', 'co'],
      },
      {
        year: 2014,
        title: 'PROAIRE (Clean Air Program)',
        titleUrl: 'https://centreforpublicimpact.org/public-impact-fundamentals/mexico-citys-proaire-programme/',
        description: 'Comprehensive program targeting industrial emissions, vehicle standards, and green spaces.',
        impact: 'Reduced ozone levels by 70% since 1990',
        affectedPollutants: ['o3', 'pm25', 'no2', 'so2'],
      },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi',
    country: 'India',
    description: 'Currently battling severe air pollution, Delhi is implementing various interventions with mixed results.',
    data: [
      { year: 2010, pm10: 185, pm25: 92, so2: 18, no2: 62, o3: 55, co: 2.2 },
      { year: 2012, pm10: 198, pm25: 102, so2: 22, no2: 68, o3: 58, co: 2.5 },
      { year: 2014, pm10: 215, pm25: 112, so2: 28, no2: 75, o3: 62, co: 2.8 },
      { year: 2015, pm10: 228, pm25: 122, so2: 32, no2: 82, o3: 68, co: 3.2 },
      { year: 2016, pm10: 235, pm25: 128, so2: 35, no2: 88, o3: 72, co: 3.5 },
      { year: 2017, pm10: 242, pm25: 135, so2: 38, no2: 92, o3: 75, co: 3.8 },
      { year: 2018, pm10: 225, pm25: 122, so2: 35, no2: 85, o3: 70, co: 3.2 },
      { year: 2019, pm10: 208, pm25: 112, so2: 30, no2: 78, o3: 65, co: 2.8 },
      { year: 2020, pm10: 185, pm25: 98, so2: 24, no2: 68, o3: 58, co: 2.2 },
      { year: 2021, pm10: 198, pm25: 108, so2: 28, no2: 72, o3: 62, co: 2.5 },
      { year: 2022, pm10: 192, pm25: 102, so2: 26, no2: 70, o3: 60, co: 2.3 },
      { year: 2023, pm10: 188, pm25: 98, so2: 24, no2: 68, o3: 58, co: 2.2 },
    ],
    interventions: [
      {
        year: 2016,
        title: 'Odd-Even Vehicle Scheme',
        titleUrl: 'https://journals.sagepub.com/doi/10.3141/2627-02',
        description: 'Trial of alternating vehicle restrictions based on license plates to reduce traffic emissions.',
        impact: 'Temporary 15% reduction during trials',
        affectedPollutants: ['no2', 'pm25', 'co'],
      },
      {
        year: 2017,
        title: 'BS-VI Emission Standards',
        titleUrl: 'https://en.wikipedia.org/wiki/Bharat_stage_emission_standards',
        description: 'Announced leap to Bharat Stage VI emission standards, skipping BS-V, for all new vehicles by 2020.',
        impact: 'Reduced NOx from diesel vehicles by 70%',
        affectedPollutants: ['no2', 'pm25'],
      },
      {
        year: 2018,
        title: 'Construction & Industrial Restrictions',
        titleUrl: 'https://www.tandfonline.com/doi/full/10.1080/20964129.2020.1846460',
        description: 'Seasonal bans on construction and restrictions on industrial activities during high pollution periods.',
        impact: 'Variable effectiveness, 5-10% reduction',
        affectedPollutants: ['pm10', 'pm25'],
      },
      {
        year: 2020,
        title: 'Stubble Burning Compensation',
        titleUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6427124/',
        description: 'Incentive program for farmers to prevent crop residue burning, major pollution source.',
        impact: 'Ongoing challenge, limited success',
        affectedPollutants: ['pm25', 'pm10'],
      },
    ],
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Post-war industrial boom brought severe pollution, but strict regulations transformed Tokyo into one of the cleanest megacities.',
    data: [
      { year: 1965, pm10: 168, so2: 215, no2: 98, co: 8.5 },
      { year: 1968, pm10: 162, so2: 203, no2: 94.4, co: 8.1, isInterpolated: true }, // Interpolated for Air Pollution Control Law
      { year: 1970, pm10: 158, so2: 195, no2: 92, co: 7.8 },
      { year: 1973, pm10: 140, so2: 165, no2: 81.8, co: 6.6, isInterpolated: true }, // Interpolated for Diesel Emission Regulations
      { year: 1975, pm10: 128, so2: 145, no2: 75, co: 5.8 },
      { year: 1980, pm10: 98, so2: 95, no2: 58, co: 4.2 },
      { year: 1985, pm10: 78, so2: 65, no2: 48, co: 3.2 },
      { year: 1990, pm10: 62, so2: 45, no2: 42, co: 2.5 },
      { year: 1995, pm10: 52, pm25: 28, so2: 32, no2: 38, o3: 55, co: 2.0 },
      { year: 1999, pm10: 44, pm25: 23.2, so2: 25.6, no2: 33.2, o3: 49.4, co: 1.6, isInterpolated: true }, // Interpolated for Diesel Vehicle Ban
      { year: 2000, pm10: 42, pm25: 22, so2: 24, no2: 32, o3: 48, co: 1.5 },
      { year: 2005, pm10: 35, pm25: 18, so2: 18, no2: 28, o3: 42, co: 1.2 },
      { year: 2010, pm10: 28, pm25: 14, so2: 12, no2: 24, o3: 38, co: 0.9 },
      { year: 2015, pm10: 22, pm25: 11, so2: 8, no2: 20, o3: 35, co: 0.7 },
      { year: 2020, pm10: 18, pm25: 9, so2: 5, no2: 16, o3: 32, co: 0.5 },
      { year: 2023, pm10: 15, pm25: 7, so2: 4, no2: 14, o3: 30, co: 0.4 },
    ],
    interventions: [
      {
        year: 1968,
        title: 'Air Pollution Control Law',
        titleUrl: 'https://www.rieti.go.jp/en/special/policy-update/059.html',
        description: 'National law establishing emission standards for factories and vehicles, with strict enforcement.',
        impact: 'Reduced industrial SO2 by 50% within 5 years',
        affectedPollutants: ['so2', 'pm10', 'no2'],
      },
      {
        year: 1973,
        title: 'Diesel Emission Regulations',
        titleUrl: 'https://dieselnet.com/standards/jp/tokyofit.php',
        description: 'Tokyo Metropolitan Government enacted world\'s strictest diesel vehicle emission standards.',
        impact: 'Cut particulate matter by 80%',
        affectedPollutants: ['pm10', 'no2'],
      },
      {
        year: 1999,
        title: 'Diesel Vehicle Ban',
        titleUrl: 'https://www.japanfs.org/en/news/archives/news_id030817.html',
        description: 'Banned old diesel vehicles from Tokyo roads, offering subsidies for retrofitting or replacement.',
        impact: 'Removed 100,000+ polluting vehicles',
        affectedPollutants: ['pm25', 'pm10', 'no2'],
      },
      {
        year: 2010,
        title: 'Cap-and-Trade System',
        titleUrl: 'https://www.kankyo.metro.tokyo.lg.jp/english/climate/cap_and_trade/',
        description: 'Mandatory emissions trading scheme for large facilities, first in Asia.',
        impact: 'Reduced CO2 by 25% from covered facilities',
        affectedPollutants: ['pm25', 'no2', 'so2'],
      },
    ],
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    description: 'Rapid industrialization brought pollution challenges, but comprehensive policies have significantly improved air quality.',
    data: [
      { year: 1995, pm10: 148, so2: 68, no2: 72, co: 3.5 },
      { year: 2000, pm10: 132, so2: 58, no2: 68, co: 3.0 },
      { year: 2005, pm10: 115, pm25: 58, so2: 48, no2: 62, o3: 52, co: 2.5 },
      { year: 2010, pm10: 98, pm25: 48, so2: 38, no2: 55, o3: 48, co: 2.0 },
      { year: 2013, pm10: 88.4, pm25: 44.4, so2: 32, no2: 50.8, o3: 46.2, co: 1.8, isInterpolated: true }, // Interpolated for Eco-Mileage Program
      { year: 2015, pm10: 82, pm25: 42, so2: 28, no2: 48, o3: 45, co: 1.6 },
      { year: 2018, pm10: 72, pm25: 36, so2: 22, no2: 42, o3: 42, co: 1.3 },
      { year: 2019, pm10: 67, pm25: 33, so2: 20, no2: 40, o3: 40, co: 1.2, isInterpolated: true }, // Interpolated for Fine Dust Emergency Reduction
      { year: 2020, pm10: 62, pm25: 30, so2: 18, no2: 38, o3: 38, co: 1.1 },
      { year: 2021, pm10: 57, pm25: 28, so2: 16, no2: 36, o3: 36.5, co: 1, isInterpolated: true }, // Interpolated for Seasonal Fine Dust Management
      { year: 2022, pm10: 52, pm25: 26, so2: 14, no2: 34, o3: 35, co: 0.9 },
      { year: 2023, pm10: 48, pm25: 24, so2: 12, no2: 32, o3: 34, co: 0.8 },
    ],
    interventions: [
      {
        year: 2005,
        title: 'Natural Gas Bus Conversion',
        titleUrl: 'https://link.springer.com/article/10.1007/s00168-011-0439-3',
        description: 'Converted entire city bus fleet from diesel to compressed natural gas (CNG).',
        impact: 'Reduced bus emissions by 90%',
        affectedPollutants: ['pm10', 'no2', 'co'],
      },
      {
        year: 2013,
        title: 'Eco-Mileage Program',
        titleUrl: 'https://seoulsolution.kr/en/content/eco-mileage-system-1',
        description: 'Incentive program rewarding households and businesses for reducing energy consumption.',
        impact: '2M+ participants, significant awareness',
        affectedPollutants: ['no2', 'so2', 'co'],
      },
      {
        year: 2019,
        title: 'Fine Dust Emergency Reduction',
        titleUrl: 'https://english.seoul.go.kr/seouls-10-thorough-measures-to-tackle-fine-dust/',
        description: 'Emergency measures including vehicle restrictions, industrial cutbacks, and free public transport during high pollution days.',
        impact: 'Reduced peak day PM2.5 by 20%',
        affectedPollutants: ['pm25', 'pm10'],
      },
      {
        year: 2021,
        title: 'Seasonal Fine Dust Management',
        titleUrl: 'https://english.seoul.go.kr/seoul-to-set-up-simplified-fine-dust-measuring-devices-to-consistently-monitor-air-pollutants/',
        description: 'Comprehensive seasonal approach targeting construction, vehicles, and transboundary pollution.',
        impact: 'Ongoing implementation',
        affectedPollutants: ['pm25', 'pm10', 'no2'],
      },
    ],
  },
  {
    id: 'pittsburgh',
    name: 'Pittsburgh',
    country: 'United States',
    description: 'The "Steel City" transformed from one of America\'s most polluted cities to a clean, livable metropolis.',
    data: [
      { year: 1940, pm10: 325, so2: 485, no2: 125, co: 18.5 },
      { year: 1941, pm10: 319.3, so2: 475, no2: 123.3, co: 18.1, isInterpolated: true }, // Interpolated for Smoke Control Ordinance
      { year: 1947, pm10: 285.1, so2: 415, no2: 113.1, co: 15.5, isInterpolated: true }, // Interpolated for Smoke Control Enforcement
      { year: 1950, pm10: 268, so2: 385, no2: 108, co: 14.2 },
      { year: 1960, pm10: 192, so2: 245, no2: 85, co: 9.5 },
      { year: 1970, pm10: 148, so2: 168, no2: 72, co: 6.8 },
      { year: 1980, pm10: 92, so2: 95, no2: 52, co: 3.8 },
      { year: 1990, pm10: 68, so2: 58, no2: 42, co: 2.5 },
      { year: 2000, pm10: 48, pm25: 22, so2: 35, no2: 32, o3: 62, co: 1.5 },
      { year: 2003, pm10: 44.1, pm25: 19.6, so2: 31.1, no2: 29.9, o3: 59.9, co: 1.4, isInterpolated: true }, // Interpolated for Allegheny County Clean Air Plan
      { year: 2010, pm10: 35, pm25: 14, so2: 22, no2: 25, o3: 55, co: 1.0 },
      { year: 2020, pm10: 26, pm25: 10, so2: 14, no2: 20, o3: 48, co: 0.7 },
      { year: 2023, pm10: 22, pm25: 9, so2: 10, no2: 18, o3: 45, co: 0.6 },
    ],
    interventions: [
      {
        year: 1941,
        title: 'Smoke Control Ordinance',
        titleUrl: 'https://historicpittsburgh.org/collection/smoke-control-lantern-slides',
        description: 'Nation\'s first smoke control law, limiting smoke from industrial and residential sources.',
        impact: 'Pioneering local air quality regulation',
        affectedPollutants: ['pm10', 'so2', 'co'],
      },
      {
        year: 1947,
        title: 'Smoke Control Enforcement',
        titleUrl: 'https://positivelypittsburgh.com/darkhistory/',
        description: 'Strengthened enforcement with support from steel industry and community leaders.',
        impact: 'Reduced particulate matter by 60%',
        affectedPollutants: ['pm10', 'so2'],
      },
      {
        year: 1980,
        title: 'Steel Industry Decline',
        titleUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK222035/',
        description: 'Closure of major steel mills and shift to service economy dramatically reduced industrial emissions.',
        impact: 'Economic transition, major air quality improvement',
        affectedPollutants: ['pm10', 'so2', 'no2', 'co'],
      },
      {
        year: 2003,
        title: 'Allegheny County Clean Air Plan',
        titleUrl: 'https://pacokeovens.org/air-pollution/air-pollution-in-allegheny-county-a-historical-perspective/',
        description: 'Regional approach to remaining pollution sources, including coke works and diesel emissions.',
        impact: 'Addressed residual industrial pollution',
        affectedPollutants: ['pm25', 'pm10', 'so2'],
      },
    ],
  },
];

// Helper function to get pollutant category and color
export function getPollutantLevel(pollutant, value) {
  const thresholds = {
    pm25: [12, 35, 55, 150],
    pm10: [50, 100, 150, 250],
    so2: [20, 80, 250, 350],
    no2: [40, 70, 150, 200],
    o3: [100, 140, 180, 240],
    co: [4, 9, 12, 15],
  };

  const levels = ['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy'];
  const threshold = thresholds[pollutant];

  if (!threshold) return { level: 'Unknown', color: '#gray' };

  for (let i = 0; i < threshold.length; i++) {
    if (value <= threshold[i]) {
      return { level: levels[i], color: pollutantInfo[pollutant].color };
    }
  }

  return { level: levels[4], color: pollutantInfo[pollutant].color };
}
