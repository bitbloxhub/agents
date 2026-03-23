import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

export default function (pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event, ctx) => {
		const distroboxContext = `
[CRITICAL Environment Context] You are running inside a distrobox container.
ALWAYS use \`distrobox-host-exec\` for ALL commands unless there is a CLEAR reason not to.
Exceptions: (1) managing the Arch container itself (e.g., pacman, editing container configs),
(2) the agent-browser skill MUST NEVER be run through \`distrobox-host-exec\`.
When using agent-browser, run it directly — it already manages its own host interaction.
EVERYTHING else — installing packages, running nix commands, git, system utilities, etc. —
must go through \`distrobox-host-exec\`.
FAILURE to do so will result in commands affecting the container instead of the host.
There is no system Python on the host. Python is only available inside the distrobox, so never assume host-side \`python\`/\`python3\` exists.
`.trim()

		return {
			systemPrompt: event.systemPrompt + "\n\n" + distroboxContext,
		}
	})
}
