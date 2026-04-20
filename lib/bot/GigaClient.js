import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { logger } from './logger.js';

export class GigaClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.commands = new Collection();
        this.modules = new Collection();
        this.logger = logger;
    }
}
