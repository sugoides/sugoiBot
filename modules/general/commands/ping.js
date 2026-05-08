import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.reply(`Pong! Latency is ${latency}ms.`);
    },
};
