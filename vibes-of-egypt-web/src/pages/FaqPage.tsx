import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, PageBanner, Accordion } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Faq.module.css';

export default function FaqPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Frequently Asked Questions & Practical Travel Advice',
    description:
      'Everything you need to know about visiting Egypt: private Egyptologists, Nile cruise attire, visa guidelines, payment security, and best travel seasons.'
  });

  const faqs = [
    {
      question: 'Are all tours 100% private?',
      answer:
        'Yes, every tour booked through Vibes of Egypt is completely private for you and your travel companions. You will have your own licensed Egyptologist and private air-conditioned vehicle.',
    },
    {
      question: 'How are the tour guides selected and certified?',
      answer:
        'All our guides hold university degrees in Egyptology, are licensed by the Egyptian Ministry of Tourism, and possess at least 5 years of field experience leading discerning international travelers.',
    },
    {
      question: 'What languages can the private Egyptologists speak?',
      answer:
        'We offer accredited guides fluent in English, Deutsch (German), Français (French), Español (Spanish), Japanese (日本語), Russian (Русский), and Italian.',
    },
    {
      question: 'What is the cancellation and refund policy?',
      answer:
        'We offer 100% free cancellation up to 48 hours before day tours. For multi-day luxury packages and Nile cruises, flexible rebooking and cancellation terms apply as outlined in our agreement.',
    },
    {
      question: 'Can itineraries be customized after booking?',
      answer:
        'Absolutely. Because your tour is private, you can adjust daily start times, spending more or less time at specific monuments, in coordination with your dedicated Egyptologist.',
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Essential Information"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about planning, booking, and experiencing bespoke luxury journeys across Egypt."
      />

      {/* Accordion Section */}
      <section className={styles.faqSection}>
        <Container size="narrow">
          <Accordion items={faqs} defaultOpenIndex={0} />
        </Container>
      </section>
    </div>
  );
}
