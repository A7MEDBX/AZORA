import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, PageBanner } from '@/components/ui';
import { TripPlanner } from '@/features/trip-planner';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './PlanYourTrip.module.css';

export default function PlanYourTripPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Plan Your Bespoke Egyptian Journey',
    description:
      'Collaborate with our senior Egyptologist curators to design an entirely custom private voyage tailored to your personal rhythm and curiosities.'
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Bespoke Travel Atelier"
        title={t('btn_plan_trip', 'Plan Your Journey')}
        subtitle="Collaborate with our senior Egyptologist curators to design an entirely custom private voyage tailored to your personal rhythm and curiosities."
      />

      <section className={styles.plannerSection}>
        <Container size="narrow">
          <TripPlanner />
        </Container>
      </section>
    </div>
  );
}
