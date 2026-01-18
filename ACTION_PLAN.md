# Action Plan: Website Critique Remediation

**Created**: 2026-01-18
**Total Duration**: 16 weeks (solo) / 10 weeks (2 developers)
**Issues Addressed**: 145+ across 20 categories

---

## Quick Reference: Phased Approach

| Phase | Focus | Priority | Duration | Key Deliverables |
|-------|-------|----------|----------|------------------|
| **1** | Critical Credibility | IMMEDIATE | 3 weeks | Data citations, disclaimers, transparency |
| **2** | Functionality & Accessibility | HIGH | 4 weeks | WCAG compliance, exports, mobile, WHO context |
| **3** | UX & Features | MEDIUM | 5 weeks | Multi-page, comparison, i18n |
| **4** | Polish & Sustainability | HIGH | 4 weeks | Automated updates, testing, performance |

---

## PHASE 1: Critical Credibility Fixes (Weeks 1-3)
**Goal**: Address fatal credibility flaws that make the site unsuitable for academic/policy use

### 1.1 Data Citations and Source Attribution ⭐⭐⭐⭐⭐
**Priority**: IMMEDIATE | **Complexity**: Moderate | **Time**: 1 week

**Issues**: No citations (#1), unverifiable data (#3), missing provenance (#4)

**Tasks**:
1. Add source metadata to data structure
   - Add `source`, `sourceUrl`, `dataQuality`, `lastVerified` fields
   - Document specific monitoring stations
   - **Files**: `src/data/citiesData.js`

2. Create inline data citations
   - Citation tooltips on data points
   - Source info in Details tab
   - Links to original datasets
   - **Files**: `src/components/PollutionChart.jsx`

3. Add comprehensive Sources page
   - List all data sources with URLs
   - Data access methodology
   - Last updated dates
   - **New**: `src/components/Sources.jsx`

4. Update documentation
   - Enhance DATA_METHODOLOGY.md with specific citations
   - Add bibliography section
   - **Files**: `DATA_METHODOLOGY.md`

**Impact**: Transforms from "amateur project" to "research-backed resource"

---

### 1.2 Causation vs Correlation Disclaimers ⭐⭐⭐⭐⭐
**Priority**: IMMEDIATE | **Complexity**: Simple | **Time**: 3 days

**Issues**: Implied causation (#2), oversimplified analysis (#11)

**Tasks**:
1. Add prominent disclaimers
   - Warning about causation complexity
   - Clarify interventions ≠ sole cause
   - Explain confounding variables
   - **Files**: `src/components/PollutionChart.jsx`, `src/components/InterventionsPanel.jsx`

2. Rewrite intervention descriptions
   - Change "caused 87% reduction" to "associated with"
   - Add nuance about multi-factorial improvements
   - Include temporal lag acknowledgments
   - **Files**: `src/data/citiesData.js`

3. Create "About This Data" modal
   - Explain limitations of correlation analysis
   - Link to scientific methodology
   - **New**: `src/components/AboutDataModal.jsx`

**Impact**: Addresses scientific integrity concerns, reduces greenwashing risk

---

### 1.3 Selection Bias Transparency ⭐⭐⭐⭐
**Priority**: IMMEDIATE | **Complexity**: Simple | **Time**: 2 days

**Issues**: Only success stories (#4), cherry-picked cities (#8)

**Tasks**:
1. Add "Why these cities?" section
   - Explain selection criteria
   - Acknowledge success-story bias
   - Note missing regions (Africa, South America)
   - **Files**: `README.md`, new About page

2. Reframe narrative
   - Remove "Success Stories" header → "Case Studies"
   - Use neutral language
   - Add context about ongoing challenges
   - **Files**: `src/App.jsx`, `README.md`

3. Include failure examples
   - Add interventions with limited success
   - Document Delhi's challenges honestly
   - Show cities that worsened before improving
   - **Files**: `src/data/citiesData.js`

**Impact**: Addresses honesty and bias concerns

---

### 1.4 Author Credentials and Accountability ⭐⭐⭐⭐
**Priority**: IMMEDIATE | **Complexity**: Simple | **Time**: 2 days

**Issues**: No author info (#10), no accountability (#19)

**Tasks**:
1. Create About page
   - Author/creator information
   - Project goals and scope
   - Clarify educational (not authoritative) nature
   - Contact information
   - **New**: `src/pages/About.jsx`

2. Add corrections policy
   - Process for reporting errors
   - Transparency in corrections
   - Changelog for data updates
   - **New**: `CORRECTIONS_POLICY.md`

3. Footer with credits
   - Creator info, last updated date
   - Link to GitHub for transparency
   - **New**: `src/components/Footer.jsx`

**Impact**: Establishes accountability and trust

---

### 1.5 Data Quality Indicators ⭐⭐⭐⭐
**Priority**: IMMEDIATE | **Complexity**: Moderate | **Time**: 4 days

**Issues**: Interpolation as fact (#6), false precision (#14)

**Tasks**:
1. Add confidence levels to data
   - Mark high/medium/low confidence data points
   - Show measurement uncertainty
   - Distinguish measured vs estimated values
   - **Files**: `src/data/citiesData.js`

2. Visual confidence indicators
   - Different opacity for low-confidence data
   - Badges for data quality levels
   - Hover tooltips with quality info
   - **Files**: `src/components/PollutionChart.jsx`

3. Enhance interpolation warnings
   - Statistical method explanation
   - Show interpolation impact percentage
   - **Files**: `src/components/PollutionChart.jsx` (already partially done)

**Dependencies**: Task 1.1 (source metadata)
**Impact**: Addresses precision and transparency concerns

---

## PHASE 2: High-Priority Functionality and Accessibility (Weeks 4-7)
**Goal**: Make site usable and compliant for all users, add critical features

### 2.1 Accessibility Compliance ⭐⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Complex | **Time**: 2 weeks

**Issues**: Screen reader limitations (#3), WCAG violations, color-only info

**Tasks**:
1. Screen reader support for charts
   - ARIA live regions for data
   - Table alternative (already exists in Details tab)
   - Descriptive alt text for visuals
   - Skip navigation links
   - **Files**: `src/components/PollutionChart.jsx`

2. Color blindness accommodations
   - Add pattern/texture to chart lines (dashed, dotted)
   - Shape differentiation (circles, squares, triangles)
   - Text labels alongside color indicators
   - **Files**: `src/components/PollutionChart.jsx`, `src/data/citiesData.js`

3. Keyboard navigation improvements
   - All chart interactions keyboard accessible
   - Visible focus indicators (already partially done)
   - Chart data keyboard navigation
   - Screen reader testing
   - **Files**: `src/components/PollutionChart.jsx`, `src/components/InterventionsPanel.jsx`

4. WCAG AA compliance
   - Audit contrast ratios
   - Increase font sizes (minimum 12px, preferably 14px)
   - Ensure 44×44px touch targets
   - Text resize support
   - **Files**: `src/index.css`, all component files

**Impact**: Legal compliance, inclusivity, usability for 15%+ of users

---

### 2.2 Data Export and Download ⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Moderate | **Time**: 1 week

**Issues**: No data download (#7), limited research utility (#15)

**Tasks**:
1. CSV export functionality
   - "Download as CSV" button
   - Export current city data with sources
   - Include metadata (interpolation flags, sources)
   - **New**: `src/utils/exportData.js`
   - **Files**: `src/components/PollutionChart.jsx`

2. Chart image export
   - "Download Chart" button
   - Export as PNG/SVG
   - Include attribution and source info
   - **Dependencies**: Add library like `html2canvas` or Recharts built-in export
   - **Files**: `src/components/PollutionChart.jsx`

3. Share functionality
   - URL parameters for city/pollutant selection
   - Create shareable links
   - Copy link button
   - **Files**: `src/App.jsx`

**Dependencies**: Phase 1.1 (source metadata in exports)
**Impact**: Enables academic use, research validation, report generation

---

### 2.3 Mobile Optimization ⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Moderate | **Time**: 4 days

**Issues**: Small touch targets (#13), poor mobile UX

**Tasks**:
1. Mobile chart improvements
   - Increase font sizes to 12px minimum
   - Add pinch-to-zoom support
   - Optimize tooltip positioning for mobile
   - Improve star marker visibility
   - **Files**: `src/components/PollutionChart.jsx`

2. Data table mobile optimization
   - Improve horizontal scroll UX
   - Add sticky column headers
   - Consider card view for very small screens
   - **Files**: `src/components/PollutionChart.jsx` (Details tab)

3. Touch target validation
   - Audit all interactive elements
   - Ensure 44×44px minimum
   - Add spacing between adjacent targets
   - **Files**: All component files

**Impact**: Usability for 50%+ mobile users

---

### 2.4 WHO Health Context and Guidelines ⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Moderate | **Time**: 5 days

**Issues**: Missing health context (#14), no safe limits shown

**Tasks**:
1. Add WHO guideline reference lines
   - Display safe limit lines on charts
   - Color-code danger zones
   - Hover tooltips with health impacts
   - **Files**: `src/components/PollutionChart.jsx`
   - **Data**: `src/data/citiesData.js` (add WHO thresholds)

2. Health impact information
   - Create health context modal/panel
   - Explain what each pollutant does to health
   - Show current vs safe levels
   - Link to WHO resources
   - **New**: `src/components/HealthContext.jsx`

3. Pollutant education expansion
   - Expand brief descriptions
   - Add "Learn More" links
   - Include vulnerable population warnings
   - **Files**: `src/data/citiesData.js`, new education component

**Impact**: Educational value, health awareness, context for non-experts

---

### 2.5 Legal and Licensing ⭐⭐⭐
**Priority**: HIGH | **Complexity**: Simple | **Time**: 2 days

**Issues**: Unclear licensing (#18), legal grey area

**Tasks**:
1. Add data licensing information
   - Clarify usage rights (MIT for code, attribution for data)
   - Proper attribution for government data
   - Include copyright status
   - **New**: `LICENSE_DATA.md`
   - **Files**: `README.md`

2. Create Terms of Service
   - Simple educational use ToS
   - Disclaimer of warranties
   - Limitation of liability
   - **New**: `TERMS_OF_SERVICE.md`

3. Privacy Policy
   - Even for static sites (best practice)
   - Clarify no user data collection
   - Document analytics if added
   - **New**: `PRIVACY_POLICY.md`

4. Accessibility statement
   - Document accessibility features
   - Acknowledge limitations
   - Provide contact for issues
   - **New**: `ACCESSIBILITY.md`

**Impact**: Legal protection, professional credibility

---

## PHASE 3: UX Improvements and Features (Weeks 8-12)
**Goal**: Enhance user experience and analytical capabilities

### 3.1 Multi-Page Architecture and Navigation ⭐⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Complex | **Time**: 1 week

**Issues**: Poor SEO, flat information architecture

**Tasks**:
1. Add React Router
   - Set up routing for multiple pages
   - Create Home, About, Sources, Methodology pages
   - Add navigation header
   - **Dependencies**: `npm install react-router-dom`
   - **Files**: `src/main.jsx`, `src/App.jsx`

2. SEO improvements
   - Add React Helmet for meta tags
   - Unique titles/descriptions per page
   - Open Graph tags for social sharing
   - Generate sitemap.xml
   - **Dependencies**: `npm install react-helmet-async`
   - **New**: `public/sitemap.xml`
   - **Files**: `index.html`, all page components

3. Structured data markup
   - Schema.org Dataset markup
   - JSON-LD for search engines
   - Breadcrumbs
   - **Files**: New page components

**Impact**: Discoverability, professional structure, SEO ranking

---

### 3.2 City Comparison Feature ⭐⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Complex | **Time**: 1.5 weeks

**Issues**: No comparison mode (#15), limited analytical utility

**Tasks**:
1. Side-by-side comparison view
   - "Compare Cities" mode
   - Show two cities on split screen
   - Align time axes for comparison
   - **New**: `src/components/CityComparison.jsx`
   - **Files**: `src/App.jsx`

2. Overlay comparison option
   - Overlay multiple cities on one chart
   - Different line styles per city
   - City legend
   - **Files**: `src/components/PollutionChart.jsx`

3. Comparison metrics
   - Show improvement rates side-by-side
   - Calculate % change comparisons
   - Highlight which city improved more
   - **New**: `src/utils/comparisonMetrics.js`

**Dependencies**: Phase 2.1 (accessibility for complex views)
**Impact**: Analytical utility, research value

---

### 3.3 Enhanced Chart Features ⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Moderate | **Time**: 1 week

**Issues**: Chart design issues, missing zoom/animation

**Tasks**:
1. Zoom and pan functionality
   - Time range selector
   - Chart zoom implementation
   - Reset zoom button
   - **Files**: `src/components/PollutionChart.jsx`

2. Animation and timeline scrubber
   - Play/pause animation through time
   - Timeline scrubber for specific years
   - Show changes over time visually
   - **Files**: `src/components/PollutionChart.jsx`

3. Chart improvements
   - Add legend directly on chart
   - Improve gridline alignment
   - Better star marker contrast
   - WHO reference lines (from 2.4)
   - **Files**: `src/components/PollutionChart.jsx`

**Dependencies**: Phase 2.4 (WHO guidelines)
**Impact**: User engagement, data exploration

---

### 3.4 Search and Filter Functionality ⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Moderate | **Time**: 5 days

**Issues**: No search, poor discoverability

**Tasks**:
1. Global search
   - Search across cities, interventions, years
   - Highlight search results
   - Jump to results
   - **New**: `src/components/Search.jsx`
   - **Files**: `src/App.jsx`

2. Advanced filtering
   - Filter interventions by type
   - Filter by pollutant affected
   - Sort cities by improvement rate
   - **Files**: `src/components/CitySelector.jsx`, new Filter component

3. Bookmarking and deep linking
   - URL parameters for all selections
   - Save user preferences
   - Back button support
   - **Files**: `src/App.jsx`

**Dependencies**: Phase 3.1 (routing)
**Impact**: Discoverability, user experience

---

### 3.5 Internationalization ⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Complex | **Time**: 2 weeks

**Issues**: English-only (#12), Western-centric

**Tasks**:
1. i18n framework setup
   - Add react-i18next
   - Extract all strings to translation files
   - Language switcher
   - **Dependencies**: `npm install react-i18next i18next`
   - **New**: `src/i18n/`, translation JSON files
   - **Files**: All component files

2. Initial translations
   - Spanish (for Mexico City)
   - Chinese (for Beijing)
   - Priority: UI strings first, then content
   - **New**: `src/i18n/locales/`

3. Localized content
   - Translate intervention descriptions
   - Localize dates and numbers
   - Regional unit preferences
   - **Files**: All content files

**Dependencies**: Phase 3.1 (routing for language paths)
**Impact**: Global accessibility, inclusivity

---

## PHASE 4: Polish, Optimization, and Sustainability (Weeks 13-16)
**Goal**: Long-term viability, performance, and professional polish

### 4.1 Automated Data Updates ⭐⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Complex | **Time**: 2 weeks

**Issues**: Manual updates (#8), outdated data, unsustainability (#17)

**Tasks**:
1. API integration setup
   - OpenAQ API integration
   - EPA AQS API integration
   - Data fetching scripts
   - **New**: `scripts/fetch-aqi-data.js`
   - **Reference**: `DATA_SOURCES_AND_VERIFICATION.md`

2. GitHub Actions workflow
   - Monthly update workflow
   - Data validation scripts
   - Automated PR creation
   - **New**: `.github/workflows/update-aqi-data.yml`

3. Data validation and quality checks
   - Trend validation
   - Anomaly detection
   - Cross-source validation
   - **New**: `scripts/validate-data.js`

**Dependencies**: Phase 1.1 (source metadata structure)
**Impact**: Sustainability, credibility, currency

---

### 4.2 Testing Infrastructure ⭐⭐⭐⭐
**Priority**: HIGH | **Complexity**: Complex | **Time**: 1.5 weeks

**Issues**: Zero tests (#9), no quality assurance

**Tasks**:
1. Unit tests
   - Test data utilities
   - Test calculation functions
   - Test export functions
   - **Dependencies**: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom`
   - **New**: `src/**/*.test.js`

2. Integration tests
   - Test component interactions
   - Test state management
   - Test routing
   - **Files**: `src/**/*.test.js`

3. E2E tests
   - Test user workflows
   - Accessibility testing with axe
   - Visual regression testing
   - **Dependencies**: `npm install --save-dev playwright @axe-core/playwright`
   - **New**: `tests/e2e/`

4. CI/CD pipeline
   - Run tests on every PR
   - Build validation
   - Accessibility audit
   - **New**: `.github/workflows/test.yml`

**Impact**: Quality assurance, preventing regressions

---

### 4.3 Performance Optimization ⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Moderate | **Time**: 4 days

**Issues**: Large bundle size, no code splitting

**Tasks**:
1. Code splitting
   - Lazy load routes
   - Dynamic component imports
   - Reduce initial bundle size
   - **Files**: `src/main.jsx`, route components

2. Bundle optimization
   - Remove unused motion library features
   - Optimize Recharts imports
   - Tree shaking verification
   - **Files**: `vite.config.js`, `package.json`

3. Caching and PWA
   - Add service worker
   - Cache static assets
   - Offline support (basic)
   - **Dependencies**: `npm install vite-plugin-pwa`
   - **Files**: `vite.config.js`

**Dependencies**: Phase 3.1 (routing for code splitting)
**Impact**: Load time, mobile experience

---

### 4.4 Design and Branding Polish ⭐⭐
**Priority**: MEDIUM | **Complexity**: Simple-Moderate | **Time**: 3 days

**Issues**: Generic branding, visual hierarchy

**Tasks**:
1. Custom branding
   - Create custom favicon
   - Design simple logo
   - Establish color palette
   - **New**: `public/favicon.ico`, logo files

2. Visual hierarchy improvements
   - Refine typography scale
   - Consistent spacing
   - Better visual focus on key elements
   - **Files**: `src/index.css`

3. Chart design refinements
   - Improve color contrast for accessibility
   - Better differentiation between pollutants
   - Cleaner visual design
   - **Files**: `src/components/PollutionChart.jsx`, `src/data/citiesData.js`

**Dependencies**: Phase 2.1 (color accessibility)
**Impact**: Professional appearance, brand recognition

---

### 4.5 Documentation and Community ⭐⭐⭐
**Priority**: MEDIUM | **Complexity**: Simple | **Time**: 4 days

**Issues**: Poor documentation, no contributor guide

**Tasks**:
1. Enhanced documentation
   - Create CONTRIBUTING.md
   - Add code comments
   - Create architecture diagram
   - Document component API
   - **New**: `CONTRIBUTING.md`, `ARCHITECTURE.md`

2. User guide
   - How to use the site
   - FAQ section
   - Glossary of terms
   - **New**: `src/pages/UserGuide.jsx`

3. Video tutorial (optional)
   - Screen recording walkthrough
   - YouTube upload
   - Embed on site

**Dependencies**: Phase 3.1 (pages for guides)
**Impact**: User adoption, contributor onboarding

---

## Quick Wins (Parallel with Phase 1)

High impact, low complexity tasks that can be done immediately:

1. **Update HTML meta tags** (30 min)
   - Better SEO titles and descriptions
   - Add Open Graph tags
   - **File**: `index.html`

2. **Add Footer component** (2 hours)
   - Last updated, credits, links
   - **New**: `src/components/Footer.jsx`

3. **Create CONTRIBUTING.md** (1 hour)
   - Encourage community involvement
   - **New**: `CONTRIBUTING.md`

4. **Improve README** (2 hours)
   - Add badges, better screenshots
   - Clearer limitations section
   - **File**: `README.md`

5. **Fix generic favicon** (30 min)
   - Create simple custom icon
   - **File**: `public/favicon.ico`

---

## Implementation Priority Matrix

| Task | Priority | Impact | Complexity | Duration |
|------|----------|--------|------------|----------|
| **Phase 1: Critical Credibility** | CRITICAL | ⭐⭐⭐⭐⭐ | Moderate | 3 weeks |
| 1.1 Data Citations | IMMEDIATE | ⭐⭐⭐⭐⭐ | Moderate | 1 week |
| 1.2 Causation Disclaimers | IMMEDIATE | ⭐⭐⭐⭐⭐ | Simple | 3 days |
| 1.3 Selection Bias | IMMEDIATE | ⭐⭐⭐⭐ | Simple | 2 days |
| 1.4 Author Credentials | IMMEDIATE | ⭐⭐⭐⭐ | Simple | 2 days |
| 1.5 Data Quality | IMMEDIATE | ⭐⭐⭐⭐ | Moderate | 4 days |
| **Phase 2: Functionality & A11y** | HIGH | ⭐⭐⭐⭐ | Complex | 4 weeks |
| 2.1 Accessibility | HIGH | ⭐⭐⭐⭐⭐ | Complex | 2 weeks |
| 2.2 Data Export | HIGH | ⭐⭐⭐⭐ | Moderate | 1 week |
| 2.3 Mobile Optimization | HIGH | ⭐⭐⭐⭐ | Moderate | 4 days |
| 2.4 WHO Context | HIGH | ⭐⭐⭐⭐ | Moderate | 5 days |
| 2.5 Legal/Licensing | HIGH | ⭐⭐⭐ | Simple | 2 days |
| **Phase 3: UX & Features** | MEDIUM | ⭐⭐⭐ | Complex | 5 weeks |
| 3.1 Multi-Page | MEDIUM | ⭐⭐⭐⭐ | Complex | 1 week |
| 3.2 City Comparison | MEDIUM | ⭐⭐⭐⭐ | Complex | 1.5 weeks |
| 3.3 Chart Features | MEDIUM | ⭐⭐⭐ | Moderate | 1 week |
| 3.4 Search/Filter | MEDIUM | ⭐⭐⭐ | Moderate | 5 days |
| 3.5 i18n | MEDIUM | ⭐⭐⭐ | Complex | 2 weeks |
| **Phase 4: Polish & Sustainability** | MEDIUM | ⭐⭐⭐⭐ | Complex | 4 weeks |
| 4.1 Automated Updates | HIGH | ⭐⭐⭐⭐⭐ | Complex | 2 weeks |
| 4.2 Testing | HIGH | ⭐⭐⭐⭐ | Complex | 1.5 weeks |
| 4.3 Performance | MEDIUM | ⭐⭐⭐ | Moderate | 4 days |
| 4.4 Design Polish | MEDIUM | ⭐⭐ | Simple-Moderate | 3 days |
| 4.5 Documentation | MEDIUM | ⭐⭐⭐ | Simple | 4 days |

---

## Success Metrics

### Phase 1 Success Criteria
- ✅ Every data point has source URL
- ✅ Causation disclaimers on all intervention claims
- ✅ About page with author info published
- ✅ Selection bias acknowledged in content
- ✅ Data quality indicators visible

### Phase 2 Success Criteria
- ✅ WCAG AA compliance (automated audit passing)
- ✅ CSV export functional for all cities
- ✅ Mobile Lighthouse score >90
- ✅ WHO guidelines visible on charts
- ✅ Legal documents published

### Phase 3 Success Criteria
- ✅ Multi-page routing functional
- ✅ City comparison working
- ✅ Search returns relevant results
- ✅ 2+ languages available
- ✅ Chart zoom/pan functional

### Phase 4 Success Criteria
- ✅ Automated updates running monthly
- ✅ Test coverage >70%
- ✅ Lighthouse performance >90
- ✅ Documentation complete
- ✅ Zero critical accessibility issues

---

## Risk Mitigation

### High-Risk Areas
1. **API Integration (4.1)**: APIs may change, rate limits, downtime
   - *Mitigation*: Graceful fallbacks, error handling, multiple sources

2. **Accessibility (2.1)**: Complex charts difficult to make fully accessible
   - *Mitigation*: Multiple modalities (chart + table), test with real users

3. **Performance (4.3)**: Recharts can be heavy with large datasets
   - *Mitigation*: Data pagination, virtualization, lighter chart library

4. **i18n (3.5)**: Translation quality, maintenance burden
   - *Mitigation*: Start with UI only, community translations, 2-3 key languages

---

## Resource Requirements

### Technical
- **APIs**: OpenAQ API key (free), EPA API key (free)
- **CI/CD**: GitHub Actions (free for public repos)
- **Hosting**: Current Vercel/Netlify (free tier adequate)
- **Dependencies**: ~5-10 new npm packages

### Time Estimates
- **Phase 1**: 3 weeks (1 developer)
- **Phase 2**: 4 weeks (1 developer)
- **Phase 3**: 5 weeks (1-2 developers)
- **Phase 4**: 4 weeks (1 developer)
- **Total**: ~16 weeks (4 months) solo, ~10 weeks with 2 developers

### Skills Needed
- React development (essential)
- Accessibility expertise (Phase 2)
- API integration (Phase 4)
- Testing/QA (Phase 4)
- Design (Phase 4, optional outsource)

---

## Critical Files Reference

### Phase 1 Critical Files
- `src/data/citiesData.js` - Add source metadata, rewrite interventions
- `src/components/PollutionChart.jsx` - Citations, disclaimers, quality indicators
- `src/components/InterventionsPanel.jsx` - Causation disclaimers
- `README.md` - Transparency, author info
- `DATA_METHODOLOGY.md` - Citations, limitations

### Phase 2 Critical Files
- `src/components/PollutionChart.jsx` - Accessibility, WHO guidelines, export
- `src/index.css` - WCAG contrast, font sizes
- `src/App.jsx` - URL state management
- `src/data/citiesData.js` - WHO thresholds, patterns

### Phase 3 Critical Files
- `src/main.jsx` - React Router
- `src/App.jsx` - Routing, comparison state
- `src/components/PollutionChart.jsx` - Chart enhancements
- `index.html` - SEO metadata

### Phase 4 Critical Files
- `.github/workflows/update-aqi-data.yml` - Automation
- `scripts/fetch-aqi-data.js` - API integration
- `scripts/validate-data.js` - Quality checks
- `vite.config.js` - Performance, PWA
- `src/**/*.test.js` - Test files

---

## Conclusion

This phased approach systematically addresses all 145+ issues:

**Phase 1** fixes fatal credibility flaws - addressing the "student project masquerading as authoritative resource" criticism.

**Phase 2** makes the site legally compliant, accessible, and functionally complete for research use.

**Phase 3** transforms it into a full-featured analytical platform with international reach.

**Phase 4** ensures long-term sustainability, professional quality, and competitive positioning.

The plan prioritizes **immediate credibility** over features, acknowledges that **perfect is the enemy of done**, and creates a **sustainable path forward**.
