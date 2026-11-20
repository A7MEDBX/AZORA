import React from 'react';
import { Container, PageBanner } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function CancellationPolicyPage() {
  usePageMeta({
    title: 'Cancellation & Refund Policy',
    description:
      'Transparent terms, rebooking flexibility, and refund schedules for our private tours, multi-day packages, and river charters.'
  });
  return (
    <div>
      <PageBanner
        overline="Guest Assurance & Flex Rights"
        title="Cancellation & Refund Policy"
        subtitle="Transparent terms, rebooking flexibility, and refund schedules for our private tours, multi-day packages, and river charters."
      />

      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-bg-primary)' }}>
        <Container size="narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, color: 'var(--color-gray-700)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                1. Flexible Private Day Tours
              </h2>
              <p>
                Private day tours in Cairo, Giza, Luxor, and Alexandria can be cancelled without penalty up to 48 hours before scheduled pickup. Cancellations within 48 hours are subject to a nominal vehicle preparation fee.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                2. Multi-Day Packages & Private Dahabiya Charters
              </h2>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>60+ Days Prior to Arrival:</strong> Full deposit refund minus non-refundable third-party domestic flight fees.</li>
                <li><strong>30 to 59 Days Prior:</strong> 75% refund of total expedition price or 100% credit toward future travel within 18 months.</li>
                <li><strong>15 to 29 Days Prior:</strong> 50% refund of total expedition price.</li>
                <li><strong>Under 15 Days Prior:</strong> Non-refundable due to guaranteed hotel suite commitments and private vessel charters.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                3. Force Majeure & Flight Disruptions
              </h2>
              <p>
                In cases of unforeseen geopolitical events, government flight suspensions, or documented medical emergencies, our concierge team works directly with our guests to reschedule travel without penalty or issue lifetime travel credits.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
