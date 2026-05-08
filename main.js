import 'dotenv/config';
import { GigaClient } from './lib/bot/GigaClient.js';
import { loadModules } from './handlers/moduleHandler.js';
import { deployCommands } from './deploy-commands.js';

const client = new GigaClient();

process.on('unhandledRejection', (reason, promise) => {
    client.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    client.logger.error('Uncaught Exception thrown:', error);
});

async function start() {
    client.logger.info('Starting Sugoi Bot...');
    await deployCommands();
    await loadModules(client);
    await client.login(process.env.DISCORD_TOKEN);
}

start().catch(err => client.logger.error('Bot failed to start:', err));
