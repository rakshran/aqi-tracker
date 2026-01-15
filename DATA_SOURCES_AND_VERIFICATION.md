# Data Sources and Verification Plan

**Document Version**: 1.0
**Last Updated**: 2026-01-15
**Purpose**: Comprehensive plan for data verification, sources, and automated updates

---

## Table of Contents

1. [Data Source Verification](#data-source-verification)
2. [Primary Data APIs](#primary-data-apis)
3. [Current Data Verification Status](#current-data-verification-status)
4. [2024-2025 Data Updates](#2024-2025-data-updates)
5. [New Interventions (2024-2025)](#new-interventions-2024-2025)
6. [Automated Update Architecture](#automated-update-architecture)
7. [Data Quality Assurance](#data-quality-assurance)

---

## Data Source Verification

### Reliability Requirements

To ensure data reliability and credibility, all data must meet these criteria:

1. **Primary Sources**: Government environmental agencies, WHO, OECD
2. **Cross-Validation**: Data verified against multiple authoritative sources
3. **Documentation**: Each data point linked to specific source with URL
4. **Transparency**: Interpolated/estimated data clearly marked
5. **Recency**: Annual updates from current year data

---

## Primary Data APIs

### 1. OpenAQ API v3 (Global Coverage)

**Status**: ✅ FREE with registration
**Coverage**: All 8 cities (global)
**Best For**: International cities (Beijing, London, Tokyo, Seoul, Mexico City, Delhi)

**Key Features**:
- Annual averages via `/v3/sensors/{sensor_id}/years` endpoint
- Data available since ~2014
- Very generous rate limits (1,000 requests/second)
- Comprehensive pollutant coverage (PM2.5, PM10, SO2, NO2, O3, CO)

**API Documentation**:
- [OpenAQ API Docs](https://docs.openaq.org/)
- [API v3 Announcement](https://openaq.medium.com/announcing-openaq-version-3-api-5d67fe3b7a3a)
- [API Key Registration](https://explore.openaq.org/register)

**Usage**:
```
GET https://api.openaq.org/v3/sensors/{sensor_id}/years?date_from=2024-01-01&date_to=2025-12-31
Headers: X-API-Key: {your_api_key}
```

**Data Structure**:
- Returns yearly averages (mean) computed from hourly values
- Includes min, max, average, and quartile statistics
- Local timezone calculations (Jan 1 01:00 to Dec 31 00:00)

**Reference**: [OpenAQ Homepage](https://openaq.org/)

---

### 2. EPA AQS API (US Cities)

**Status**: ✅ FREE with registration
**Coverage**: Los Angeles, Pittsburgh
**Best For**: US cities, regulatory-grade data

**Key Features**:
- Annual data service with validated measurements
- Historical data back to 1980s
- Regulatory-quality data (full QA/QC)
- Rate limit: 10 requests per minute, max 1M rows per query

**API Documentation**:
- [EPA AQS API Documentation](https://aqs.epa.gov/aqsweb/documents/data_api.html)
- [EPA Air Data Homepage](https://www.epa.gov/outdoor-air-quality-data)

**Usage**:
```
GET https://aqs.epa.gov/data/api/annualData/bySite?
  email={email}&key={key}&param={param_code}&bdate={start_date}&edate={end_date}
  &state={state_code}&county={county_code}&site={site_number}
```

**Parameter Codes**:
- PM2.5: 88101
- PM10: 81102
- SO2: 42401
- NO2: 42602
- O3: 44201
- CO: 42101

**Reference**: [EPA AirData](https://www.epa.gov/outdoor-air-quality-data)

---

### 3. WAQI (World Air Quality Index)

**Status**: ⚠️ Real-time only for free tier
**Coverage**: Global
**Use Case**: Real-time monitoring only (not for historical data)

**Limitation**: Historical data requires institutional/academic access
**Reference**: [WAQI API](https://aqicn.org/api/)

---

## Current Data Verification Status

### Existing 2023 Data Points

All cities have data ending at **2023**. Verification needed against:

| City | Last Year | Primary Source | Verification Source |
|------|-----------|----------------|---------------------|
| Los Angeles | 2023 | EPA AQS | OpenAQ, South Coast AQMD |
| Beijing | 2023 | China MEE | OpenAQ, Beijing EPA |
| London | 2023 | UK DEFRA | OpenAQ, London Air Quality Network |
| Mexico City | 2023 | Sistema de Monitoreo Atmosférico | OpenAQ |
| Delhi | 2023 | CPCB (Central Pollution Control Board) | OpenAQ |
| Tokyo | 2023 | Japanese Ministry of Environment | OpenAQ |
| Seoul | 2023 | Korea Environment Corporation | OpenAQ, AirKorea |
| Pittsburgh | 2023 | EPA AQS | OpenAQ, Allegheny County |

### Verification Process

For each city's 2023 data:

1. **Query OpenAQ API** for 2023 annual averages
2. **Query EPA AQS** (for US cities) for validation
3. **Compare values** against existing static data
4. **Document discrepancies** if >10% difference
5. **Update values** with most authoritative source
6. **Add source URLs** to data structure

---

## 2024-2025 Data Updates

### Data Collection Plan

For each city, fetch annual averages for:
- **2024**: Complete year data
- **2025**: Complete year data (if available by late 2026)

### Expected Data Structure Enhancement

```javascript
{
  year: 2024,
  pm10: 33,
  pm25: 11,
  so2: 7,
  no2: 17,
  o3: 63,
  co: 0.9,
  source: "EPA AQS",
  sourceUrl: "https://www.epa.gov/outdoor-air-quality-data",
  dataQuality: "high",
  lastUpdated: "2025-02-15"
}
```

### City-Specific Data Sources

#### Los Angeles
- **Primary**: [EPA AQS API](https://aqs.epa.gov/aqsweb/documents/data_api.html)
- **Secondary**: [South Coast AQMD](https://www.aqmd.gov/), OpenAQ
- **Monitor Sites**: Multiple monitors in LA County (averaging required)

#### Beijing
- **Primary**: OpenAQ aggregated data
- **Secondary**: [China National Environmental Monitoring Centre](https://english.mee.gov.cn/)
- **Monitor Network**: Beijing Municipal Ecological and Environment Monitoring Center

#### London
- **Primary**: [London Air Quality Network](https://www.londonair.org.uk/)
- **Secondary**: OpenAQ, [UK DEFRA](https://uk-air.defra.gov.uk/)
- **Data Access**: LAQN API or OpenAQ aggregation

#### Mexico City
- **Primary**: OpenAQ
- **Secondary**: [Sistema de Monitoreo Atmosférico de la Ciudad de México (SIMAT)](http://www.aire.cdmx.gob.mx/)
- **Language**: Spanish data sources (translation needed)

#### Delhi
- **Primary**: OpenAQ
- **Secondary**: [CPCB (Central Pollution Control Board of India)](https://cpcb.nic.in/)
- **Challenge**: Data consistency and availability

#### Tokyo
- **Primary**: OpenAQ
- **Secondary**: [Tokyo Metropolitan Government Bureau of Environment](https://www.kankyo.metro.tokyo.lg.jp/)
- **Language**: Japanese sources (translation needed)

#### Seoul
- **Primary**: OpenAQ
- **Secondary**: [AirKorea (Korea Environment Corporation)](https://www.airkorea.or.kr/)
- **Language**: Korean sources (translation needed)

#### Pittsburgh
- **Primary**: [EPA AQS API](https://aqs.epa.gov/aqsweb/documents/data_api.html)
- **Secondary**: [Allegheny County Health Department](https://www.alleghenycounty.us/Health-Department/Programs/Air-Quality/Air-Quality.aspx), OpenAQ
- **County Code**: 42003 (Allegheny County, PA)

---

## New Interventions (2024-2025)

### Los Angeles

#### Climate Pollution Reduction Grant (2024)
```javascript
{
  year: 2024,
  title: 'Climate Pollution Reduction Grant',
  description: 'EPA awarded South Coast AQMD $500M to implement community-driven solutions for climate crisis, air pollution reduction, and clean energy transition.',
  impact: '$500M investment in regional air quality',
  affectedPollutants: ['pm25', 'no2', 'co'],
  source: 'EPA Climate Pollution Reduction Grants',
  sourceUrl: 'https://www.epa.gov/inflation-reduction-act/climate-pollution-reduction-grants',
  verified: true
}
```

**Reference**: [Federal Register - PM2.5 Plan Approval](https://www.federalregister.gov/documents/2024/11/25/2024-27517/)

#### Revised PM2.5 Attainment Plan (2024)
```javascript
{
  year: 2024,
  title: 'Revised PM2.5 Attainment Plan',
  description: 'CARB adopted revised plan to achieve PM2.5 NAAQS compliance with enhanced control strategies for direct PM2.5 and precursor emissions.',
  impact: 'Target: 9.0 µg/m³ PM2.5 (new EPA standard)',
  affectedPollutants: ['pm25', 'pm10', 'no2'],
  source: 'California Air Resources Board',
  sourceUrl: 'https://ww2.arb.ca.gov/',
  verified: true
}
```

---

### Beijing

#### "0.1 Microgram Initiative" (2025)
```javascript
{
  year: 2025,
  title: '0.1 Microgram Initiative',
  description: 'Ultra-precise particulate matter control initiative targeting incremental PM2.5 reductions below 30 µg/m³ through advanced monitoring and precision interventions.',
  impact: 'PM2.5 reached 30.5 µg/m³ in 2024 (6.2% reduction)',
  affectedPollutants: ['pm25', 'pm10'],
  source: 'Beijing Municipal Ecological and Environment Bureau',
  sourceUrl: 'http://english.scio.gov.cn/m/in-depth/2025-06/07/content_117915666.html',
  verified: true
}
```

**Reference**: [China's 2025 Air Quality Goals](https://english.news.cn/20250224/5818eec07f754238b7bea797a162fa72/c.html)

#### New Energy Vehicle Milestone (2025)
```javascript
{
  year: 2025,
  title: 'New Energy Vehicle Milestone',
  description: 'Beijing achieved over 1 million new energy vehicles (NEVs), targeting 50% of all registered vehicles by 2025 end.',
  impact: 'Over 3M high-pollution vehicles phased out since 2013',
  affectedPollutants: ['no2', 'pm25', 'co'],
  source: 'China State Council Information Office',
  sourceUrl: 'http://english.scio.gov.cn/m/in-depth/2025-06/07/content_117915666.html',
  verified: true
}
```

**Data**: PM2.5 in 2024 was 30.5 µg/m³, down from 32.5 µg/m³ in 2023
**Source**: [Sustainability Magazine - China Air Pollution Plans](https://sustainabilitymag.com/articles/what-are-chinas-plans-to-eliminate-air-pollution-in-2025)

---

### London

#### ULEZ London-Wide Expansion Impact (2024)
```javascript
{
  year: 2024,
  title: 'ULEZ Expansion One-Year Results',
  description: 'First full year of London-wide ULEZ (expanded Aug 2023) showed 27% NO2 reduction citywide, 54% in central London, and 96.7% vehicle compliance.',
  impact: '27% NO2 reduction citywide, 31% PM2.5 reduction in outer London',
  affectedPollutants: ['no2', 'pm25', 'pm10'],
  source: 'Transport for London / Greater London Authority',
  sourceUrl: 'https://www.london.gov.uk/programmes-strategies/environment-and-climate-change/environment-and-climate-change-publications/london-wide-ultra-low-emission-zone-one-year-report',
  verified: true
}
```

**Key Data**:
- Nearly 100,000 fewer non-compliant vehicles on average day (Sep 2024 vs Jun 2023)
- NOx emissions 33-39% lower across all boroughs than without ULEZ
- 99% of monitoring sites show improvement since 2019

**Reference**: [London ULEZ One Year Report](https://www.london.gov.uk/programmes-strategies/environment-and-climate-change/environment-and-climate-change-publications/london-wide-ultra-low-emission-zone-one-year-report)

---

### Mexico City, Delhi, Tokyo, Seoul, Pittsburgh

**Status**: Further research needed for 2024-2025 interventions

**Action Items**:
- Search government announcements in local languages
- Check OpenAQ news/reports for major policy changes
- Review academic papers published 2024-2025
- Consult local environmental agency reports

---

## Automated Update Architecture

### Phase 3: Serverless Implementation

#### Option 1: GitHub Actions (Recommended)

**Advantages**:
- Free for public repos
- Integrated with existing repo
- Easy to maintain and monitor
- Version control for data changes

**Architecture**:

```yaml
# .github/workflows/update-aqi-data.yml
name: Update AQI Data

on:
  schedule:
    - cron: '0 2 1 * *'  # Monthly on 1st at 2 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install axios

      - name: Fetch latest AQI data
        env:
          OPENAQ_API_KEY: ${{ secrets.OPENAQ_API_KEY }}
          EPA_API_KEY: ${{ secrets.EPA_API_KEY }}
        run: node scripts/fetch-aqi-data.js

      - name: Validate data quality
        run: node scripts/validate-data.js

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'Update AQI data for current year'
          branch: automated-data-update
          title: 'Automated AQI Data Update'
          body: 'Automated update of AQI data from OpenAQ and EPA APIs'
```

**Required Scripts**:

1. **`scripts/fetch-aqi-data.js`** - Queries APIs, calculates annual averages
2. **`scripts/validate-data.js`** - Validates against historical trends, flags anomalies
3. **`scripts/update-cities-data.js`** - Updates `citiesData.js` with new data points

---

#### Option 2: Vercel Serverless Functions

**Advantages**:
- Already deployed on Vercel
- Can add API endpoints for data updates
- Cron jobs via Vercel

**Architecture**:

```javascript
// api/update-aqi-data.js
export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Fetch data from OpenAQ and EPA
  const updatedData = await fetchLatestData();

  // Validate data
  const validation = await validateData(updatedData);

  if (validation.passed) {
    // Create PR via GitHub API
    await createPullRequest(updatedData);
    return res.status(200).json({ success: true, data: updatedData });
  } else {
    // Send notification about validation failure
    return res.status(422).json({ error: 'Validation failed', details: validation.errors });
  }
}
```

**Vercel Cron**:
```json
{
  "crons": [{
    "path": "/api/update-aqi-data",
    "schedule": "0 2 1 * *"
  }]
}
```

---

#### Option 3: AWS Lambda (Advanced)

**Advantages**:
- Highly scalable
- Extensive AWS ecosystem integration
- Free tier: 1M requests/month

**Not recommended** for this use case due to complexity vs. GitHub Actions.

---

### Data Update Workflow

```
┌─────────────────────┐
│  Monthly Cron Job   │
│  (1st of month)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Query OpenAQ API   │
│  (All 8 cities)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Query EPA AQS API  │
│  (US cities)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Calculate Annual   │
│  Averages (if       │
│  mid-year, use YTD) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Validate Data      │
│  - Trend check      │
│  - Anomaly detect   │
│  - Cross-validate   │
└──────────┬──────────┘
           │
           ├──Pass─────────────┐
           │                   │
           ▼                   ▼
┌─────────────────────┐  ┌─────────────────────┐
│  Update citiesData  │  │  Send Notification  │
│  Add new data point │  │  (validation failed)│
└──────────┬──────────┘  └─────────────────────┘
           │
           ▼
┌─────────────────────┐
│  Create PR with     │
│  - Updated data     │
│  - Validation report│
│  - Source citations │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Manual Review &    │
│  Merge              │
└─────────────────────┘
```

---

## Data Quality Assurance

### Validation Rules

1. **Trend Validation**
   - New value within ±30% of previous year (unless major intervention)
   - Multi-year trend consistency (no unexplained reversals)

2. **Cross-Source Validation**
   - OpenAQ vs. EPA values within ±15% for US cities
   - Multiple monitoring stations averaged (not single outlier)

3. **Completeness Check**
   - All 6 pollutants present (PM2.5, PM10, SO2, NO2, O3, CO)
   - No missing years in sequence

4. **Threshold Alerts**
   - Flag if PM2.5 increases >10% YoY (investigate cause)
   - Flag if any pollutant shows >50% change (data error likely)

### Manual Review Triggers

Pull request requires manual review if:
- Any validation rule fails
- Data shows unexpected increase >10%
- Source API returned warnings/flags
- Data completeness <100%

### Audit Trail

Each automated update creates:
- Git commit with detailed message
- PR description with:
  - Data sources used
  - Validation results
  - Comparison with previous year
  - Any anomalies or flags
  - API response metadata

---

## Implementation Timeline

### Phase 1: Data Verification & Manual Updates (Current)

**Tasks**:
- ✅ Research and document API sources
- ✅ Document recent interventions (2024-2025)
- ⏳ Verify existing 2023 data against APIs
- ⏳ Fetch and add 2024 data for all cities
- ⏳ Research and add 2025 data (if available)
- ⏳ Add source citations to all data points
- ⏳ Update DATA_METHODOLOGY.md

**Estimated Completion**: 1-2 weeks

---

### Phase 2: Enhanced Documentation

**Tasks**:
- Add inline source comments to `citiesData.js`
- Create intervention source citations document
- Update README with data credibility section
- Add "Last Updated" indicators in UI

**Estimated Completion**: 1 week after Phase 1

---

### Phase 3: Automated Updates (Future)

**Tasks**:
- Set up GitHub Actions workflow
- Create API fetching scripts (OpenAQ, EPA)
- Implement data validation logic
- Test with historical data
- Deploy and monitor first automated run

**Estimated Completion**: 2-3 weeks after Phase 2

---

## Maintenance and Updates

### Quarterly Tasks

- Review validation rules effectiveness
- Update API keys if expired
- Check for new data sources
- Research recent interventions

### Annual Tasks

- Comprehensive data audit (all years, all cities)
- Update data quality confidence levels
- Review and update methodology documentation
- Evaluate new cities for inclusion

### On-Demand Tasks

- Investigate flagged data anomalies
- Respond to user-reported data issues
- Update when major intervention announced

---

## Contact and Support

**Data Quality Issues**: Open GitHub issue with "data-quality" label
**API Access Issues**: Contact OpenAQ support, EPA support
**Methodology Questions**: See DATA_METHODOLOGY.md

---

## References

### API Documentation
- [OpenAQ API Docs](https://docs.openaq.org/)
- [EPA AQS API Documentation](https://aqs.epa.gov/aqsweb/documents/data_api.html)
- [WAQI API Documentation](https://aqicn.org/api/)

### Government Sources
- [EPA Air Quality Data](https://www.epa.gov/outdoor-air-quality-data)
- [China Ministry of Ecology and Environment](https://english.mee.gov.cn/)
- [UK DEFRA Air Quality](https://uk-air.defra.gov.uk/)
- [London Air Quality Network](https://www.londonair.org.uk/)

### Recent Policy Documents
- [EPA Climate Pollution Reduction Grants](https://www.epa.gov/inflation-reduction-act/climate-pollution-reduction-grants)
- [Beijing Air Quality Progress Report](http://english.scio.gov.cn/m/in-depth/2025-06/07/content_117915666.html)
- [London ULEZ One Year Report](https://www.london.gov.uk/programmes-strategies/environment-and-climate-change/environment-and-climate-change-publications/london-wide-ultra-low-emission-zone-one-year-report)

---

**End of Document**
