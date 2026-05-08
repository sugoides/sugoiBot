# Project TODOs

## 🔴 High Priority
- [x] **Error Handling**: Implement a more robust global error handler to prevent bot crashes on unhandled rejections.
- [x] **Cooldowns**: Add a cooldown system to commands to prevent spamming.
- [x] **Validation**: Add validation for settings (e.g., ensure `xp_min` is a number).

## 🟡 Medium Priority
- [x] **Moderation Module**: Implement basic moderation commands (`kick`, `ban`, `clear`, `warn`).
- [x] **Economy Module**: Add a basic currency system (balance, daily, work).
- [x] **Logging Service**: Implement a dedicated logging channel for bot events (guild join, command usage).
- [x] **Member Classes**: Create a `Member` class in `lib/classes` to abstract database calls for user data.

## 🟢 Low Priority
- [x] **Web Dashboard**: Create a basic Express.js backend to serve a settings dashboard.
- [x] **MkDocs Integration**: Set up an automated documentation generator based on module `index.js` files.
- [x] **Unit Tests**: Add Jest or Vitest for testing core logic (`settings`, `handlers`).
- [x] **Advanced XP**: Implement voice channel XP and role rewards for specific levels.

## ✅ Completed
- [x] Initial Node.js Rewrite (ESM).
- [x] Modular Architecture (Plug-and-play).
- [x] Split Handlers (Module, Command, Event).
- [x] SQLite Database Integration.
- [x] Basic XP Module.
- [x] Settings Management Framework.
- [x] Project README and Documentation.
- [x] Removal of Locales feature for streamlined core.
