import 'dotenv/config';
import { GigaClient } from './lib/bot/GigaClient.js';
import { loadModules } from './handlers/moduleHandler.js';
import { loadLocales } from './lib/locales.js';

const client = new GigaClient();

async function start() {
    client.logger.info('Starting Sugoi Bot...');
    loadLocales();
    await loadModules(client);
    await client.login(process.env.DISCORD_TOKEN);
}

start().catch(err => client.logger.error('Bot failed to start:', err));
