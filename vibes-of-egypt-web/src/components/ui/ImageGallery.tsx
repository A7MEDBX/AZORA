import React, { useState } from 'react';
import { Modal } from './Modal';
import styles from './UI.module.css';

export type GalleryImageItem = string | { src: string; alt?: string; caption?: string };

export interface ImageGalleryProps {
  images: GalleryImageItem[];
  className?: string;
  alt?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className = '', alt: defaultAlt }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const normalizedImages = images.map((img) =>
    typeof img === 'string' ? { src: img, alt: defaultAlt || 'Gallery photo' } : img
  );

  return (
    <>
      <div className={`${styles.galleryGrid} ${className}`}>
        {normalizedImages.map((img, idx) => (
          <div
            key={idx}
            className={styles.galleryItem}
            onClick={() => setActiveImage(img.src)}
            role="button"
            tabIndex={0}
            aria-label={`View image: ${img.alt || 'Gallery photo'}`}
          >
            <img src={img.src} alt={img.alt || defaultAlt || 'Egypt antiquity photo'} className={styles.galleryImage} />
          </div>
        ))}
      </div>

      <Modal isOpen={!!activeImage} onClose={() => setActiveImage(null)}>
        {activeImage && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={activeImage}
              alt="Expanded preview"
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '0.5rem' }}
            />
          </div>
        )}
      </Modal>
    </>
  );
};
