import { useEffect } from 'react';

export interface PageMetaOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const DEFAULT_TITLE = 'Vibes of Egypt — Curated Luxury Travel & Private Tours';
const DEFAULT_DESCRIPTION =
  'Experience the timeless majesty of Egypt with bespoke private tours, luxury Nile Dahabiya charters, and curated cultural expeditions.';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80';

/**
 * Custom hook for dynamic page SEO title, description, Open Graph, and Twitter metadata.
 */
export function usePageMeta({
  title,
  description,
  image,
  type = 'website'
}: PageMetaOptions) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title
      ? `${title} | Vibes of Egypt`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper to safely update or append <meta>
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const finalDesc = description || DEFAULT_DESCRIPTION;
    const finalImg = image || DEFAULT_IMAGE;
    const currentUrl = window.location.href;

    // Primary Meta
    setMeta('name', 'description', finalDesc);

    // Open Graph
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', formattedTitle);
    setMeta('property', 'og:description', finalDesc);
    setMeta('property', 'og:image', finalImg);
    setMeta('property', 'og:url', currentUrl);

    // Twitter Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', formattedTitle);
    setMeta('name', 'twitter:description', finalDesc);
    setMeta('name', 'twitter:image', finalImg);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl.split('?')[0];
  }, [title, description, image, type]);
}
