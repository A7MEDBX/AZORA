import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface StringListInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
}

export const StringListInput: React.FC<StringListInputProps> = ({
  label,
  values,
  onChange,
  placeholder = 'Add item...',
  error,
}) => {
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...values, trimmed]);
    setDraft('');
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
        />
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleAdd}>
          <Plus size={15} />
          Add
        </button>
      </div>

      {values.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
          {values.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                padding: '0.45rem 0.7rem',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.84rem',
              }}
            >
              <span>{item}</span>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemove(idx)}
                aria-label="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
