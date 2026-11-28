"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio } from "~/portfolio.config";
import { homeSections } from "@/data/homeSections";
import { resolveTerminalCommand, terminalReply, type TerminalCommand } from "@/lib/terminal-commands";
import styles from "./command-menu.module.css";

type Entry = { input: string; output: string };
const sections = homeSections.map(section => section.id + "/");
const reply = (command: TerminalCommand | null) => terminalReply(command, portfolio.name, portfolio.tagline, sections);

export function MarkTerminal({ initialInput, onAction, onExit }: {
  initialInput: string;
  onAction: (command: TerminalCommand) => boolean;
  onExit: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>(() => initialInput
    ? [{ input: initialInput, output: reply(resolveTerminalCommand(initialInput)) }]
    : []);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [history]);

  function run() {
    const text = input.trim();
    if (!text) return;
    const command = resolveTerminalCommand(text);
    setInput("");
    if (command === "clear") { setHistory([]); return; }
    if (command === "exit") { onExit(); return; }
    if (command && onAction(command)) return;
    setHistory(entries => [...entries.slice(-39), { input: text, output: reply(command) }]);
  }

  return (
    <section className={styles.terminal} aria-label="MARK I terminal" onKeyDown={event => {
      // Native form owns terminal keys; keep dialog Escape and global shortcut.
      if (event.key !== "Escape" && !(event.key === "k" && (event.ctrlKey || event.metaKey))) event.stopPropagation();
    }}>
      <div className={styles.terminalBar}>
        <span>visitor@mark-i</span>
        <button type="button" onClick={onExit}>Back to search</button>
      </div>
      <div ref={outputRef} role="log" tabIndex={0} aria-label="Terminal output" className={styles.transcript}>
        <p className="mark-muted">MARK I terminal. Type help to begin.</p>
        {history.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <p className="mark-reactor-text">$ {entry.input}</p>
            <p>{entry.output}</p>
          </div>
        ))}
      </div>
      <form className={styles.prompt} onSubmit={event => { event.preventDefault(); run(); }}>
        <span aria-hidden="true">$</span>
        <input ref={inputRef} aria-label="Terminal command" value={input} onChange={event => setInput(event.target.value)} maxLength={160} autoComplete="off" spellCheck={false} autoCapitalize="none" placeholder="Enter command" />
        <button type="submit">Run</button>
      </form>
    </section>
  );
}
