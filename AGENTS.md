# Agent Instructions

This repo deploys [pi](https://github.com/badlogic/pi) — a terminal-based AI coding agent.

## Structure

- `pi-setup.nu` — setup script for Arch distrobox (installs node, pi, extensions, skills)
- `pi/extensions/` — pi extensions
  - `bitbloxhub-preferences.ts` — coding style + user preferences
  - `caveman.ts` — loads the caveman skill into prompt context and defaults to caveman ultra
  - `distrobox-prompt.ts` — distrobox context reminders
  - `editorconfig-context.ts` — injects the nearest `.editorconfig` so project formatting overrides general preferences
- `skills/` — agent skills (global + local)
  - Global: `find-skills`, `agent-browser`, `tmux`, `caveman`
  - Local: `flake-aspects`, `flake-file`, `import-tree` (see `skills/<name>/SKILL.md`)

## Development

### Style
- Tabs for indentation, no semicolons, trailing commas by default; if a project has `.editorconfig`, follow that instead

### Adding Extensions
1. Write a `.ts` extension in `pi/extensions/`
2. Re-run `pi-setup.nu` to symlink it

### Rules
- ALL commands must use `distrobox-host-exec` (host execution)
- Exceptions:
  - pacman/container management
  - agent-browser skill — NEVER use `distrobox-host-exec` for agent-browser; it manages its own host interaction and must be run directly
