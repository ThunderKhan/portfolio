"use client"

import * as React from "react"
import { homeSections } from "@/data/homeSections";
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
    LayoutDashboard,
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

const itemClass = "rounded-lg py-3 cursor-pointer"

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
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const { setTheme } = useTheme()
    const router = useRouter()

    const openExternal = React.useCallback((url: string) => {
        const opened = window.open(url, "_blank", "noopener,noreferrer")
        if (!opened) window.location.assign(url)
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])


    return (
        <>
            <button
                type="button"
                ref={triggerRef}
                aria-label="Open command menu"
                aria-keyshortcuts="Control+k Meta+k"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="relative group flex min-h-8 shrink-0 items-center cursor-pointer focus-visible:outline-2 motion-safe:transition-colors"
            >
                {/* Outer border wrapper matching View All style */}
                <div className="absolute -inset-[4.5px] border border-black/5 dark:border-white/5 rounded-[9px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />

                <div className="relative flex items-center gap-1.5 px-3 py-2 mark-surface mark-control rounded-[5px] text-[11px] font-medium transition-colors duration-150 border font-mono">
                    <span className="leading-none mt-[0.5px]">⌘</span>
                    <span className="leading-none mt-[0.5px]">K</span>
                </div>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen} onCloseAutoFocus={(event) => {
                if (triggerRef.current?.isConnected) {
                    event.preventDefault()
                    triggerRef.current.focus({ preventScroll: true })
                }
            }}>
                {/* Header Section */}
                <div className="flex items-center gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Navigation Menu</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Jump to a section, project, profile or action</p>
                    </div>
                </div>

                <CommandInput aria-label="Search commands" placeholder="Search sections, projects, profiles..." className="border-none focus:ring-0" />

                <CommandList className="p-2">
                    <CommandEmpty>No results found.</CommandEmpty>

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
                                    <Icon className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{s.label}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Projects">
                        {projectsData.map((p) => (
                            <CommandItem
                                key={p.slug}
                                value={`project ${p.title} ${p.tech.join(" ")}`}
                                onSelect={() => runCommand(() => router.push(`/projects/${p.slug}`))}
                                className={itemClass}
                            >
                                <Code className="mr-2 h-4 w-4 text-zinc-500" />
                                <span>{p.title}</span>
                                <CommandShortcut className="font-mono text-[10px] mark-muted capitalize">
                                    {p.status}
                                </CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Pages">
                        <CommandItem value="page all projects" onSelect={() => runCommand(() => router.push("/projects"))} className={itemClass}>
                            <Code className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>All projects</span>
                        </CommandItem>
                        <CommandItem value="page all experience timeline" onSelect={() => runCommand(() => router.push("/experience"))} className={itemClass}>
                            <Briefcase className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Experience timeline</span>
                        </CommandItem>
                        <CommandItem value="page open source oss contributions archive" onSelect={() => runCommand(() => router.push("/open-source"))} className={itemClass}>
                            <GitPullRequest className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>OSS Contributions</span>
                        </CommandItem>
                        <CommandItem value="page technical writing blogs articles" onSelect={() => runCommand(() => router.push("/blogs"))} className={itemClass}>
                            <FileText className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Technical writing archive</span>
                        </CommandItem>
                        <CommandItem value="page certifications training credentials" onSelect={() => runCommand(() => router.push("/certifications"))} className={itemClass}>
                            <Award className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Certifications archive</span>
                        </CommandItem>
                        <CommandItem value="page all highlights archive" onSelect={() => runCommand(() => router.push("/highlights"))} className={itemClass}>
                            <Sparkles className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Highlights archive</span>
                        </CommandItem>
                        <CommandItem value="page contact form" onSelect={() => runCommand(() => router.push("/contact"))} className={itemClass}>
                            <Send className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Contact page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

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
                                    <Icon className="mr-2 h-4 w-4 text-zinc-500" />
                                    <span>{p.label}</span>
                                    <CommandShortcut className="font-mono text-[10px] mark-muted">
                                        {p.handle}
                                    </CommandShortcut>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Actions">
                        <CommandItem value="action copy email address" onSelect={() => runCommand(() => navigator.clipboard.writeText(email))} className={itemClass}>
                            <Copy className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy email</span>
                        </CommandItem>
                        <CommandItem value="action send email write" onSelect={() => runCommand(() => openExternal(`mailto:${email}`))} className={itemClass}>
                            <Mail className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Send an email</span>
                        </CommandItem>
                        {bookingLink && <CommandItem value="action book a call meeting cal" onSelect={() => runCommand(() => openExternal(bookingLink))} className={itemClass}>
                            <CalendarDays className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Book an intro call</span>
                        </CommandItem>}
                        <CommandItem value="action resume cv download" onSelect={() => runCommand(() => openExternal(resume))} className={itemClass}>
                            <Download className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Download résumé</span>
                        </CommandItem>
                        <CommandItem value="action copy link url share" onSelect={() => runCommand(() => navigator.clipboard.writeText(window.location.href))} className={itemClass}>
                            <Copy className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Copy link to page</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    <CommandGroup heading="Theme">
                        <CommandItem value="theme light" onSelect={() => runCommand(() => setTheme("light"))} className={itemClass}>
                            <Sun className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Light Mode</span>
                        </CommandItem>
                        <CommandItem value="theme dark" onSelect={() => runCommand(() => setTheme("dark"))} className={itemClass}>
                            <Moon className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>Dark Mode</span>
                        </CommandItem>
                        <CommandItem value="theme system auto" onSelect={() => runCommand(() => setTheme("system"))} className={itemClass}>
                            <Laptop className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>System</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-4 text-[10px] mark-muted">
                        <div className="flex items-center gap-1">
                            <span className="font-mono">Up / Down</span>
                            <span>to navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-mono">Enter</span>
                            <span>to select</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] mark-muted">
                        <span className="font-mono">esc</span>
                        <span>to close</span>
                    </div>
                </div>
            </CommandDialog>
        </>
    )
}
