'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Faq.module.css';

export default function FaqPage() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all tours 100% private?',
      a: 'Yes, every tour booked through Vibes of Egypt is completely private for you and your travel companions. You will have your own licensed Egyptologist and private air-conditioned vehicle.'
    },
    {
      q: 'How are the tour guides selected and certified?',
      a: 'All our guides hold university degrees in Egyptology, are licensed by the Egyptian Ministry of Tourism, and possess at least 5 years of field experience leading discerning international travelers.'
    },
    {
      q: 'What languages can the private Egyptologists speak?',
      a: 'We offer accredited guides fluent in English, Deutsch (German), Français (French), Español (Spanish), Japanese (日本語), Russian (Русский), and Italian.'
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'We offer 100% free cancellation up to 48 hours before day tours. For multi-day luxury packages and Nile cruises, flexible rebooking and cancellation terms apply as outlined in our agreement.'
    },
    {
      q: 'Can itineraries be customized after booking?',
      a: 'Absolutely. Because your tour is private, you can adjust daily start times, spending more or less time at specific monuments, in coordination with your dedicated Egyptologist.'
    }
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Essential Information</span>
          <h1 className={styles.bannerTitle}>Frequently Asked Questions</h1>
          <p className={styles.bannerSubtitle}>
            Everything you need to know about planning, booking, and experiencing bespoke luxury journeys across Egypt.
          </p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.accordionWrap}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.accordionItem}>
                <button 
                  className={styles.questionBtn} 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className={styles.questionText}>{faq.q}</span>
                  <span className={styles.toggleIcon}>{openIdx === idx ? '−' : '+'}</span>
                </button>
                {openIdx === idx && (
                  <div className={styles.answerBox}>
                    <p className={styles.answerText}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
