# GigaJoyce Node.js Rewrite

A modern, modular, and scalable Discord bot framework rewritten in Node.js (JavaScript ESM), based on the [GigaJoyce](https://github.com/TechJoyceLearning/GigaJoyce) Python framework.

## 🚀 Features

- **Plug-and-Play Modularity**: Add or remove features by simply dropping folders into the `modules/` directory.
- **Granular Handling**: Dedicated handlers for modules, commands, and events.
- **Persistent Storage**: Fast and reliable local data management using `better-sqlite3`.
- **Localization (i18n)**: Built-in support for multiple languages with user-specific preferences.
- **XP & Leveling System**: Integrated engagement system with automated leveling and rank tracking.
- **Settings Framework**: Global and module-specific configuration managed via the database.
- **Centralized Logging**: Consistent and informative console logging for easier debugging.

## 📂 Folder Structure

```text
sugoiBot/
├── main.js             # Entry point
├── deploy-commands.js  # Slash command registration script
├── handlers/           # Module, Command, and Event loaders
├── lib/
│   ├── bot/            # Core client and Logger
│   ├── classes/        # Future core class definitions
│   ├── utils/          # Formatting and helper functions
│   ├── database.js     # SQLite initialization
│   ├── settings.js     # Settings management logic
│   └── locales.js      # Translation engine
├── modules/            # Feature-specific modules
│   ├── core/           # Essential bot logic (Settings, Language)
│   ├── general/        # Standard commands (Ping)
│   └── xp/             # Leveling and engagement logic
├── locales/            # Translation JSON files (en, es, etc.)
├── settings/           # Configuration schemas and base settings
└── data/               # Persistent SQLite database storage
```

## 🛠️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Discord Bot Token (from [Discord Developer Portal](https://discord.com/developers/applications))

### Installation
1. Clone the repository and navigate to the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_bot_client_id
   ```
4. Deploy Slash Commands:
   ```bash
   npm run deploy
   ```
5. Start the bot:
   ```bash
   npm start
   ```

## 🧩 Adding a Module

To create a new module (e.g., `Economy`):
1. Create a folder `modules/economy/`.
2. Add an `index.js` to define the module:
   ```javascript
   export default { name: 'Economy', description: 'Money management.' };
   ```
3. Add commands in `modules/economy/commands/` and events in `modules/economy/events/`.
4. The bot will automatically load them on the next startup.

