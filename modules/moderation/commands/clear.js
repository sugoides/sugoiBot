import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Bulk deletes messages from the channel.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Number of messages to clear (1-100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true).then(messages => {
            interaction.reply({ content: `Successfully deleted ${messages.size} messages.`, ephemeral: true });
        }).catch(err => {
            console.error(err);
            interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
        });
    },
};
