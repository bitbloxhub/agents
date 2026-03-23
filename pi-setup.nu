#!/usr/bin/env nu

if ((open --raw /etc/os-release | lines | where $it =~ '^NAME=' | str replace 'NAME=' '' | get 0) != '"Arch Linux"') {
	print -e $"(ansi red)Needs to run inside an Arch distrobox!(ansi reset)"
	exit 1
}

print "Installing node..."
yay --noconfirm -S nodejs npm
npm config set prefix -L user '~/.local/'

print "Installing pi..."
npm install -g @mariozechner/pi-coding-agent

print "Installing pi extensions..."
pi install npm:pi-hashline-edit

# Symlink custom extensions from repo to pi
let script_dir = ($env.FILE_PWD? | default (pwd))
let repo_extensions_dir = ($script_dir | path join "pi" "extensions")
let pi_config_dir = ($env.HOME | path join ".pi" "agent")
let pi_extensions_dir = ($pi_config_dir | path join "extensions")

# Create extensions directory
mkdir $pi_extensions_dir

# Remove existing files/symlinks and create new symlinks
if ($repo_extensions_dir | path exists) {
	ls $repo_extensions_dir
	| where type == "file" and name =~ ".ts$"
	| each {|ext|
		let target = ($pi_extensions_dir | path join ($ext.name | path basename))
		if ($target | path exists) {
			rm $target
		}
		ln -s $ext.name $target
		print $"Linked ($ext.name) -> ($target)"
	}
} else {
	print $"Extensions directory not found at ($repo_extensions_dir)"
}

print "Configuring pi..."
# Create ~/.pi/agent directory and settings.json
let pi_config_dir = ($env.HOME | path join ".pi" "agent")
let settings_path = ($pi_config_dir | path join "settings.json")

# Create directories (will create parent dirs too)
mkdir $pi_config_dir

# Default settings
let pi_default_settings = {
	defaultProvider: "openai-codex"
	defaultModel: "gpt-5.4"
	hideThinkingBlock: false
	defaultThinkingLevel: "high"
	enabledModels: [
		"openrouter/z-ai/glm-5"
		"openrouter/moonshotai/kimi-k2.5"
		"openrouter/minimax/minimax-m2.7"
		"openrouter/openai/gpt-oss-120b"
		"openrouter/mistralai/mistral-small-2603"
		"openai-codex/gpt-5.4"
	]
}

if ($settings_path | path exists) {
	# Merge with existing
	let existing = (open $settings_path)
	let merged = ($pi_default_settings | merge $existing)
	$merged | save -f $settings_path
	print $"Updated existing settings at ($settings_path)"
} else {
	# Create new file
	$pi_default_settings | save $settings_path
	print $"Created new settings at ($settings_path)"
}

print "Installing agent-browser..."
# Playwright deps for Arch
yay --noconfirm -S nss nspr at-spi2-core libcups libdrm dbus libxcb libxkbcommon at-spi2-core libx11 libxcomposite libxdamage libxext libxfixes libxrandr mesa pango cairo alsa-lib xorg-server-xvfb
npm install -g agent-browser
agent-browser install

print "Setting up skills..."
npx skills add --yes --global https://github.com/vercel-labs/skills --skill find-skills
npx skills add --yes --global https://github.com/vercel-labs/agent-browser --skill agent-browser
npx skills add --yes --global https://github.com/mitsuhiko/agent-stuff --skill tmux
