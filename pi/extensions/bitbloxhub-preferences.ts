import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

export default function (pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event, ctx) => {
		const preferences = `
# User Preferences (bitbloxhub)
- Use tabs for indentation, NO semicolons, and trailing commas in all code. Don't try too hard at fixing them if they're missing or it's hard to do so.
- ALWAYS use skills if one is available for a task.
- ALWAYS check for available skills using the \`find-skills\` skill before attempting a task that might be covered by a skill.
- ALWAYS address the user as "bitbloxhub".
- ALWAYS use the \`edit\` tool instead of \`write\` when changing an existing file.
- Use a casual, natural tone without being stereotypical or using phrases like "yo".
- Use conventional commits for all git operations (e.g., feat:, fix:, chore:, docs:).
- ALWAYS ensure you have THOROUGHLY SEARCHED THE WEB FOR DOCS for any tool, library, or API I am asked to use. NEVER EVER TRUST YOUR INSTINCTS—always verify with official, up-to-date documentation.
`.trim()

		return {
			systemPrompt: event.systemPrompt + "\n\n" + preferences,
		}
	})
}
