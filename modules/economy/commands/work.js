import { SlashCommandBuilder } from 'discord.js';
import { Member } from '../../../lib/classes/Member.js';
import { SettingsManager } from '../../../lib/settings.js';

export default {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Works to earn some coins.'),
    async execute(interaction) {
        const member = new Member(interaction.member);
        const workMin = SettingsManager.getJson('work_min', 10);
        const workMax = SettingsManager.getJson('work_max', 50);
        const cooldown = 60 * 60 * 1000; // 1 hour cooldown
        const now = Date.now();

        const data = member.getEconomy();

        if (now - data.lastWork < cooldown) {
            const timeLeft = cooldown - (now - data.lastWork);
            const minutes = Math.floor(timeLeft / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            return interaction.reply({ content: `You're too tired to work. Try again in ${minutes}m ${seconds}s.`, ephemeral: true });
        }

        const earned = Math.floor(Math.random() * (workMax - workMin + 1)) + workMin;

        member.claimWork(earned, now);

        const jobs = [
            'as a software developer',
            'as a designer',
            'as a chef',
            'as a delivery driver',
            'as a teacher',
            'cleaning the streets'
        ];
        const job = jobs[Math.floor(Math.random() * jobs.length)];

        await interaction.reply({ content: `You worked ${job} and earned **${earned}** coins!` });
    },
};
