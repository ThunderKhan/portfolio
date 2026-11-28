// A simulated command language, not a shell. Only exact allowlisted strings resolve.
export type TerminalCommand = "hire" | "identity" | "list" | "resume" | "source" | "coffee" | "terminal" | "help" | "blueprint" | "clear" | "exit";

export function resolveTerminalCommand(input: string): TerminalCommand | null {
  if (input.length > 160) return null;
  switch (input.trim().toLowerCase().replace(/\s+/g, " ")) {
    case "sudo hire ayan": return "hire";
    case "whoami": return "identity";
    case "ls": return "list";
    case "cat resume.pdf": return "resume";
    case "git log --oneline": return "source";
    case "sudo make coffee": return "coffee";
    case "jarvis": return "terminal";
    case "help": return "help";
    case "man mark-i":
    case "sudo inspect mark-i": return "blueprint";
    case "clear": return "clear";
    case "exit": return "exit";
    default: return null;
  }
}

export function terminalReply(command: TerminalCommand | null, name: string, tagline: string, sections: readonly string[]): string {
  switch (command) {
    case "identity": return name + "\n" + tagline;
    case "list": return sections.join("  ") + "  contact/";
    case "coffee": return "Error: coffee hardware not detected.\nDeveloper operating on insufficient caffeine.";
    case "terminal": return "At your service, sir.\nMARK I terminal ready.";
    case "help": return "whoami  ls  clear  exit\nSome commands remain undocumented.";
    case "hire": return "Opening contact details.";
    case "resume": return "Opening résumé.";
    case "source": return "Opening portfolio source.";
    case "blueprint": return "Opening engineering blueprint.";
    case "clear": case "exit": return "";
    default: return "Command not found. Try help.";
  }
}
