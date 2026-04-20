import { SlashCommandBuilder } from 'discord.js';
import { translate } from '../../../lib/locales.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.reply(translate(interaction.user.id, 'ping_response', { latency }));
    },
};
