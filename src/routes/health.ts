import { Router, Request, Response } from 'express';

const router = Router();

// We'll inject the Discord service status
let discordStatus = { connected: false };

export function setDiscordStatus(connected: boolean): void {
  discordStatus.connected = connected;
}

router.get('/health', (_req: Request, res: Response) => {
  const status = discordStatus.connected ? 'ok' : 'degraded';
  const statusCode = discordStatus.connected ? 200 : 503;

  res.status(statusCode).json({
    status,
    timestamp: new Date().toISOString(),
    service: 'discord-x-journal',
    services: {
      express: 'ok',
      discord: discordStatus.connected ? 'connected' : 'disconnected',
    },
  });
});

export default router;
