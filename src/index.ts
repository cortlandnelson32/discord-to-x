import { createServer, startServer } from './server';
import { logger } from './utils/logger';

async function main() {
  try {
    logger.info('Starting Discord ↔ X Journal System...');

    const app = createServer();
    startServer(app);

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully...');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully...');
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

main();
