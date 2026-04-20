import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import db from '../../../lib/database.js';

export default {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Check your rank')
        .addUserOption(opt => opt.setName('user').setDescription('User to check')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const data = db.prepare('SELECT xp, level FROM xp WHERE userId = ?').get(user.id);

        if (!data) return interaction.reply({ content: 'No XP data.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Rank`)
            .addFields(
                { name: 'Level', value: String(data.level), inline: true },
                { name: 'XP', value: `${data.xp} / ${data.level * data.level * 100}`, inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
