import app from './app';
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
  console.log(
    `[vibes-of-egypt-api] Server listening on port ${env.PORT} (${env.NODE_ENV})`
  );
});

function shutdown(signal: string): void {
  console.log(`[vibes-of-egypt-api] Received ${signal}, shutting down gracefully...`);
  server.close((err) => {
    if (err) {
      console.error('[vibes-of-egypt-api] Error during shutdown:', err);
      process.exit(1);
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
