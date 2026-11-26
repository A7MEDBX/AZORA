import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '@/components/AdminLayout';
import { RequireAdmin } from '@/components/RequireAdmin';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { ComingSoonPage } from '@/pages/ComingSoonPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { CruiseFormPage, CruisesListPage } from '@/pages/catalog/CruisesPage';
import { DestinationFormPage, DestinationsListPage } from '@/pages/catalog/DestinationsPage';
import { ExperienceFormPage, ExperiencesListPage } from '@/pages/catalog/ExperiencesPage';
import { JournalFormPage, JournalListPage } from '@/pages/catalog/JournalPage';
import { PackageFormPage, PackagesListPage } from '@/pages/catalog/PackagesPage';
import { SpecialOfferFormPage, SpecialOffersListPage } from '@/pages/catalog/SpecialOffersPage';
import { TourFormPage, ToursListPage } from '@/pages/catalog/ToursPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route path="/" element={<DashboardPage />} />

              {/* Catalog CRUD */}
              <Route path="/destinations" element={<DestinationsListPage />} />
              <Route path="/destinations/new" element={<DestinationFormPage />} />
              <Route path="/destinations/:id/edit" element={<DestinationFormPage />} />

              <Route path="/tours" element={<ToursListPage />} />
              <Route path="/tours/new" element={<TourFormPage />} />
              <Route path="/tours/:id/edit" element={<TourFormPage />} />

              <Route path="/packages" element={<PackagesListPage />} />
              <Route path="/packages/new" element={<PackageFormPage />} />
              <Route path="/packages/:id/edit" element={<PackageFormPage />} />

              <Route path="/cruises" element={<CruisesListPage />} />
              <Route path="/cruises/new" element={<CruiseFormPage />} />
              <Route path="/cruises/:id/edit" element={<CruiseFormPage />} />

              <Route path="/experiences" element={<ExperiencesListPage />} />
              <Route path="/experiences/new" element={<ExperienceFormPage />} />
              <Route path="/experiences/:id/edit" element={<ExperienceFormPage />} />

              <Route path="/special-offers" element={<SpecialOffersListPage />} />
              <Route path="/special-offers/new" element={<SpecialOfferFormPage />} />
              <Route path="/special-offers/:id/edit" element={<SpecialOfferFormPage />} />

              <Route path="/journal" element={<JournalListPage />} />
              <Route path="/journal/new" element={<JournalFormPage />} />
              <Route path="/journal/:id/edit" element={<JournalFormPage />} />

              {/* Operations (Phase 4 placeholders) */}
              <Route
                path="/inquiries"
                element={
                  <ComingSoonPage
                    title="Customer Inquiries"
                    description="Review, filter, and respond to incoming concierge messages."
                  />
                }
              />
              <Route
                path="/trip-plans"
                element={
                  <ComingSoonPage
                    title="Custom Trip Plans"
                    description="Track and manage bespoke multi-day trip requests."
                  />
                }
              />
              <Route
                path="/reviews"
                element={
                  <ComingSoonPage
                    title="Customer Reviews"
                    description="Approve, edit, or publish verified traveler testimonials."
                  />
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
