import { EmbedBuilder } from 'discord.js';
import { SettingsManager } from '../settings.js';

export const loggingService = {
    /**
     * Log an event to the configured log channel
     * @param {import('discord.js').Guild} guild 
     * @param {object} options 
     */
    async log(guild, { title, description, color = 0x00AE86, fields = [] }) {
        const logChannelId = SettingsManager.get('log_channel_id');
        if (!logChannelId) return;

        const channel = await guild.channels.fetch(logChannelId).catch(() => null);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description || 'No description provided')
            .setColor(color)
            .setTimestamp();

        if (fields.length > 0) {
            embed.addFields(fields);
        }

        try {
            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(`[ERROR] Failed to send log to channel ${logChannelId}:`, error);
        }
    }
};
