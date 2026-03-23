# pi-setup

My personal [pi](https://github.com/badlogic/pi) configuration for an Arch Linux distrobox.

## What's Inside

- `pi-setup.nu` — one-shot installer for the whole toolchain
- `pi/extensions/` — custom pi extensions for my preferences, distrobox setup, and project-specific EditorConfig context

## Quick Start

```bash
nu pi-setup.nu
```

That's it. It installs node, pi, extensions, and all dependencies.

## Extensions

- **bitbloxhub-preferences** - sets my default coding style (tabs, no semicolons, trailing commas)
- **distrobox-prompt** - reminds agents to use `distrobox-host-exec` for host commands
- **editorconfig-context** - injects the nearest project `.editorconfig` into context so project formatting overrides general preferences
- **pi-hashline-edit** - overrides read/grep/edit tools with content-anchored line references (LINE:HASH|content) for more reliable edits

## Skills
### Global (from remote repos)
- **find-skills** — discover and install agent skills
- **agent-browser** — browser automation for web tasks
- **tmux** — remote control tmux sessions
### Local (in `skills/`)
- **flake-aspects** — modular Nix configuration with flake-parts
- **flake-file** — generate `flake.nix` from modular Nix options
- **import-tree** — import directory trees of Nix modules
