// import { Menu } from "lucide-react";

// export default function AdminHeader({ activeTab, onOpenSidebar }) {
//   return (
//     <header className="h-16 border-b border-border px-6 flex items-center justify-between bg-card/50 backdrop-blur sticky top-0 z-30">
//       <div className="flex items-center gap-4">
//         <button
//           onClick={onOpenSidebar}
//           className="md:hidden p-2 text-muted-foreground hover:text-foreground"
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//         <h1 className="text-lg font-bold capitalize tracking-tight">
//           {activeTab.replace("-", " ")} Management
//         </h1>
//       </div>
//       <div className="flex items-center gap-3">
//         <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
//         <span className="text-xs font-medium text-muted-foreground">
//           Connected as Admin
//         </span>
//       </div>
//     </header>
//   );
// }
import {
  Menu,
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Briefcase,
  Layers,
  MessageSquareQuote,
  Mail,
} from "lucide-react";

// Presentation-only metadata for each tab
const TAB_META = {
  dashboard: {
    title: "Dashboard",
    hint: "Your portfolio at a glance",
    icon: LayoutDashboard,
  },
  projects: {
    title: "Projects",
    hint: "Manage the work you showcase",
    icon: FolderGit2,
  },
  skills: { title: "Skills", hint: "Keep your skill set current", icon: Cpu },
  experience: {
    title: "Experience",
    hint: "Your roles and timeline",
    icon: Briefcase,
  },
  services: {
    title: "Services",
    hint: "What you offer to clients",
    icon: Layers,
  },
  testimonials: {
    title: "Testimonials",
    hint: "What others say about you",
    icon: MessageSquareQuote,
  },
  messages: {
    title: "Contact messages",
    hint: "Read and reply to inquiries",
    icon: Mail,
  },
};

export default function AdminHeader({ activeTab, onOpenSidebar }) {
  const meta = TAB_META[activeTab] || {
    title: activeTab.replace("-", " "),
    hint: "",
    icon: LayoutDashboard,
  };
  const Icon = meta.icon;

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 border-b border-border bg-card/70 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          aria-label="Open menu"
          className="md:hidden grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 leading-tight">
          <h1 className="text-base sm:text-lg font-bold capitalize tracking-tight truncate">
            {meta.title}
          </h1>
          {meta.hint && (
            <p className="hidden sm:block text-xs text-muted-foreground truncate">
              {meta.hint}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span className="hidden lg:block text-xs text-muted-foreground">
          {today}
        </span>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden sm:inline text-xs font-medium text-muted-foreground">
            Connected as Admin
          </span>
          <span className="sm:hidden text-xs font-medium text-muted-foreground">
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
