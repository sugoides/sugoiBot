import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Member } from '../../../lib/classes/Member.js';

export default {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Check your rank')
        .addUserOption(opt => opt.setName('user').setDescription('User to check')),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;
        const targetMember = interaction.options.getMember('user') || interaction.member;

        const member = new Member(targetMember);
        const data = member.getXP();

        const getNeededXP = (lvl) => lvl * lvl * 100;

        const embed = new EmbedBuilder()
            .setTitle(`${targetUser.username}'s Rank`)
            .addFields(
                { name: 'Level', value: String(data.level), inline: true },
                { name: 'XP', value: `${data.xp} / ${getNeededXP(data.level)}`, inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
