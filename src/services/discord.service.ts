import { Client, GatewayIntentBits, Events, Message } from 'discord.js';
import { config } from '../config/env';
import { logger } from '../utils/logger';
import { isValidJournalMessage, parseJournalMessage } from '../types/discord';

export class DiscordService {
  private client: Client;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Bot ready event
    this.client.once(Events.ClientReady, (client) => {
      this.isReady = true;
      logger.info(`Discord bot logged in as ${client.user.tag}`);
      logger.info(`Monitoring journal channel: ${config.discord.journalChannelId}`);
    });

    // Message creation event
    this.client.on(Events.MessageCreate, async (message: Message) => {
      await this.handleMessage(message);
    });

    // Error handling
    this.client.on(Events.Error, (error) => {
      logger.error('Discord client error', error);
    });

    // Warn events (rate limits, etc.)
    this.client.on(Events.Warn, (info) => {
      logger.warn('Discord client warning', { info });
    });
  }

  private async handleMessage(message: Message): Promise<void> {
    try {
      // Only process messages from the journal channel
      if (message.channelId !== config.discord.journalChannelId) {
        return;
      }

      // Validate message
      if (!isValidJournalMessage(message)) {
        logger.debug('Skipping invalid message', {
          author: message.author.tag,
          isBot: message.author.bot,
          contentLength: message.content.length,
        });
        return;
      }

      // Parse message
      const journalMessage = parseJournalMessage(message);

      logger.info('New journal message received', {
        author: journalMessage.author.tag,
        preview: journalMessage.content.substring(0, 50) + '...',
        messageId: journalMessage.id,
      });

      // TODO: In Phase 3, we'll send this to Twitter
      // For now, just log it
      logger.info('Message ready for Twitter posting', {
        content: journalMessage.content,
      });
    } catch (error) {
      logger.error('Error handling Discord message', error);
    }
  }

  public async start(): Promise<void> {
    try {
      logger.info('Starting Discord bot...');
      await this.client.login(config.discord.botToken);
    } catch (error) {
      logger.error('Failed to start Discord bot', error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (this.isReady) {
      logger.info('Stopping Discord bot...');
      this.client.destroy();
      this.isReady = false;
    }
  }

  public getClient(): Client {
    return this.client;
  }

  public isConnected(): boolean {
    return this.isReady;
  }
}
