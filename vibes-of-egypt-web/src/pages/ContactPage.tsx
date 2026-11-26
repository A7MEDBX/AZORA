import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, PageBanner, Button, FormField } from '@/components/ui';
import { ApiClientError } from '@/api/client';
import { submitContactInquiry } from '@/services/inquiriesService';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Contact.module.css';

export default function ContactPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Contact Our Concierge Desk',
    description:
      'Connect with our 24/7 bespoke travel concierge in Cairo for private Nile charters, Egyptologist bookings, and customized luxury itineraries.'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<'production' | 'dev'>('production');
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await submitContactInquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        inquiryType: 'general'
      });
      setSubmissionMode(result.mode);
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        if (err.status === 400 && Object.keys(err.fieldErrors).length > 0) {
          const mappedErrors: Record<string, string> = {};
          if (err.fieldErrors.fullName) mappedErrors.name = err.fieldErrors.fullName;
          if (err.fieldErrors.email) mappedErrors.email = err.fieldErrors.email;
          if (err.fieldErrors.phone) mappedErrors.phone = err.fieldErrors.phone;
          if (err.fieldErrors.message) mappedErrors.message = err.fieldErrors.message;
          setErrors(prev => ({ ...prev, ...mappedErrors }));
          setSubmissionError('Please review the highlighted fields below and try again.');
        } else if (err.isRateLimited) {
          setSubmissionError(err.message);
        } else {
          setSubmissionError(err.message);
        }
      } else {
        const msg = err instanceof Error ? err.message : 'Failed to send your message. Please try again.';
        setSubmissionError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Bespoke Concierge & Support"
        title={t('nav_contact', 'Contact Us')}
        subtitle="Our travel designers and guest experience managers are available 24/7 to answer your inquiries, customize itineraries, and ensure a seamless Egyptian journey."
      />

      {/* Contact Content */}
      <section className={styles.contentSection}>
        <Container size="standard" className={styles.layout}>
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
            {submitted ? (
              <div
                style={{
                  background: 'var(--color-bg-primary)',
                  padding: '3rem 2rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-gray-200)'
                }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>✨</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                  Message Received
                </h3>
                <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our concierge desk will review your inquiry and reply to <strong>{formData.email}</strong> within 12 hours.
                </p>

                {submissionMode === 'dev' && (
                  <div
                    style={{
                      background: 'rgba(217, 119, 6, 0.1)',
                      color: 'var(--color-egyptian-gold, #b45309)',
                      border: '1px dashed var(--color-egyptian-gold, #d97706)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.8125rem'
                    }}
                  >
                    🛠️ <strong>Dev Mode:</strong> Form submission logged to browser console. In production, set <code>VITE_FORM_ENDPOINT</code> in your environment variables.
                  </div>
                )}

                <Button
                  variant="primary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                    setSubmissionError(null);
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                <h3 className={styles.formHeading}>Send an Inquiry</h3>

                {submissionError && (
                  <div
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      border: '1px solid #f87171',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    ⚠️ {submissionError}
                  </div>
                )}

                <FormField label="Your Name" required error={errors.name}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Lord Harrington"
                    className={styles.input}
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="harrington@example.com"
                    className={styles.input}
                  />
                </FormField>

                <FormField label="Phone / WhatsApp Number" error={errors.phone}>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="+1 (555) 019-2834"
                    className={styles.input}
                  />
                </FormField>

                <FormField label="Message / Trip Details" required error={errors.message}>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                    }}
                    placeholder="How may we assist your upcoming voyage to Egypt?"
                    className={styles.textarea}
                  />
                </FormField>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Transmitting Message...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
