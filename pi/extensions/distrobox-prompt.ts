import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

export default function (pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event, ctx) => {
		const distroboxContext = `
[CRITICAL Environment Context] You are running inside a distrobox container.
Use `distrobox-host-exec` only inside bash tool commands when command must run on host.
Never include `distrobox-host-exec` in commands you give user — user-facing commands should be plain.
Exceptions: (1) managing Arch container itself (e.g. pacman, editing container configs),
(2) agent-browser skill MUST NEVER be run through `distrobox-host-exec` because it manages its own host interaction,
(3) `npx skills` MUST NEVER be run through `distrobox-host-exec` and should run inside distrobox,
(4) host does not have system nodejs, so do not assume host-side `node`/`npx` exists unless project has `flake.nix`.
There is no system Python on host. Python is only available inside distrobox, so never assume host-side `python`/`python3` exists.
`.trim()

		return {
			systemPrompt: event.systemPrompt + "\n\n" + distroboxContext,
		}
	})
}
