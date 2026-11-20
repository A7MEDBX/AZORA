import React from 'react';
import { Container, PageBanner } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function TermsAndConditionsPage() {
  usePageMeta({
    title: 'Terms & Conditions of Service',
    description:
      'Standard conditions of agreement for bespoke private journeys, luxury Nile charters, and curated expeditions arranged by Vibes of Egypt.'
  });
  return (
    <div>
      <PageBanner
        overline="Legal & Service Agreement"
        title="Terms & Conditions"
        subtitle="Standard conditions of agreement for bespoke private journeys, luxury Nile charters, and curated expeditions arranged by Vibes of Egypt."
      />

      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-bg-primary)' }}>
        <Container size="narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, color: 'var(--color-gray-700)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                1. Booking & Itinerary Confirmation
              </h2>
              <p>
                All bespoke itineraries, private guide arrangements, and vessel reservations are formalized upon receipt of an agreed initial reservation deposit. Your personal itinerary document outlines all inclusions, private transfers, domestic flights, and private curatorial guidance.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                2. Payments & Pricing Guarantee
              </h2>
              <p>
                Quoted rates are guaranteed in USD once confirmed. A 25% deposit secures your hotels and cruise staterooms. The balance is settled 30 days prior to your arrival in Egypt. Vibes of Egypt guarantees zero hidden surcharges or post-booking fuel fee escalation.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                3. Private Permits & Antiquities Regulations
              </h2>
              <p>
                Visits to pharaonic monuments, royal tombs (including King Tutankhamun and Queen Nefertari), and desert nature reserves adhere strictly to permits issued by the Egyptian Ministry of Tourism and Antiquities. In rare circumstances of archaeological conservation closures, comparable private arrangements are guaranteed.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                4. Liability & Travel Insurance
              </h2>
              <p>
                Vibes of Egypt maintains comprehensive commercial liability coverage for all ground and maritime transportation. Guests are required to maintain comprehensive international travel medical and emergency repatriation insurance for the duration of their visit.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
