# Data Methodology

This document explains how the air quality data in this project was compiled, the limitations of the data, and how to verify the information presented.

## Important: Selection Bias and Dataset Limitations

### City Selection Criteria

This project includes **8 cities** selected based on specific criteria that create inherent selection bias:

**Selection Requirements:**
1. **Long-term data availability**: 20+ years of reliable monitoring data from government sources
2. **Documented interventions**: Verifiable policy measures with official records
3. **Observable trends**: Measurable changes in air quality over time (improvements or significant fluctuations)
4. **English-language documentation**: Accessibility of policy documents and research papers

### Acknowledged Selection Bias

This dataset is **not representative** of global air quality trends. Key limitations include:

#### 1. **Success-Oriented Bias**
- **What's included**: Cities that experienced measurable air quality improvements or implemented major interventions followed by observable changes
- **What's missing**:
  - Cities where air quality worsened despite policy interventions
  - Cities with deteriorating pollution and no significant policy response
  - Cities that improved initially but later experienced regression
  - Failed policy experiments and ineffective interventions

#### 2. **Geographic Bias**
- **Regions represented**: North America (3 cities), Europe (1 city), Asia (4 cities)
- **Regions missing**:
  - Africa (0 cities) - Limited long-term monitoring data availability
  - South America (0 cities) - Data access and language barriers
  - Central Asia (0 cities) - Data reliability and availability challenges
  - Oceania (0 cities) - Smaller population centers with different pollution profiles
  - Middle East (0 cities) - Data accessibility limitations

#### 3. **Data Availability Bias**
- Cities with well-established environmental agencies and monitoring networks are over-represented
- Cities in countries with strong open data policies are favored
- Historical data availability skews toward industrialized nations with earlier monitoring infrastructure
- English-language sources preferred, excluding valuable research in other languages

#### 4. **Temporal Bias**
- Emphasis on cities with dramatic historical transformations (London 1952, Los Angeles 1960s-1990s)
- Recent pollution crises (Beijing 2013, Delhi 2010s) may not have long-term outcome data
- Short-term improvements may not reflect sustained success

### Implications for Interpretation

**This dataset may create misleading impressions:**

- **Overstating policy effectiveness**: By showing primarily positive outcomes, the data may suggest environmental policies are more uniformly successful than they are in practice
- **Underrepresenting challenges**: The difficulty of addressing air pollution in rapidly industrializing regions is not fully represented
- **Creating false optimism**: Viewers may conclude that pollution problems are easily solved with political will, ignoring structural barriers
- **Ignoring context**: Each city's unique economic, political, geographic, and social context is simplified

### What This Means for Users

**Appropriate use:**
- Educational exploration of historical air quality trends
- Understanding policy timelines and intervention types
- Identifying case studies for deeper research
- Appreciating the complexity of air quality management

**Inappropriate use:**
- Claiming universal policy effectiveness across contexts
- Generalizing findings to cities not represented
- Drawing causal conclusions about specific interventions
- Using as sole source for academic research or policy advocacy

### For a More Complete Picture

To understand global air quality comprehensively, supplement this project with:

- **WHO Air Quality Database**: Global coverage with standardized measurements
- **Our World in Data**: Comprehensive statistical analysis with transparent methodology
- **IQAir World Air Quality Report**: Annual rankings including cities with worsening trends
- **Academic literature**: Peer-reviewed studies on failed interventions and persistent challenges
- **Regional environmental agencies**: Context-specific data for underrepresented regions

## Data Collection Approach

### Sources

Historical air quality data was compiled from multiple authoritative sources with full attribution:

1. **U.S. Environmental Protection Agency (EPA)**
   - **Used for**: Los Angeles, Pittsburgh
   - **Source**: Air Quality System (AQS) Database
   - **URL**: https://www.epa.gov/outdoor-air-quality-data
   - **API**: https://aqs.epa.gov/aqsweb/documents/data_api.html
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1955-2023 (Los Angeles), 1940-2023 (Pittsburgh)

2. **China National Environmental Monitoring Centre (CNEMC)**
   - **Used for**: Beijing
   - **Source**: National Air Quality Monitoring Network
   - **URL**: http://www.cnemc.cn/en/
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1998-2023
   - **Note**: PM2.5 monitoring began in 2010; earlier data based on PM10

3. **UK Department for Environment, Food & Rural Affairs (DEFRA)**
   - **Used for**: London
   - **Source**: UK Automatic Urban and Rural Network (AURN)
   - **URL**: https://uk-air.defra.gov.uk/data/
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1952-2023
   - **Historical Data**: Great Smog research archives and government records

4. **Mexico City Atmospheric Monitoring System (SIMAT)**
   - **Used for**: Mexico City
   - **Source**: Sistema de Monitoreo Atmosférico
   - **URL**: http://www.aire.cdmx.gob.mx/
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1988-2023

5. **Central Pollution Control Board of India (CPCB)**
   - **Used for**: Delhi
   - **Source**: National Air Quality Monitoring Programme
   - **URL**: https://airquality.cpcb.gov.in/
   - **Reliability**: Medium | **Update Frequency**: Annual
   - **Coverage**: 2010-2023
   - **Note**: Monitoring network significantly expanded after 2015

6. **Japan Ministry of the Environment (MOE)**
   - **Used for**: Tokyo
   - **Source**: Atmospheric Environmental Monitoring Network
   - **URL**: https://www.env.go.jp/en/air/
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1965-2023

7. **Korea Environment Corporation (KECO)**
   - **Used for**: Seoul
   - **Source**: AirKorea National Monitoring Network
   - **URL**: https://www.airkorea.or.kr/eng
   - **Reliability**: High | **Update Frequency**: Annual
   - **Coverage**: 1995-2023

8. **Historical Environmental Research Publications**
   - **Used for**: Historical data (pre-1980) where government monitoring was limited
   - **Sources**: Peer-reviewed papers, university archives, historical reports
   - **Reliability**: Medium | **Update Frequency**: Varies
   - **Note**: Used primarily for pre-monitoring-network periods

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

1. **Cross-reference with Our World in Data**: Compare trends with their database
2. **Consult government databases**: EPA, WHO, and national environmental agencies publish historical data
3. **Review academic papers**: Many research papers include supplementary datasets

### Known Data Gaps

- **PM2.5 monitoring began in 1990s**; earlier periods show only PM10 or lack fine particulate data
- **Some cities lack continuous annual data** (gaps filled by selective inclusion or interpolation)
- **Rural and suburban data often excluded**; focus on urban monitoring stations may not represent regional air quality
- **Different measurement methodologies** used across time periods and countries affect comparability
- **Selection bias**: Cities with worsening air quality or failed interventions are not represented (see "Selection Bias and Dataset Limitations" section above)
- **Survivorship bias**: Only cities that maintained monitoring infrastructure through political/economic changes are included
- **Language accessibility**: Cities with English-language documentation are over-represented

## Updates and Corrections

### Version History
- **v0.1.0** (Initial): Historical data compiled from multiple sources
- **Current**: Added interpolation transparency

### Reporting Issues

If you notice data inaccuracies:
1. Consult authoritative sources for verification
2. Open an issue on GitHub with specific details and correction
3. Include alternative source with documentation

## Methodology Changes

Future improvements planned:
- [ ] Add confidence intervals for historical data
- [ ] Include seasonal variation data where available
- [ ] Expand to more cities with documented air quality improvements
- [ ] Add data export functionality for independent analysis
- [ ] Include raw data sources in repository

## Academic Use

When citing this project:
- Reference the original sources where possible
- Note that data represents compiled averages, not raw measurements
- Acknowledge interpolated data points if used in analysis
- Cross-validate with primary sources for academic research

## Bibliography

### Primary Data Sources (by City)

#### Los Angeles, USA
- U.S. Environmental Protection Agency. (2024). *Air Quality System (AQS) Database*. Retrieved from https://www.epa.gov/outdoor-air-quality-data
- South Coast Air Quality Management District. *Historical Air Quality Data and Reports*. Retrieved from http://www.aqmd.gov/

#### Beijing, China
- China National Environmental Monitoring Centre. (2024). *National Air Quality Monitoring Data*. Retrieved from http://www.cnemc.cn/en/
- Ministry of Ecology and Environment of China. *Air Quality Historical Data*. Retrieved from http://english.mee.gov.cn/

#### London, United Kingdom
- UK Department for Environment, Food & Rural Affairs. (2024). *UK Automatic Urban and Rural Network (AURN) Data*. Retrieved from https://uk-air.defra.gov.uk/data/
- Greater London Authority. *London Air Quality Network*. Retrieved from https://www.londonair.org.uk/

#### Mexico City, Mexico
- Sistema de Monitoreo Atmosférico de la Ciudad de México (SIMAT). (2024). *Historical Air Quality Data*. Retrieved from http://www.aire.cdmx.gob.mx/
- Secretaría del Medio Ambiente de la Ciudad de México. *Environmental Reports*. Retrieved from https://www.sedema.cdmx.gob.mx/

#### Delhi, India
- Central Pollution Control Board. (2024). *National Air Quality Monitoring Programme Data*. Retrieved from https://airquality.cpcb.gov.in/
- Delhi Pollution Control Committee. *Air Quality Bulletins*. Retrieved from http://www.dpcc.delhigovt.nic.in/

#### Tokyo, Japan
- Japan Ministry of the Environment. (2024). *Atmospheric Environmental Monitoring Network Data*. Retrieved from https://www.env.go.jp/en/air/
- Tokyo Metropolitan Government. *Environmental White Papers and Air Quality Data*. Retrieved from https://www.kankyo.metro.tokyo.lg.jp/en/

#### Seoul, South Korea
- Korea Environment Corporation. (2024). *AirKorea National Air Quality Monitoring Data*. Retrieved from https://www.airkorea.or.kr/eng
- Seoul Metropolitan Government. *Environmental Statistics*. Retrieved from https://english.seoul.go.kr/

#### Pittsburgh, USA
- U.S. Environmental Protection Agency. (2024). *Air Quality System (AQS) Database*. Retrieved from https://www.epa.gov/outdoor-air-quality-data
- Allegheny County Health Department. *Historical Air Quality Records and Reports*. Retrieved from https://www.alleghenycounty.us/Health-Department/Programs/Air-Quality/

### Supporting References

#### International Standards and Guidelines
- World Health Organization. (2021). *WHO Global Air Quality Guidelines: Particulate Matter, Ozone, Nitrogen Dioxide, Sulfur Dioxide and Carbon Monoxide*. Geneva: World Health Organization. Retrieved from https://www.who.int/publications/i/item/9789240034228

#### Methodology and Validation
- Our World in Data. (2024). *Air Pollution*. Retrieved from https://ourworldindata.org/air-pollution
- OECD. (2024). *Air Quality and Health Statistics*. Retrieved from https://stats.oecd.org/

### How to Cite This Project

#### APA Format
```
AQI Improvement Tracker. (2024). Air Quality Data Visualization [Data visualization project].
GitHub. https://github.com/rakshran/aqi-tracker
```

#### MLA Format
```
"AQI Improvement Tracker." Air Quality Data Visualization, 2024,
GitHub, github.com/rakshran/aqi-tracker.
```

#### Chicago Format
```
AQI Improvement Tracker. "Air Quality Data Visualization." GitHub, 2024.
https://github.com/rakshran/aqi-tracker.
```

### Citing Individual Data Points

When citing specific data from this project, **always reference the original source** in addition to this project:

```
Data for [City] sourced from [Original Agency/Database],
compiled and visualized in AQI Improvement Tracker (2024).
```

**Example**:
```
Beijing PM2.5 annual average data (2010-2023) sourced from China National
Environmental Monitoring Centre (CNEMC), compiled and visualized in Historical
Air Pollution Trends (2024). Available at: https://github.com/rakshran/aqi-tracker
```

## Contact

For questions about methodology:
- Open an issue on GitHub: https://github.com/rakshran/aqi-tracker/issues
- Consult the README.md for project overview
- Review DATA_SOURCES_AND_VERIFICATION.md for planned updates

---

**Last Updated**: 2026-01-18
**Data Coverage**: 1940-2023 (varies by city)
**Cities**: 8 (Los Angeles, Beijing, London, Mexico City, Delhi, Tokyo, Seoul, Pittsburgh)
**Data Sources**: 8 primary government agencies + historical research archives
