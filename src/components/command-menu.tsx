"use client"

import * as React from "react"
import { homeSections } from "@/data/homeSections";
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
    FileText,
    Moon,
    Sun,
    Laptop,
    Code,
    Copy,
    Briefcase,
    BookOpen,
    Trophy,
    Binary,
    GitPullRequest,
    GraduationCap,
    Award,
    Sparkles,
    Mail,
    Download,
    CalendarDays,
    Camera,
    Send,
} from "lucide-react"
import { SiGithub, SiX, SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { projectsData } from "@/data/projectsData"
import { handles, bookingLink, email, resume } from "@/data/links"
import { portfolio } from "~/portfolio.config"
import styles from "./command-menu.module.css"
import { MarkTerminal } from "./MarkTerminal"
import { resolveTerminalCommand, type TerminalCommand } from "@/lib/terminal-commands"

const itemClass = "cursor-pointer"

const sectionIcons = { Code, Briefcase, GitPullRequest, Trophy, FileText, BookOpen, GraduationCap, Award, Binary, Camera } as const;
const SECTIONS = [...homeSections.map((section) => ({ ...section, icon: sectionIcons[section.icon] })), { id: "contact", label: "Socials", icon: Send, key: "O" }] as const


const PROFILES = [
    { label: "GitHub", icon: SiGithub, href: `https://github.com/${handles.github}`, handle: handles.github },
    { label: "LinkedIn", icon: FaLinkedin, href: `https://www.linkedin.com/in/${handles.linkedin}/`, handle: handles.linkedin },
    { label: "X", icon: SiX, href: `https://x.com/${handles.x}`, handle: handles.x ? `@${handles.x}` : "" },
    { label: "LeetCode", icon: SiLeetcode, href: `https://leetcode.com/u/${handles.leetcode}`, handle: handles.leetcode },
    { label: "Codeforces", icon: SiCodeforces, href: `https://codeforces.com/profile/${handles.codeforces}`, handle: handles.codeforces },
    { label: "CodeChef", icon: SiCodechef, href: `https://www.codechef.com/users/${handles.codechef}`, handle: handles.codechef },
] as const

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [terminal, setTerminal] = React.useState<string | null>(null)
    const searchRef = React.useRef<HTMLInputElement>(null)
    const hiddenCommand = resolveTerminalCommand(query)
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const { setTheme } = useTheme()
    const router = useRouter()

    const openExternal = React.useCallback((url: string) => {
        const opened = window.open(url, "_blank", "noopener,noreferrer")
        if (!opened) window.location.assign(url)
    }, [])

    const changeOpen = React.useCallback((next: boolean) => {
        setOpen(next)
        if (!next) { setQuery(""); setTerminal(null) }
    }, [])

    React.useEffect(() => {
        if (open && terminal === null) searchRef.current?.focus()
    }, [open, terminal])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                changeOpen(!open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [open, changeOpen])

    const runCommand = React.useCallback((command: () => unknown) => {
        changeOpen(false)
        command()
    }, [changeOpen])


    function terminalAction(command: TerminalCommand): boolean {
        switch (command) {
            case "hire": runCommand(() => router.push("/contact")); return true
            case "blueprint": runCommand(() => router.push("/blueprint")); return true
            case "resume": runCommand(() => window.location.assign(resume)); return true
            case "source":
                if (portfolio.repo) { runCommand(() => window.location.assign(portfolio.repo)); return true }
                return false
            default: return false
        }
    }

    function runHidden() {
        if (!hiddenCommand) return
        if (terminalAction(hiddenCommand)) return
        if (hiddenCommand === "clear") { setQuery(""); return }
        if (hiddenCommand === "exit") { changeOpen(false); return }
        setTerminal(hiddenCommand === "terminal" ? "" : query.trim())
        setQuery("")
    }

    function exitTerminal() { setTerminal(null); setQuery("") }

    return (
        <>
            <button
                type="button"
                ref={triggerRef}
                aria-keyshortcuts="Control+k Meta+k"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => changeOpen(true)}
                className="relative group flex min-h-8 shrink-0 items-center cursor-pointer focus-visible:outline-2 motion-safe:transition-colors"
            >
                {/* Outer border wrapper matching View All style */}
                <div className="absolute -inset-[4.5px] border border-black/5 dark:border-white/5 rounded-[9px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />

                <div className="relative flex items-center gap-1.5 px-3 py-2 mark-surface mark-control rounded-[5px] text-[11px] font-medium transition-colors duration-150 border font-mono">
                    <span className="leading-none mt-[0.5px]">⌘</span>
                    <span className="leading-none mt-[0.5px]">K</span>
                    <span className="sr-only">Open command menu</span>
                </div>
            </button>

            <CommandDialog className={styles.dialog} open={open} onOpenChange={changeOpen} onCloseAutoFocus={(event) => {
                if (triggerRef.current?.isConnected) {
                    event.preventDefault()
                    triggerRef.current.focus({ preventScroll: true })
                }
            }}>
                <div className={styles.header}>
                    <button type="button" className={styles.reactorButton} aria-label="Open hidden terminal" onClick={() => { setTerminal(""); setQuery("") }}>
                    <svg className={styles.reactor} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
                        <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="20" cy="20" r="12.5" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 3" />
                        <path d="M20 11.5 27.4 24.3H12.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <circle cx="20" cy="20" r="3" fill="currentColor" />
                    </svg>
                    </button>
                    <div className={styles.heading}>
                        <h3>MARK I</h3>
                        <p>{terminal === null ? "Command palette" : "Terminal"}</p>
                    </div>
                </div>

                {terminal !== null ? <MarkTerminal initialInput={terminal} onAction={terminalAction} onExit={exitTerminal} /> : <>
                <CommandInput ref={searchRef} value={query} onValueChange={setQuery} aria-label="Search commands" placeholder="Find a project, page or action..." />

                <CommandList className={styles.list}>
                    <CommandEmpty>No matching commands. Try a different search.</CommandEmpty>
                    {hiddenCommand ? <CommandGroup heading="Command">
                        <CommandItem value={query.trim()} forceMount onSelect={runHidden} className={itemClass}>
                            <Code aria-hidden="true" className="mr-2 h-4 w-4" />
                            <span>Run {query.trim()}</span>
                        </CommandItem>
                    </CommandGroup> : <>

                    <CommandGroup heading="Navigate">
                        <CommandItem value="page all projects" onSelect={() => runCommand(() => router.push("/projects"))} className={itemClass}>
                            <Code aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>All projects</span>
                        </CommandItem>
                        <CommandItem value="page all experience timeline" onSelect={() => runCommand(() => router.push("/experience"))} className={itemClass}>
                            <Briefcase aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Experience timeline</span>
                        </CommandItem>
                        <CommandItem value="page open source oss contributions archive" onSelect={() => runCommand(() => router.push("/open-source"))} className={itemClass}>
                            <GitPullRequest aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>OSS Contributions</span>
                        </CommandItem>
                        {portfolio.sections.blog && <CommandItem value="page technical writing blogs articles" onSelect={() => runCommand(() => router.push("/blogs"))} className={itemClass}>
                            <FileText aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Technical writing archive</span>
                        </CommandItem>}
                        <CommandItem value="page certifications training credentials" onSelect={() => runCommand(() => router.push("/certifications"))} className={itemClass}>
                            <Award aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Certifications archive</span>
                        </CommandItem>
                        <CommandItem value="page all highlights archive" onSelect={() => runCommand(() => router.push("/highlights"))} className={itemClass}>
                            <Sparkles aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Highlights archive</span>
                        </CommandItem>
                        <CommandItem value="page contact form" onSelect={() => runCommand(() => router.push("/contact"))} className={itemClass}>
                            <Send aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Contact page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-1" />

                    <CommandGroup heading="Quick actions">
                        <CommandItem value="action copy email address" onSelect={() => runCommand(() => navigator.clipboard.writeText(email))} className={itemClass}>
                            <Copy aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy email</span>
                        </CommandItem>
                        <CommandItem value="action send email write" onSelect={() => runCommand(() => openExternal(`mailto:${email}`))} className={itemClass}>
                            <Mail aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Send an email</span>
                        </CommandItem>
                        {bookingLink && <CommandItem value="action book a call meeting cal" onSelect={() => runCommand(() => openExternal(bookingLink))} className={itemClass}>
                            <CalendarDays aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Book an intro call</span>
                        </CommandItem>}
                        <CommandItem value="action resume cv download" onSelect={() => runCommand(() => openExternal(resume))} className={itemClass}>
                            <Download aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Download résumé</span>
                        </CommandItem>
                        <CommandItem value="action copy link url share" onSelect={() => runCommand(() => navigator.clipboard.writeText(window.location.href))} className={itemClass}>
                            <Copy aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy link to page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-1" />

                    <CommandGroup heading="Sections">
                        {SECTIONS.map((s) => {
                            const Icon = s.icon
                            return (
                                <CommandItem
                                    key={s.id}
                                    value={`section ${s.label}`}
                                    onSelect={() => runCommand(() => { router.push(`/#${s.id}`) })}
                                    className={itemClass}
                                >
                                    <Icon aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{s.label}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-1" />

                    <CommandGroup heading="Projects">
                        {projectsData.map((p) => (
                            <CommandItem
                                key={p.slug}
                                value={`project ${p.title} ${p.tech.join(" ")}`}
                                onSelect={() => runCommand(() => router.push(`/projects/${p.slug}`))}
                                className={itemClass}
                            >
                                <Code aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                                <span>{p.title}</span>
                                <CommandShortcut className="font-mono text-[10px] mark-muted capitalize">
                                    {p.status}
                                </CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-1" />

                    <CommandGroup heading="Profiles">
                        {PROFILES.filter(p => Boolean(p.handle)).map((p) => {
                            const Icon = p.icon
                            return (
                                <CommandItem
                                    key={p.label}
                                    value={`profile ${p.label} ${p.handle}`}
                                    onSelect={() => runCommand(() => openExternal(p.href))}
                                    className={itemClass}
                                >
                                    <Icon aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{p.label}</span>
                                    <CommandShortcut className="font-mono text-[10px] mark-muted">
                                        {p.handle}
                                    </CommandShortcut>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-1" />

                    <CommandGroup heading="System">
                        <CommandItem value="theme light" onSelect={() => runCommand(() => setTheme("light"))} className={itemClass}>
                            <Sun aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Light mode</span>
                        </CommandItem>
                        <CommandItem value="theme dark" onSelect={() => runCommand(() => setTheme("dark"))} className={itemClass}>
                            <Moon aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Dark mode</span>
                        </CommandItem>
                        <CommandItem value="theme system auto" onSelect={() => runCommand(() => setTheme("system"))} className={itemClass}>
                            <Laptop aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>System appearance</span>
                        </CommandItem>
                        {portfolio.repo && <CommandItem value="system source code repository github portfolio architecture" onSelect={() => runCommand(() => openExternal(portfolio.repo))} className={itemClass}>
                            <Code aria-hidden="true" className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Portfolio source code</span>
                        </CommandItem>}
                    </CommandGroup>
                    </>}
                </CommandList>

                <div className={styles.footer}>
                    <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                    <span><kbd>Enter</kbd> Select</span>
                    <span><kbd>Esc</kbd> Close</span>
                </div>
                </>}
            </CommandDialog>
        </>
    )
}
