'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PlanYourTrip.module.css';

export default function PlanYourTripPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    destinations: [] as string[],
    duration: '7-10',
    travelers: '2',
    style: 'luxury-classic',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const toggleDestination = (dest: string) => {
    if (formData.destinations.includes(dest)) {
      setFormData({
        ...formData,
        destinations: formData.destinations.filter(d => d !== dest)
      });
    } else {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, dest]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Bespoke Travel Atelier</span>
          <h1 className={styles.bannerTitle}>{t('btn_plan_trip', 'Plan Your Journey')}</h1>
          <p className={styles.bannerSubtitle}>
            Collaborate with our senior Egyptologist curators to design an entirely custom private voyage tailored to your personal rhythm and curiosities.
          </p>
        </div>
      </section>

      {/* Multi-step Planner Card */}
      <section className={styles.plannerSection}>
        <div className="container">
          <div className={styles.plannerCard}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✨</div>
                <h2 className={styles.successHeading}>Your Request Has Been Received</h2>
                <p className={styles.successText}>
                  Thank you, <strong>{formData.fullName}</strong>. A dedicated Vibes of Egypt Guest Experience Director will review your custom preferences and contact you within 24 hours with a curated itinerary proposal.
                </p>
                <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                  Plan Another Journey
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.formWrap}>
                {/* Step Indicators */}
                <div className={styles.stepTabs}>
                  <div className={`${styles.stepTab} ${step >= 1 ? styles.stepTabActive : ''}`}>
                    <span className={styles.tabNum}>1</span>
                    <span>Destinations</span>
                  </div>
                  <div className={`${styles.stepTab} ${step >= 2 ? styles.stepTabActive : ''}`}>
                    <span className={styles.tabNum}>2</span>
                    <span>Style & Dates</span>
                  </div>
                  <div className={`${styles.stepTab} ${step >= 3 ? styles.stepTabActive : ''}`}>
                    <span className={styles.tabNum}>3</span>
                    <span>Guest Details</span>
                  </div>
                </div>

                {/* Step 1: Destination Selection */}
                {step === 1 && (
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepTitle}>Which destinations call to you?</h3>
                    <p className={styles.stepSub}>Select all destinations you wish to include in your bespoke itinerary.</p>

                    <div className={styles.destChips}>
                      {[
                        'Cairo & Pyramids', 'Luxor Temples', 'Aswan & Nile', 'Abu Simbel',
                        'Alexandria Coast', 'Hurghada Red Sea', 'Sharm El Sheikh', 'Siwa Oasis'
                      ].map((item) => {
                        const isSelected = formData.destinations.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            className={`${styles.destChip} ${isSelected ? styles.destChipActive : ''}`}
                            onClick={() => toggleDestination(item)}
                          >
                            <span>{isSelected ? '✓' : '+'}</span>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className={styles.btnRow}>
                      <button 
                        type="button" 
                        className={styles.nextBtn}
                        onClick={() => setStep(2)}
                      >
                        Continue to Style & Dates →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Trip Parameters */}
                {step === 2 && (
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepTitle}>Travel Style & Duration</h3>
                    <p className={styles.stepSub}>Help us tailor the pace and luxury tier of your journey.</p>

                    <div className={styles.fieldsGrid}>
                      <div className={styles.formGroup}>
                        <label>Preferred Duration</label>
                        <select 
                          value={formData.duration} 
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className={styles.input}
                        >
                          <option value="3-5">3 to 5 Days (Highlights)</option>
                          <option value="7-10">7 to 10 Days (Classic Circuit)</option>
                          <option value="12-14">12 to 14 Days (Grand Egypt Expedition)</option>
                          <option value="15+">15+ Days (Comprehensive Antiquity & Coast)</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Travel Party Size</label>
                        <select 
                          value={formData.travelers} 
                          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                          className={styles.input}
                        >
                          <option value="1">Solo Traveler</option>
                          <option value="2">Couple (2 Guests)</option>
                          <option value="family-3-4">Family (3 - 4 Guests)</option>
                          <option value="group-5+">Private Group (5+ Guests)</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Accommodations Tier</label>
                        <select 
                          value={formData.style} 
                          onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                          className={styles.input}
                        >
                          <option value="luxury-classic">5-Star Luxury (Four Seasons / Ritz)</option>
                          <option value="historic-palaces">Historic Palaces (Mena House / Old Cataract)</option>
                          <option value="private-dahabiya">Private Dahabiya & Boutique Lodges</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.btnRow}>
                      <button 
                        type="button" 
                        className={styles.backBtn}
                        onClick={() => setStep(1)}
                      >
                        ← Back
                      </button>
                      <button 
                        type="button" 
                        className={styles.nextBtn}
                        onClick={() => setStep(3)}
                      >
                        Continue to Contact Details →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                  <div className={styles.stepBody}>
                    <h3 className={styles.stepTitle}>Where Should We Send Your Proposal?</h3>
                    <p className={styles.stepSub}>Your contact details are protected under our strict privacy charter.</p>

                    <div className={styles.fieldsGrid}>
                      <div className={styles.formGroup}>
                        <label>Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Lord Harrington" 
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="harrington@example.com" 
                          className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Phone / WhatsApp</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834" 
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                      <label>Special Requests, Dietary Requirements or Historic Passions</label>
                      <textarea 
                        rows={3} 
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us about your passions—such as private sunrise access to Abu Simbel, King Tutankhamun's gold mask, or specific sailing preferences." 
                        className={styles.textarea}
                      />
                    </div>

                    <div className={styles.btnRow}>
                      <button 
                        type="button" 
                        className={styles.backBtn}
                        onClick={() => setStep(2)}
                      >
                        ← Back
                      </button>
                      <button type="submit" className={styles.submitBtn}>
                        Submit Bespoke Itinerary Request
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
