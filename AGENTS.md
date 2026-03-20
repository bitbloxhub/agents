# Agent Instructions

This repo deploys [pi](https://github.com/badlogic/pi) — a terminal-based AI coding agent.

## Structure

- `pi-setup.nu` — setup script for Arch distrobox (installs node, pi, extensions, skills)
- `pi/extensions/` — pi extensions
  - `bitbloxhub-preferences.ts` — coding style + user preferences
  - `distrobox-prompt.ts` — distrobox context reminders

## Development

### Style
- Tabs for indentation, no semicolons, trailing commas

### Adding Extensions
1. Write a `.ts` extension in `pi/extensions/`
2. Re-run `pi-setup.nu` to symlink it

### Rules
- ALL commands must use `distrobox-host-exec` (host execution)
- Except: pacman/container mgmt, or agent-browser skill
