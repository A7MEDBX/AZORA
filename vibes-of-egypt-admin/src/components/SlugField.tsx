import React from 'react';

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

interface SlugFieldProps {
  value: string;
  onChange: (value: string) => void;
  sourceText: string;
  isEditMode: boolean;
  error?: string;
}

export const SlugField: React.FC<SlugFieldProps> = ({
  value,
  onChange,
  sourceText,
  isEditMode,
  error,
}) => {
  return (
    <div className="field">
      <label className="field-label">
        URL Slug <span className="field-required">*</span>
      </label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className={`input${error ? ' input-error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. cairo-giza"
          required
        />
        {!isEditMode && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onChange(slugify(sourceText))}
            title="Regenerate slug from title/name"
          >
            Generate
          </button>
        )}
      </div>
      {error ? (
        <span className="field-error">{error}</span>
      ) : (
        <span className="field-hint">Lowercase kebab-case identifier used in public URLs.</span>
      )}
    </div>
  );
};
