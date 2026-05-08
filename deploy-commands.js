import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function deployCommands() {
    const commands = [];
    const modulesPath = path.join(process.cwd(), 'modules');
    
    if (!fs.existsSync(modulesPath)) return;

    const modules = fs.readdirSync(modulesPath).filter(f => 
        fs.statSync(path.join(modulesPath, f)).isDirectory()
    );

    for (const moduleName of modules) {
        const commandsPath = path.join(modulesPath, moduleName, 'commands');
        if (fs.existsSync(commandsPath)) {
            const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
            for (const file of commandFiles) {
                const commandUrl = pathToFileURL(path.join(commandsPath, file)).href;
                const command = (await import(commandUrl)).default;
                if (command.data) {
                    commands.push(command.data.toJSON());
                }
            }
        }
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The user specifically asked to delete existing ones first.
        // Putting an empty array to the global endpoint clears them.
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [] },
        );
        console.log('Successfully cleared existing application (/) commands.');

        // Now deploy the fresh ones.
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
}

// Allow running directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    deployCommands();
}
