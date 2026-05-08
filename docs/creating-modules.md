# Creating Modules

SugoiBot makes it easy to add new features by creating a module.

## 📂 Structure

Each module lives in the `modules/` directory:

```text
modules/my-module/
├── index.js           # Module metadata and settings
├── commands/          # Slash commands
│   └── hello.js
└── events/            # Event listeners
    └── messageCreate.js
```

## 📄 index.js

The `index.js` file should export a default object with `name` and `description`. You can also define `settings` here.

```javascript
export default {
    name: 'Greetings',
    description: 'Simple greeting commands.',
    settings: [
        { key: 'greet_message', description: 'The message to send.', type: 'string', defaultValue: 'Hello!' }
    ]
};
```

## ⌨️ Commands

Commands should export a default object with `data` (SlashCommandBuilder) and an `execute` function.

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Greets the user'),
    async execute(interaction) {
        await interaction.reply('Hello there!');
    }
};
```

## 🔔 Events

Events should export a default object with `name` and `execute`.

```javascript
import { Events } from 'discord.js';

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        console.log(`New message: ${message.content}`);
    }
};
```

## 🧪 Member Class

Use the `Member` class in `lib/classes/Member.js` to easily interact with user data (XP, Economy, Warnings) in your modules.
