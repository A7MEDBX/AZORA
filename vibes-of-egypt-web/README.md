# VIBES OF EGYPT — React & Next.js Web Platform

Production-ready, highly faithful React web application for **Vibes of Egypt**, built to match the approved Stitch UI designs (`projects/2785862973290385418`).

---

## 🏛️ Brand & Visual Identity
- **Midnight Black (`#171714`)**: Obsidian depths, backdrops, and footers.
- **Egyptian Gold (`#C99A43`)**: Accents, CTAs, badges, and active states.
- **Desert Ivory (`#F5F0E6`)**: Crisp text, warm cards, and contrast elements.
- **Nile Teal (`#176B68`)**: River and sea badges.
- **Desert Sand (`#A66C46`)**: Historical accents.
- **Typography**: Playfair Display (editorial headings) & Inter (interfaces & typography tokens).

---

## 🌐 Full Multilingual Support
Built-in language switcher supporting all required languages:
- 🇬🇧 **English (`en`)**
- 🇩🇪 **Deutsch / German (`de`)**
- 🇫🇷 **Français / French (`fr`)**
- 🇪🇸 **Español / Spanish (`es`)**
- 🇯🇵 **Japanese / 日本語 (`ja`)**
- 🇷🇺 **Russian / Русский (`ru`)**
*(Plus Arabic `ar` with RTL layout support)*

Every text string is routed through the centralized `LanguageContext` (`useLanguage` hook) and loaded from `src/data/translations.json`.

---

## 🗺️ Implemented Stitch Routes
- **`/`** — **Homepage** (Hero with Nile Felucca backdrop, Quick Search widget, Curated Destinations grid, Private Tours, Nile Cruises, and Brand Pillars).
- **`/destinations`** — **Destinations Atlas** (Comprehensive catalog across Cairo, Luxor, Aswan, Abu Simbel, Alexandria, Hurghada, Sharm El Sheikh, and Siwa).
- **`/destinations/[slug]`** — **Destination Detail Template** (Curated highlights, season intelligence, and linked private tours).
- **`/tours`** — **Private Tours Hub** (Interactive filters by category and destination).
- **`/tours/[slug]`** — **Tour Detail Template** (Day-by-day breakdown, inclusions, and sticky VIP booking widget).
- **`/packages`** — **Comprehensive Tour Packages** (Multi-day circuits).
- **`/packages/[slug]`** — **Package Detail Template** (Complete itinerary timeline and quotation request).
- **`/nile-cruises`** — **Nile & Dahabiya Cruises** (Luxury cruisers and twin-masted private Dahabiyas).
- **`/nile-cruises/[slug]`** — **Cruise Detail Template** (Port-by-port sailing schedules and cabin selections).
- **`/experiences`** — **Bespoke Experiences Hub** (Hot air balloons, desert safaris, coral diving).
- **`/about`** — **About & Brand Story** (Heritage, licensed Egyptologist credentials, and company pillars).
- **`/journal`** — **Travel Journal & Magazine** (Curated Egyptology essays and insider museum guides).
- **`/plan-your-trip`** — **Bespoke Trip Planner** (Interactive 3-step itinerary builder).
- **`/contact`** — **Concierge & Contact Us** (Direct contact details and inquiries).
- **`/faq`** — **Frequently Asked Questions** (Interactive collapsible accordions).
- **`/special-offers`** — **Seasonal Special Offers** (Early bird promotions).
- **`404`** — **Custom Not Found Page** ("Lost Among the Sands").

---

## 🚀 Running the Project

```bash
# 1. Navigate to the project directory
cd vibes-of-egypt-web

# 2. Install dependencies (when network access is enabled)
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
npm start
```
