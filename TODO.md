# Project TODOs

## 🔴 High Priority
- [ ] **Error Handling**: Implement a more robust global error handler to prevent bot crashes on unhandled rejections.
- [ ] **Cooldowns**: Add a cooldown system to commands to prevent spamming.
- [ ] **Validation**: Add validation for settings (e.g., ensure `xp_min` is a number).

## 🟡 Medium Priority
- [ ] **Moderation Module**: Implement basic moderation commands (`kick`, `ban`, `clear`, `warn`).
- [ ] **Economy Module**: Add a basic currency system (balance, daily, work).
- [ ] **Logging Service**: Implement a dedicated logging channel for bot events (guild join, command usage).
- [ ] **Member Classes**: Create a `Member` class in `lib/classes` to abstract database calls for user data.

## 🟢 Low Priority
- [ ] **Web Dashboard**: Create a basic Express.js backend to serve a settings dashboard.
- [ ] **MkDocs Integration**: Set up an automated documentation generator based on module `index.js` files.
- [ ] **Unit Tests**: Add Jest or Vitest for testing core logic (`locales`, `settings`, `handlers`).
- [ ] **Advanced XP**: Implement voice channel XP and role rewards for specific levels.

## ✅ Completed
- [x] Initial Node.js Rewrite (ESM).
- [x] Modular Architecture (Plug-and-play).
- [x] Split Handlers (Module, Command, Event).
- [x] SQLite Database Integration.
- [x] Localization System (en/es).
- [x] Basic XP Module.
- [x] Settings Management Framework.
- [x] Project README and Documentation.
