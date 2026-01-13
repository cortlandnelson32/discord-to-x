import { createServer, startServer } from './server';
import { DiscordService } from './services/discord.service';
import { logger } from './utils/logger';

async function main() {
  try {
    logger.info('Starting Discord ↔ X Journal System...');

    // Start Express server
    const app = createServer();
    startServer(app);

    // Start Discord bot
    const discordService = new DiscordService();
    await discordService.start();

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down gracefully...');
      await discordService.stop();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    logger.info('All services started successfully');
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

main();
