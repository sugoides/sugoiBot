import { SlashCommandBuilder } from 'discord.js';
import { Member } from '../../../lib/classes/Member.js';

export default {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Checks your or another user\'s balance.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to check balance for')),
    async execute(interaction) {
        const target = interaction.options.getMember('target') ?? interaction.member;
        const targetUser = interaction.options.getUser('target') ?? interaction.user;
        
        const member = new Member(target);
        const balance = member.getBalance();

        await interaction.reply({ content: `${targetUser.id === interaction.user.id ? 'Your' : `${targetUser.tag}'s`} balance is **${balance}** coins.` });
    },
};
