import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Pages
import HomePage from '@/pages/HomePage';
import DestinationsPage from '@/pages/DestinationsPage';
import DestinationDetailPage from '@/pages/DestinationDetailPage';
import ToursPage from '@/pages/ToursPage';
import TourDetailPage from '@/pages/TourDetailPage';
import PackagesPage from '@/pages/PackagesPage';
import PackageDetailPage from '@/pages/PackageDetailPage';
import NileCruisesPage from '@/pages/NileCruisesPage';
import CruiseDetailPage from '@/pages/CruiseDetailPage';
import ExperiencesPage from '@/pages/ExperiencesPage';
import ExperienceDetailPage from '@/pages/ExperienceDetailPage';
import AboutPage from '@/pages/AboutPage';
import JournalPage from '@/pages/JournalPage';
import JournalDetailPage from '@/pages/JournalDetailPage';
import PlanYourTripPage from '@/pages/PlanYourTripPage';
import ContactPage from '@/pages/ContactPage';
import FaqPage from '@/pages/FaqPage';
import SpecialOffersPage from '@/pages/SpecialOffersPage';
import SearchPage from '@/pages/SearchPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import CancellationPolicyPage from '@/pages/CancellationPolicyPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
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
            <Route path="/experiences/:slug" element={<ExperienceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<JournalDetailPage />} />
            <Route path="/plan-your-trip" element={<PlanYourTripPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/special-offers" element={<SpecialOffersPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </LanguageProvider>
  );
}
