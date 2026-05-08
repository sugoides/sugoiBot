import { Events } from 'discord.js';
import { loggingService } from '../../../lib/bot/loggingService.js';

export default {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.author?.bot || !message.guild) return;

        await loggingService.log(message.guild, {
            title: 'Message Deleted',
            description: `A message by ${message.author} was deleted in ${message.channel}.`,
            color: 0xFF0000,
            fields: [
                { name: 'Content', value: message.content?.substring(0, 1024) || '*No content (possibly an embed or attachment)*' }
            ]
        });
    },
};
