import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages
import HomePage from '@/app/page';
import DestinationsPage from '@/app/destinations/page';
import DestinationDetailPage from '@/app/destinations/[slug]/page';
import ToursPage from '@/app/tours/page';
import TourDetailPage from '@/app/tours/[slug]/page';
import PackagesPage from '@/app/packages/page';
import PackageDetailPage from '@/app/packages/[slug]/page';
import NileCruisesPage from '@/app/nile-cruises/page';
import CruiseDetailPage from '@/app/nile-cruises/[slug]/page';
import ExperiencesPage from '@/app/experiences/page';
import AboutPage from '@/app/about/page';
import JournalPage from '@/app/journal/page';
import PlanYourTripPage from '@/app/plan-your-trip/page';
import ContactPage from '@/app/contact/page';
import FaqPage from '@/app/faq/page';
import SpecialOffersPage from '@/app/special-offers/page';
import NotFound from '@/app/not-found';

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:slug" element={<TourDetailPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:slug" element={<PackageDetailPage />} />
            <Route path="/nile-cruises" element={<NileCruisesPage />} />
            <Route path="/nile-cruises/:slug" element={<CruiseDetailPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/plan-your-trip" element={<PlanYourTripPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/special-offers" element={<SpecialOffersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </LanguageProvider>
  );
}
