import Link from '@/lib/next-shim';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 1.5rem',
      background: 'var(--color-bg-primary)'
    }}>
      <span style={{
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'var(--color-egyptian-gold)',
        fontWeight: 700,
        marginBottom: '0.75rem'
      }}>
        Error 404 — Desert Mirage
      </span>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '3.5rem',
        fontWeight: 700,
        color: 'var(--color-midnight-black)',
        marginBottom: '1rem'
      }}>
        Lost Among the Sands
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--color-gray-600)',
        maxWidth: '32rem',
        marginBottom: '2.5rem',
        lineHeight: 1.6
      }}>
        The ancient tomb or sanctuary you are seeking appears to have shifted with the desert winds.
      </p>
      <Link href="/" style={{
        background: 'var(--color-egyptian-gold)',
        color: 'var(--color-midnight-black)',
        fontWeight: 700,
        padding: '0.85rem 2rem',
        borderRadius: '9999px',
        textDecoration: 'none'
      }}>
        Return to the Nile Riverbank
      </Link>
    </div>
  );
}

