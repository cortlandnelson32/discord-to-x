import { Message } from 'discord.js';

export interface JournalMessage {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    tag: string;
  };
  timestamp: Date;
  channelId: string;
}

export function isValidJournalMessage(message: Message): boolean {
  // Ignore bot messages
  if (message.author.bot) return false;

  // Ignore empty messages
  if (!message.content || message.content.trim().length === 0) return false;

  // Ignore Discord commands (messages starting with !)
  if (message.content.startsWith('!')) return false;

  return true;
}

export function parseJournalMessage(message: Message): JournalMessage {
  return {
    id: message.id,
    content: message.content,
    author: {
      id: message.author.id,
      username: message.author.username,
      tag: message.author.tag,
    },
    timestamp: message.createdAt,
    channelId: message.channelId,
  };
}
