'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Contact.module.css';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Bespoke Concierge & Support</span>
          <h1 className={styles.bannerTitle}>{t('nav_contact', 'Contact Us')}</h1>
          <p className={styles.bannerSubtitle}>
            Our travel designers and guest experience managers are available 24/7 to answer your inquiries, customize itineraries, and ensure a seamless Egyptian journey.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.infoCol}>
            <span className={styles.sectionOverline}>Direct Communications</span>
            <h2 className={styles.infoTitle}>Connect with Our Concierge</h2>
            <p className={styles.infoText}>
              Whether you are ready to book a private Dahabiya charter or simply wish to understand the best season for desert stargazing, we look forward to assisting you.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <div>
                  <div className={styles.detailLabel}>Headquarters</div>
                  <div className={styles.detailValue}>Pyramids Plateau Heights, Giza, Cairo, Egypt</div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <div>
                  <div className={styles.detailLabel}>Direct Telephone & WhatsApp</div>
                  <div className={styles.detailValue}>+20 (2) 3388-9900 / +20 100 123 4567</div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✉️</span>
                <div>
                  <div className={styles.detailLabel}>Electronic Concierge</div>
                  <div className={styles.detailValue}>concierge@vibesofegypt.com</div>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🏛️</span>
                <div>
                  <div className={styles.detailLabel}>Tourism Ministry License</div>
                  <div className={styles.detailValue}>Class A Operator Lic. #2948</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formCol}>
            <form className={styles.contactForm} onSubmit={(e) => { e.preventDefault(); alert('Thank you. We have received your message.'); }}>
              <h3 className={styles.formHeading}>Send an Inquiry</h3>
              <div className={styles.formGroup}>
                <label>Your Name</label>
                <input type="text" required placeholder="Lord Harrington" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" required placeholder="harrington@example.com" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 019-2834" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Message / Trip Details</label>
                <textarea rows={4} required placeholder="How may we assist your upcoming voyage to Egypt?" className={styles.textarea} />
              </div>
              <button type="submit" className={styles.sendBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
