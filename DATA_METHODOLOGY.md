# Data Methodology

This document explains how the air quality data in this project was compiled, the limitations of the data, and how to verify the information presented.

## Data Collection Approach

### Sources

Historical air quality data was compiled from multiple authoritative sources:

1. **Government Environmental Agencies**
   - U.S. Environmental Protection Agency (EPA)
   - Ministry of Ecology and Environment of China
   - UK Department for Environment, Food & Rural Affairs
   - National environmental agencies from respective countries

2. **International Organizations**
   - World Health Organization (WHO) Air Quality Database
   - OECD Environmental Data

3. **Academic Research**
   - Peer-reviewed scientific papers (cited in intervention details)
   - University research institutions
   - Published environmental studies

4. **Our World in Data**
   - Used as a reference for data validation and trends

### Data Types

**Pollutant Measurements:**
- **PM2.5** (Fine Particulate Matter): ≤2.5 micrometers in diameter
- **PM10** (Coarse Particulate Matter): ≤10 micrometers in diameter
- **SO₂** (Sulfur Dioxide): Gas from burning fossil fuels
- **NO₂** (Nitrogen Dioxide): Gas primarily from vehicle emissions
- **O₃** (Ozone): Secondary pollutant formed from other emissions
- **CO** (Carbon Monoxide): Colorless, odorless gas from incomplete combustion

**Units:**
- PM2.5, PM10, SO₂, NO₂, O₃: micrograms per cubic meter (µg/m³)
- CO: milligrams per cubic meter (mg/m³)

## Data Processing

### Annual Averages

All values represent **approximate annual averages**:
- Calculated from available monitoring station data
- Where multiple stations exist, city-wide averages were used
- Some early historical data has limited monitoring coverage

### Temporal Coverage

Data availability varies by city:
- **Oldest records**: Pittsburgh (1940s), London (1950s)
- **Most complete**: Los Angeles, Beijing (near-annual data)
- **Limited coverage**: Early industrialization periods before comprehensive monitoring

### Interpolated Data Points

**Purpose**: Some intervention years lack exact measurement data. To show interventions on the timeline, values were interpolated.

**Method**: Linear interpolation between nearest available measurements (typically within ±2 years)

**Transparency**: All interpolated points are marked with:
- `isInterpolated: true` flag in source data
- Hollow circle markers on chart visualization
- "Estimated" badge in data tooltips
- Explanatory note in chart interface

**Affected Data Points** (17 total across all cities):
- Los Angeles: 1 point (2006)
- London: 4 points (1956, 1968, 2003, 2019)
- Mexico City: 4 points (1989, 1991, 2007, 2014)
- Tokyo: 3 points (1968, 1973, 1999)
- Seoul: 3 points (2013, 2019, 2021)
- Pittsburgh: 3 points (1941, 1947, 2003)
- Beijing: 0 points (all measured)
- Delhi: 0 points (all measured)

## Intervention Documentation

### Selection Criteria

Interventions included meet these criteria:
1. **Documented policy or regulation** with official announcement
2. **Significant scope** affecting city-wide or regional emissions
3. **Verifiable sources** (academic papers, government reports, news archives)
4. **Temporal relevance** to observable air quality changes

### Citation Standards

Each intervention includes:
- **Direct URL** to source document (academic paper, government report, or archived record)
- **Formatted citation** with author, year, title, and publication
- **Affected pollutants** based on intervention type and documented impacts
- **Impact statement** from official reports or research findings

### Limitations

**Causation vs. Correlation**: Air quality improvements result from multiple factors:
- Multiple simultaneous interventions
- Economic conditions and industrial shifts
- Weather patterns and seasonal variations
- Regional and transboundary pollution sources
- Technological advancements

**Note**: While interventions are marked at specific years, attributing exact pollution reductions to single policies is complex. Impact statements represent reported or estimated effects from cited sources.

## Data Quality Indicators

### High Confidence
- ✅ Post-2000 data for most cities (comprehensive monitoring networks)
- ✅ PM2.5 data from 1990s onward (when monitoring began)
- ✅ Major industrialized cities with long measurement histories

### Medium Confidence
- ⚠️ 1950s-1990s data (limited monitoring stations, methodology variations)
- ⚠️ Early PM10 data (measurement standards evolved over time)
- ⚠️ Cities with rapid urbanization (monitoring infrastructure grew with city)

### Lower Confidence (Marked as Interpolated)
- 🔶 Specific intervention years without exact measurements
- 🔶 Pre-1950s data (very limited monitoring)
- 🔶 Periods of political instability affecting data collection

## Verification

### How to Verify This Data

1. **Check intervention citations**: Each intervention has a direct link to source
2. **Cross-reference with Our World in Data**: Compare trends with their database
3. **Consult government databases**: EPA, WHO, and national environmental agencies publish historical data
4. **Review academic papers**: Many cited papers include supplementary datasets

### Known Data Gaps

- PM2.5 monitoring began in 1990s; earlier periods show only PM10
- Some cities lack continuous annual data (gaps filled by selective inclusion)
- Rural and suburban data often excluded; focus on urban monitoring stations
- Different measurement methodologies used across time periods and countries

## Updates and Corrections

### Version History
- **v0.1.0** (Initial): Historical data compiled from multiple sources
- **Current**: Added interpolation transparency and improved citations

### Reporting Issues

If you notice data inaccuracies:
1. Check the citation provided for that intervention
2. Consult the source document
3. Open an issue on GitHub with specific citation and correction
4. Include alternative source with documentation

## Methodology Changes

Future improvements planned:
- [ ] Add confidence intervals for historical data
- [ ] Include seasonal variation data where available
- [ ] Expand to more cities with documented air quality improvements
- [ ] Add data export functionality for independent analysis
- [ ] Include raw data sources in repository

## Academic Use

When citing this project:
- Reference the original sources (intervention citations)
- Note that data represents compiled averages, not raw measurements
- Acknowledge interpolated data points if used in analysis
- Cross-validate with primary sources for academic research

## Contact

For questions about methodology:
- Open an issue on GitHub
- Review the intervention citations for specific data points
- Consult the README.md for project overview

---

**Last Updated**: 2026-01-15
**Data Coverage**: 1940-2023 (varies by city)
**Cities**: 8 (Los Angeles, Beijing, London, Mexico City, Delhi, Tokyo, Seoul, Pittsburgh)
