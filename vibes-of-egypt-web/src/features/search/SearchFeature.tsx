import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import type { SearchResultItem } from '@/lib/catalog';
import { searchCatalogApi } from '@/services/catalogService';
import { EmptyState } from '@/components/ui';
import styles from './SearchFeature.module.css';

type SearchCategory = 'All' | 'Destination' | 'Tour' | 'Package' | 'Cruise' | 'Experience' | 'Article';

export const SearchFeature: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as SearchCategory) || 'All';

  const [inputVal, setInputVal] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>(categoryParam);

  // Sync internal state with URL query parameters
  useEffect(() => {
    setInputVal(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  // Execute cross-catalog search via API (or mock fallback when VITE_USE_MOCK_DATA=true)
  const [allResults, setAllResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (!queryParam.trim()) {
      setAllResults([]);
      return;
    }

    searchCatalogApi(queryParam)
      .then((results) => {
        if (!cancelled) setAllResults(results);
      })
      .catch(() => {
        if (!cancelled) setAllResults([]);
      });

    return () => {
      cancelled = true;
    };
  }, [queryParam]);

  // Filter results by selected category tab
  const filteredResults = useMemo(() => {
    if (selectedCategory === 'All') return allResults;
    return allResults.filter(item => item.type === selectedCategory);
  }, [allResults, selectedCategory]);

  // Compute category counts for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allResults.length };
    allResults.forEach(item => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    return counts;
  }, [allResults]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    const params: Record<string, string> = {};
    if (trimmed) params.q = trimmed;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    setSearchParams(params);
  };

  const handleTabChange = (cat: SearchCategory) => {
    setSelectedCategory(cat);
    const params: Record<string, string> = {};
    if (queryParam) params.q = queryParam;
    if (cat !== 'All') params.category = cat;
    setSearchParams(params);
  };

  const handleClear = () => {
    setInputVal('');
    setSelectedCategory('All');
    setSearchParams({});
  };

  const tabs: SearchCategory[] = [
    'All',
    'Destination',
    'Tour',
    'Package',
    'Cruise',
    'Experience',
    'Article'
  ];

  return (
    <div className={styles.searchWrap}>
      {/* Search Input Bar */}
      <div className={styles.searchBarContainer}>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Search pyramids, Luxor, Nile cruises, dahabiya, diving..."
            className={styles.searchInput}
            aria-label="Search catalog"
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      {/* Category Tabs */}
      {queryParam && (
        <div className={styles.categoryTabs}>
          {tabs.map(cat => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ''}`}
              >
                <span>{cat === 'All' ? 'All Results' : `${cat}s`}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Results Header */}
      {queryParam && (
        <div className={styles.resultsMeta}>
          <span className={styles.resultsCount}>
            Found <strong>{filteredResults.length}</strong> matching{' '}
            {selectedCategory === 'All' ? 'items' : `${selectedCategory.toLowerCase()}s`} for &ldquo;
            <strong>{queryParam}</strong>&rdquo;
          </span>
          <button onClick={handleClear} className={styles.clearBtn}>
            Clear Search
          </button>
        </div>
      )}

      {/* Results Grid or EmptyState */}
      {filteredResults.length > 0 ? (
        <div className={styles.resultsGrid}>
          {filteredResults.map(item => (
            <Link key={`${item.type}-${item.id}`} to={item.url} className={styles.resultCard}>
              <img src={item.image} alt={item.title} className={styles.resultImg} loading="lazy" />
              <div className={styles.resultBody}>
                <div className={styles.resultHeader}>
                  <span className={styles.typeBadge}>{item.type}</span>
                  <span className={styles.categoryText}>{item.category}</span>
                </div>
                <h3 className={styles.resultTitle}>{item.title}</h3>
                <p className={styles.resultSnippet}>{item.snippet}</p>
                <span className={styles.resultLink}>Explore Details →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : queryParam ? (
        <EmptyState
          icon="🏺"
          title="No Artifacts or Journeys Found"
          description={`We couldn't locate any matching ${
            selectedCategory === 'All' ? 'catalog items' : selectedCategory.toLowerCase() + 's'
          } for "${queryParam}". Try checking spelling or searching for Cairo, Nile, Luxor, or Dahabiya.`}
          actionText="Browse All Destinations"
          actionTo="/destinations"
        />
      ) : (
        <EmptyState
          icon="✨"
          title="Begin Your Egyptian Exploration"
          description="Enter keywords above to search across our accredited private tours, five-star Nile cruises, curated multi-day packages, and archaeological essays."
          actionText="Explore Featured Tours"
          actionTo="/tours"
        />
      )}
    </div>
  );
};
