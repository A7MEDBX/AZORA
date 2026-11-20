import React, { useState } from 'react';
import styles from './UI.module.css';

export interface AccordionItemData {
  id?: string | number;
  question: string;
  answer: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggleItem = (idx: number) => {
    if (allowMultiple) {
      setOpenIndices(prev =>
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndices(prev => (prev.includes(idx) ? [] : [idx]));
    }
  };

  return (
    <div className={`${styles.accordionList} ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={item.id ?? idx}
            className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
          >
            <button
              type="button"
              className={styles.accordionTrigger}
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className={styles.accordionContent}>
                {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
