import React, { useRef, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { adminClient } from '@/api/adminClient';
import { useToast } from '@/context/ToastContext';
import type { UploadFolder } from '@/types/admin';

interface GalleryUploadFieldProps {
  label?: string;
  values: string[];
  onChange: (urls: string[]) => void;
  folder: UploadFolder;
}

function extractStoragePathFromUrl(url: string): string | null {
  const marker = '/vibes-of-egypt-media/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length).split('?')[0] || null;
}

export const GalleryUploadField: React.FC<GalleryUploadFieldProps> = ({
  label = 'Gallery Images',
  values,
  onChange,
  folder,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlDraft, setUrlDraft] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const res = await adminClient.upload<{ data: { url: string; path: string } }>(
        '/uploads/image',
        formData,
        { folder }
      );
      onChange([...values, res.data.url]);
      showSuccess('Gallery image uploaded.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Gallery image upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddUrl = () => {
    const trimmed = urlDraft.trim();
    if (!trimmed) return;
    onChange([...values, trimmed]);
    setUrlDraft('');
  };

  const handleRemove = async (index: number) => {
    const url = values[index];
    const storagePath = extractStoragePathFromUrl(url);
    if (storagePath) {
      try {
        await adminClient.delete('/uploads/image', { path: storagePath });
      } catch {
        // Still remove from gallery list if storage object was already removed
      }
    }
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input"
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          placeholder="Paste image URL to add..."
        />
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddUrl}>
          <Plus size={14} />
          Add URL
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={14} />
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {values.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '0.65rem',
            marginTop: '0.55rem',
          }}
        >
          {values.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}
            >
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                style={{ width: '100%', height: 74, objectFit: 'cover', display: 'block' }}
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: 4,
                  cursor: 'pointer',
                  display: 'inline-flex',
                }}
                aria-label="Remove gallery image"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
