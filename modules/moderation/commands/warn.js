import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import db from '../../../lib/database.js';

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a member and stores it in the database.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The member to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for warning')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const moderator = interaction.user;

        db.prepare('INSERT INTO warnings (userId, guildId, reason, moderatorId) VALUES (?, ?, ?, ?)').run(
            target.id,
            interaction.guild.id,
            reason,
            moderator.id
        );

        const warningCount = db.prepare('SELECT COUNT(*) as count FROM warnings WHERE userId = ? AND guildId = ?').get(target.id, interaction.guild.id).count;

        await interaction.reply({ content: `Successfully warned ${target.tag} for: ${reason}. They now have ${warningCount} warning(s).` });
    },
};
