import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { destinations } from '@/lib/catalog';
import { ApiClientError } from '@/api/client';
import { submitTripPlan } from '@/services/inquiriesService';
import styles from './TripPlanner.module.css';

interface TripPlannerData {
  destinations: string[];
  travelDates: string;
  flexibleDates: boolean;
  duration: string;
  partySize: string;
  travelerType: string;
  interests: string[];
  travelStyle: string;
  budgetPerPerson: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
}

export const TripPlanner: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<'production' | 'dev'>('production');
  const [submissionRef, setSubmissionRef] = useState('VOE-2026-8472');
  const [errorMsg, setErrorMsg] = useState('');
  const [prefillContext, setPrefillContext] = useState<string | null>(null);

  // Initialize form state
  const [data, setData] = useState<TripPlannerData>({
    destinations: ['cairo-giza', 'luxor'],
    travelDates: '',
    flexibleDates: true,
    duration: '8-10 Days',
    partySize: '2 Travelers (Couples)',
    travelerType: 'Couples / Romance',
    interests: ['Antiquities & Royal Tombs', 'Nile Sailing / Dahabiya'],
    travelStyle: 'Ultra Luxury 5★ Suites',
    budgetPerPerson: '$3,500 - $6,000 / person',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: ''
  });

  // Read URL query params on mount to pre-fill
  useEffect(() => {
    const destParam = searchParams.get('destination');
    const tourParam = searchParams.get('tour');
    const pkgParam = searchParams.get('package');
    const cruiseParam = searchParams.get('cruise');
    const expParam = searchParams.get('experience');
    const travelersParam = searchParams.get('travelers');
    const dateParam = searchParams.get('date');

    if (destParam) {
      setData(prev => ({
        ...prev,
        destinations: Array.from(new Set([...prev.destinations, destParam]))
      }));
      setPrefillContext(`Pre-configured for Destination: ${destParam.replace(/-/g, ' ')}`);
    } else if (tourParam) {
      setPrefillContext(`Inquiring about Tour: ${tourParam.replace(/-/g, ' ')}`);
    } else if (pkgParam) {
      setPrefillContext(`Inquiring about Package: ${pkgParam.replace(/-/g, ' ')}`);
    } else if (cruiseParam) {
      setPrefillContext(`Inquiring about Cruise: ${cruiseParam.replace(/-/g, ' ')}`);
    } else if (expParam) {
      setPrefillContext(`Inquiring about Experience: ${expParam.replace(/-/g, ' ')}`);
    }

    if (travelersParam) {
      setData(prev => ({ ...prev, partySize: `${travelersParam} Travelers` }));
    }
    if (dateParam) {
      setData(prev => ({ ...prev, travelDates: dateParam, flexibleDates: false }));
    }
  }, [searchParams]);

  const toggleDestination = (slug: string) => {
    setData(prev => {
      const exists = prev.destinations.includes(slug);
      return {
        ...prev,
        destinations: exists
          ? prev.destinations.filter(s => s !== slug)
          : [...prev.destinations, slug]
      };
    });
    setErrorMsg('');
  };

  const toggleInterest = (interest: string) => {
    setData(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const validateStep = (): boolean => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (data.destinations.length === 0) {
        setErrorMsg('Please select at least one Egyptian destination for your journey.');
        return false;
      }
    }
    if (currentStep === 4) {
      if (data.interests.length === 0) {
        setErrorMsg('Please select at least one area of interest.');
        return false;
      }
    }
    if (currentStep === 6) {
      if (!data.fullName.trim()) {
        setErrorMsg('Please provide your full name.');
        return false;
      }
      if (!data.email.trim() || !data.email.includes('@')) {
        setErrorMsg('Please enter a valid email address so our concierge can reach you.');
        return false;
      }
      if (!data.phone.trim()) {
        setErrorMsg('Please enter your contact phone or WhatsApp number.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const parsedAdults = parseInt(data.partySize, 10);
      const adultsCount = Number.isNaN(parsedAdults) ? 2 : Math.max(1, parsedAdults);
      const parsedDuration = parseInt(data.duration, 10);
      const durationDays = Number.isNaN(parsedDuration) ? 8 : Math.max(1, parsedDuration);
      const isoStartDate = /^\d{4}-\d{2}-\d{2}$/.test(data.travelDates.trim())
        ? data.travelDates.trim()
        : undefined;

      const noteParts = [
        prefillContext ? `Context: ${prefillContext}` : '',
        !isoStartDate && data.travelDates.trim() ? `Preferred Dates: ${data.travelDates.trim()}` : '',
        data.travelerType ? `Traveler Type: ${data.travelerType}` : '',
        data.specialRequests.trim() ? data.specialRequests.trim() : ''
      ].filter(Boolean);

      const result = await submitTripPlan({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        country: data.country || undefined,
        travelStartDate: isoStartDate,
        isDatesFlexible: data.flexibleDates,
        durationDays,
        adultsCount,
        childrenCount: 0,
        preferredDestinations: data.destinations,
        interests: data.interests,
        accommodationPreference: data.travelStyle,
        budgetPerPerson: data.budgetPerPerson,
        additionalNotes: noteParts.length > 0 ? noteParts.join(' | ') : undefined
      });

      const shortRef = result.id.startsWith('mock-')
        ? `VOE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
        : `VOE-${result.id.slice(0, 8).toUpperCase()}`;
      setSubmissionRef(shortRef);
      setSubmissionMode(result.mode);
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        if (err.status === 400 && Object.keys(err.fieldErrors).length > 0) {
          const fieldMessages = Object.entries(err.fieldErrors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(' • ');
          setErrorMsg(`Please check your entries: ${fieldMessages}`);
        } else if (err.isRateLimited) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg(err.message);
        }
      } else {
        const msg = err instanceof Error ? err.message : 'Unable to transmit your request. Please check your network and try again.';
        setErrorMsg(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 7;
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  if (isSubmitted) {
    return (
      <div className={styles.plannerCard}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✨</div>
          <h2 className={styles.successHeading}>Bespoke Journey Requested</h2>
          <div className={styles.refNumber}>Inquiry Reference: {submissionRef}</div>
          <p className={styles.successText}>
            Thank you, <strong>{data.fullName}</strong>. Your customized itinerary blueprint has been
            dispatched to our Senior Egyptologist Curatorial Directorate. A dedicated Concierge
            Director will review your preferences and deliver a refined day-by-day proposal to{' '}
            <strong>{data.email}</strong> within 24 hours.
          </p>

          {submissionMode === 'dev' && (
            <div
              style={{
                background: 'rgba(217, 119, 6, 0.1)',
                color: 'var(--color-egyptian-gold, #b45309)',
                border: '1px dashed var(--color-egyptian-gold, #d97706)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                margin: '1.25rem 0',
                fontSize: '0.8125rem',
                textAlign: 'center'
              }}
            >
              🛠️ <strong>Dev Mode:</strong> Inquiry logged to console. In production, configure <code>VITE_FORM_ENDPOINT</code> in your environment variables.
            </div>
          )}

          <div className={styles.reviewBox}>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Selected Destinations:</span>
              <span className={styles.reviewValue}>{data.destinations.join(', ')}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Expedition Duration:</span>
              <span className={styles.reviewValue}>{data.duration}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Travel Party:</span>
              <span className={styles.reviewValue}>{data.partySize}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewLabel}>Travel Style & Tier:</span>
              <span className={styles.reviewValue}>{data.travelStyle}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className={styles.nextBtn}
          >
            Plan Another Journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.plannerCard}>
      {/* Context banner if pre-filled from detail page */}
      {prefillContext && (
        <div className={styles.prefillBanner}>
          <span className={styles.prefillIcon}>📍</span>
          <span>{prefillContext}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div className={styles.stepHeader}>
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Destinations */}
        {currentStep === 1 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>Where would you like to travel?</h3>
            <p className={styles.stepSub}>
              Select all regions you wish to experience. You may combine multiple cultural and coastal stops.
            </p>
            <div className={styles.destChips}>
              {destinations.map(d => {
                const active = data.destinations.includes(d.slug);
                return (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => toggleDestination(d.slug)}
                    className={`${styles.destChip} ${active ? styles.destChipActive : ''}`}
                  >
                    <span>{d.name}</span>
                    <span>{active ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Dates & Duration */}
        {currentStep === 2 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>When & how long do you plan to journey?</h3>
            <p className={styles.stepSub}>
              Choose your ideal journey duration and tentative travel window.
            </p>
            <div className={styles.optionsGrid}>
              {[
                { title: '4 - 7 Days', desc: 'Highlights: Cairo, Pyramids & Luxor' },
                { title: '8 - 10 Days', desc: 'The Classic: Cairo, Pyramids & 4-Night Luxury Cruise' },
                { title: '11 - 14 Days', desc: 'The Grand Tour: Cairo, Nile Cruise & Red Sea Resort' },
                { title: '15+ Days', desc: 'Comprehensive Odyssey: Nile, Oases & Desert Safaris' }
              ].map(opt => (
                <div
                  key={opt.title}
                  onClick={() => setData(prev => ({ ...prev, duration: opt.title }))}
                  className={`${styles.optionCard} ${
                    data.duration === opt.title ? styles.optionCardActive : ''
                  }`}
                >
                  <div className={styles.optionIcon}>⏳</div>
                  <h4 className={styles.optionTitle}>{opt.title}</h4>
                  <p className={styles.optionDesc}>{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.fieldsGrid}>
              <div className={styles.formGroup}>
                <label>Preferred Travel Dates / Month</label>
                <input
                  type="date"
                  value={data.travelDates}
                  onChange={e => setData(prev => ({ ...prev, travelDates: e.target.value }))}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date Flexibility</label>
                <select
                  value={data.flexibleDates ? 'yes' : 'no'}
                  onChange={e =>
                    setData(prev => ({ ...prev, flexibleDates: e.target.value === 'yes' }))
                  }
                  className={styles.select}
                >
                  <option value="yes">Dates are flexible (± 1-2 weeks)</option>
                  <option value="no">Exact dates fixed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Party Size & Travelers */}
        {currentStep === 3 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>Who is traveling in your party?</h3>
            <p className={styles.stepSub}>
              All our journeys are 100% private. We customize pacing to suit your specific party.
            </p>
            <div className={styles.optionsGrid}>
              {[
                { icon: '🥂', type: 'Couples / Romance', desc: 'Private suites, candlelit dinners, tranquil Dahabiya' },
                { icon: '👨‍👩‍👧‍👦', type: 'Family with Children', desc: 'Kid-friendly Egyptologist treasure hunts & resorts' },
                { icon: '🧭', type: 'Solo Discerning Traveler', desc: 'Dedicated personal guide, driver & full flexibility' },
                { icon: '🏛️', type: 'Private Friends / Group', desc: 'Full vessel charter or private villa experiences' }
              ].map(item => (
                <div
                  key={item.type}
                  onClick={() => setData(prev => ({ ...prev, travelerType: item.type }))}
                  className={`${styles.optionCard} ${
                    data.travelerType === item.type ? styles.optionCardActive : ''
                  }`}
                >
                  <div className={styles.optionIcon}>{item.icon}</div>
                  <h4 className={styles.optionTitle}>{item.type}</h4>
                  <p className={styles.optionDesc}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.formGroup}>
              <label>Number of Guests</label>
              <select
                value={data.partySize}
                onChange={e => setData(prev => ({ ...prev, partySize: e.target.value }))}
                className={styles.select}
              >
                <option value="1 Traveler (Solo)">1 Traveler (Solo)</option>
                <option value="2 Travelers (Couples)">2 Travelers (Couples)</option>
                <option value="3 Travelers">3 Travelers</option>
                <option value="4 Travelers (Family)">4 Travelers (Family)</option>
                <option value="5-8 Travelers (Small Group)">5-8 Travelers (Small Group)</option>
                <option value="9+ Travelers (Private Charter)">9+ Travelers (Private Charter)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Interests & Experiences */}
        {currentStep === 4 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>What passions define your voyage?</h3>
            <p className={styles.stepSub}>
              Select all activities you would like integrated into your bespoke itinerary.
            </p>
            <div className={styles.destChips}>
              {[
                'Antiquities & Royal Tombs',
                'Nile Sailing / Dahabiya',
                'Grand Egyptian Museum VIP',
                'Hot Air Balloon Sunrise',
                'Desert Safaris & Stargazing',
                'Red Sea Diving & Coral Reefs',
                'Authentic Nubian Encounters',
                'Historic Culinary & Food Tours',
                'Relaxation & Five-Star Spas'
              ].map(interest => {
                const active = data.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`${styles.destChip} ${active ? styles.destChipActive : ''}`}
                  >
                    <span>{interest}</span>
                    <span>{active ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Travel Style & Budget Guidance */}
        {currentStep === 5 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>Preferred Hospitality & Style</h3>
            <p className={styles.stepSub}>
              Select your desired accommodation standard and preliminary budget guidance.
            </p>
            <div className={styles.optionsGrid}>
              {[
                {
                  title: 'Ultra Luxury 5★ Suites',
                  desc: 'Four Seasons, St. Regis, Sofitel Old Cataract Palace, Private Dahabiya'
                },
                {
                  title: 'Boutique Heritage & River Yacht',
                  desc: 'Intimate historical hotels, exclusive 6-suite Dahabiya sailings'
                },
                {
                  title: 'Classic 5★ Comfort',
                  desc: 'Deluxe international 5-star hotels & modern luxury river cruisers'
                }
              ].map(style => (
                <div
                  key={style.title}
                  onClick={() => setData(prev => ({ ...prev, travelStyle: style.title }))}
                  className={`${styles.optionCard} ${
                    data.travelStyle === style.title ? styles.optionCardActive : ''
                  }`}
                >
                  <div className={styles.optionIcon}>👑</div>
                  <h4 className={styles.optionTitle}>{style.title}</h4>
                  <p className={styles.optionDesc}>{style.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.formGroup}>
              <label>Estimated Target Budget (Per Person, Excluding International Airfare)</label>
              <select
                value={data.budgetPerPerson}
                onChange={e => setData(prev => ({ ...prev, budgetPerPerson: e.target.value }))}
                className={styles.select}
              >
                <option value="$2,000 - $3,500 / person">$2,000 – $3,500 / person (Classic Luxury)</option>
                <option value="$3,500 - $6,000 / person">$3,500 – $6,000 / person (Signature Egypt)</option>
                <option value="$6,000 - $10,000+ / person">$6,000 – $10,000+ / person (Ultra Luxury & Dahabiya)</option>
                <option value="Flexible / Undecided">Flexible / Open to Curator Recommendations</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 6: Guest Contact Details */}
        {currentStep === 6 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>Where shall we dispatch your itinerary?</h3>
            <p className={styles.stepSub}>
              Your information is guarded under our strict client confidentiality charter.
            </p>
            <div className={styles.fieldsGrid}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={e => setData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="e.g. Lord Charles Sterling"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. sterling@luxuryvoyage.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone / WhatsApp (with Country Code) *</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={e => setData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+44 7911 123456"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Country of Residence</label>
                <input
                  type="text"
                  value={data.country}
                  onChange={e => setData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="United Kingdom / United States"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Special Curiosities, Milestones or Accessibility Notes</label>
              <textarea
                rows={3}
                value={data.specialRequests}
                onChange={e => setData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Anniversary celebrations, interest in private tomb openings, dietary needs, or specific Egyptology topics..."
                className={styles.textarea}
              />
            </div>
          </div>
        )}

        {/* Step 7: Blueprint Review & Submit */}
        {currentStep === 7 && (
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>Review Your Bespoke Blueprint</h3>
            <p className={styles.stepSub}>
              Confirm your tailored specifications before our Curatorial Directorate drafts your proposal.
            </p>

            <div className={styles.reviewBox}>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Guest Name:</span>
                <span className={styles.reviewValue}>{data.fullName}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Email & Phone:</span>
                <span className={styles.reviewValue}>{data.email} • {data.phone}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Destinations:</span>
                <span className={styles.reviewValue}>{data.destinations.join(', ')}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Duration & Timing:</span>
                <span className={styles.reviewValue}>
                  {data.duration} {data.travelDates ? `(Target: ${data.travelDates})` : ''}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Party:</span>
                <span className={styles.reviewValue}>{data.partySize} ({data.travelerType})</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Interests:</span>
                <span className={styles.reviewValue}>{data.interests.join(', ')}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Hospitality Standard:</span>
                <span className={styles.reviewValue}>{data.travelStyle}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Target Budget:</span>
                <span className={styles.reviewValue}>{data.budgetPerPerson}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={styles.btnRow}>
          {currentStep > 1 && (
            <button type="button" onClick={handleBack} className={styles.backBtn}>
              ← Back
            </button>
          )}

          {currentStep < totalSteps ? (
            <button type="button" onClick={handleNext} className={styles.nextBtn}>
              Continue to Step {currentStep + 1} →
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className={styles.nextBtn}>
              {isSubmitting ? 'Transmitting Request...' : 'Submit Bespoke Inquiry ✦'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
