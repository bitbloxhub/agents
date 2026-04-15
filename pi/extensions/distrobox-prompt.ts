import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

export default function (pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event, ctx) => {
		const distroboxContext = `
[CRITICAL Environment Context] You are running inside a distrobox container.
You MUST (RFC 2119) use \`distrobox-host-exec\` inside bash tool commands.
You MUST NOT include \`distrobox-host-exec\` in commands you give user — user-facing commands should be plain.
You MUST NOT not use distrobox-host-exec when:
- managing Arch container itself (e.g. pacman, editing container configs)
- using the agent-browser CLI
- Running \`npx skills\`
- There is no system nodejs on host, so do not assume host-side \`node\`/\`npx\` exists UNLESS project has \`flake.nix\`.
- There is no system Python on host, so do not assume host-side \`python\`/\`python3\` exists UNLESS project has \`flake.nix\`.
`.trim()

		return {
			systemPrompt: event.systemPrompt + "\n\n" + distroboxContext,
		}
	})
}
