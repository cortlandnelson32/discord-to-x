import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  discord: {
    botToken: string;
    journalChannelId: string;
    outputChannelId: string;
  };
  twitter: {
    apiKey: string;
    apiSecret: string;
    accessToken: string;
    accessSecret: string;
  };
}

function validateEnv(): Config {
  const required = [
    'DISCORD_BOT_TOKEN',
    'DISCORD_JOURNAL_CHANNEL_ID',
    'DISCORD_OUTPUT_CHANNEL_ID',
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    discord: {
      botToken: process.env.DISCORD_BOT_TOKEN!,
      journalChannelId: process.env.DISCORD_JOURNAL_CHANNEL_ID!,
      outputChannelId: process.env.DISCORD_OUTPUT_CHANNEL_ID!,
    },
    twitter: {
      apiKey: process.env.TWITTER_API_KEY!,
      apiSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    },
  };
}

export const config = validateEnv();
