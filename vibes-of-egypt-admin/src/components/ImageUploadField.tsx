import React, { useRef, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { adminClient } from '@/api/adminClient';
import { useToast } from '@/context/ToastContext';
import type { UploadFolder } from '@/types/admin';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  required?: boolean;
  error?: string;
}

function extractStoragePathFromUrl(url: string): string | null {
  const marker = '/vibes-of-egypt-media/';
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length).split('?')[0] || null;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  folder,
  required = false,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setUploadedPath(res.data.path);
      onChange(res.data.url);
      showSuccess('Image uploaded to Supabase Storage.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    const storagePath = uploadedPath ?? extractStoragePathFromUrl(value);
    if (storagePath) {
      try {
        await adminClient.delete('/uploads/image', { path: storagePath });
        showSuccess('Uploaded image deleted from storage.');
      } catch (err: unknown) {
        showError(err instanceof Error ? err.message : 'Failed to delete image from storage.');
      }
    }
    setUploadedPath(null);
    onChange('');
  };

  return (
    <div className="field">
      <label className="field-label">
        {label}
        {required && <span className="field-required">*</span>}
      </label>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          className={`input${error ? ' input-error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL or upload file..."
          required={required}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
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

      {value && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '0.45rem',
            padding: '0.5rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: 72,
              height: 50,
              objectFit: 'cover',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {value}
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleRemove}
            title="Remove image"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
