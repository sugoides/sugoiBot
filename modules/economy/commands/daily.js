import { SlashCommandBuilder } from 'discord.js';
import { Member } from '../../../lib/classes/Member.js';
import { SettingsManager } from '../../../lib/settings.js';

export default {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claims your daily reward.'),
    async execute(interaction) {
        const member = new Member(interaction.member);
        const dailyAmount = SettingsManager.getJson('daily_amount', 100);
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        const data = member.getEconomy();

        if (now - data.lastDaily < oneDay) {
            const timeLeft = oneDay - (now - data.lastDaily);
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            return interaction.reply({ content: `You've already claimed your daily reward. Try again in ${hours}h ${minutes}m.`, ephemeral: true });
        }

        member.claimDaily(dailyAmount, now);

        await interaction.reply({ content: `You've claimed your daily reward of **${dailyAmount}** coins!` });
    },
};
