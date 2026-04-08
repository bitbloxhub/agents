import { existsSync, readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent"

const cavemanSkillPath = join(homedir(), ".pi", "agent", "skills", "caveman", "SKILL.md")

function loadCavemanSkill(): string | undefined {
	if (!existsSync(cavemanSkillPath)) {
		return
	}

	const skill = readFileSync(cavemanSkillPath, "utf8").trim()
	if (!skill) {
		return
	}

	return skill
}

export default function (pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event) => {
		const cavemanSkill = loadCavemanSkill()
		if (!cavemanSkill) {
			return
		}

		const cavemanContext = `
# Caveman
The full caveman skill is included below. Use caveman ultra by default.

If the user explicitly asks for other caveman modes, follow them.

[begin caveman skill]
${cavemanSkill}
[end caveman skill]
`.trim()

		return {
			systemPrompt: event.systemPrompt + "\n\n" + cavemanContext,
		}
	})
}
