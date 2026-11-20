import React from 'react';
import { Container, PageBanner } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Charter & Data Protection Policy',
    description:
      'How Vibes of Egypt safeguards your personal details, travel preferences, and private communications under Egyptian and international privacy regulations.'
  });
  return (
    <div>
      <PageBanner
        overline="Legal & Guest Protection"
        title="Privacy Charter & Data Policy"
        subtitle="How Vibes of Egypt safeguards your personal details, travel preferences, and private communications under Egyptian and international privacy regulations."
      />

      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-bg-primary)' }}>
        <Container size="narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7, color: 'var(--color-gray-700)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                1. Our Commitment to Discretion
              </h2>
              <p>
                At Vibes of Egypt, we provide bespoke luxury travel services to discerning international guests. We treat all personal information—including names, passport numbers, travel party details, dietary restrictions, and bespoke itinerary preferences—with strict confidentiality.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                2. Information We Collect
              </h2>
              <p>
                We only collect information directly submitted by you during the consultation, inquiry, or booking process. This includes contact details (name, email, phone/WhatsApp), party size, travel style, and special accommodation requirements necessary to coordinate private permits with the Egyptian Ministry of Tourism and Antiquities.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                3. No Third-Party Data Selling
              </h2>
              <p>
                We never sell, rent, or monetize guest information to third-party marketing brokers. Your data is used exclusively by your designated Vibes of Egypt Concierge, Egyptologist guides, and luxury hospitality partners (hotels, private charter flotillas) solely to execute your bespoke itinerary.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-midnight-black)', marginBottom: '0.75rem' }}>
                4. Data Security & Concierge Contact
              </h2>
              <p>
                All digital transmissions and form submissions are protected via 256-bit SSL encryption. To review, modify, or permanently expunge your client profile from our records, email our private concierge at{' '}
                <a href="mailto:concierge@vibesofegypt.com" style={{ color: 'var(--color-egyptian-gold)', fontWeight: 600 }}>
                  concierge@vibesofegypt.com
                </a>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
