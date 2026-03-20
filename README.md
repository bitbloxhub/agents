# pi-setup

My personal [pi](https://github.com/badlogic/pi) configuration for an Arch Linux distrobox.

## What's Inside

- `pi-setup.nu` — one-shot installer for the whole toolchain
- `pi/extensions/` — custom pi extensions for my preferences and distrobox setup

## Quick Start

```bash
nu pi-setup.nu
```

That's it. It installs node, pi, extensions, and all dependencies.

## Extensions

- **bitbloxhub-preferences** - enforces my coding style (tabs, no semicolons, trailing commas)
- **distrobox-prompt** - reminds agents to use `distrobox-host-exec` for host commands
- **pi-hashline-edit** - overrides read/grep/edit tools with content-anchored line references (LINE:HASH|content) for more reliable edits
