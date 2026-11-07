// import { Plus, Trash2 } from "lucide-react";

// export default function ProjectsTab({ projects, onOpenAddModal, onDelete }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Portfolio Projects</h2>
//           <p className="text-sm text-muted-foreground">
//             Add or remove showcased software engineering projects.
//           </p>
//         </div>
//         <button
//           onClick={onOpenAddModal}
//           className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"
//         >
//           <Plus className="h-4 w-4" /> Add Project
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {projects.map((proj) => (
//           <div
//             key={proj.id}
//             className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between"
//           >
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary">
//                   {proj.category}
//                 </span>
//                 <span className="text-xs text-emerald-500 font-medium">
//                   {proj.status}
//                 </span>
//               </div>
//               <h3 className="text-lg font-bold">{proj.title}</h3>
//               <p className="text-xs text-muted-foreground mt-2">
//                 Tech: {proj.tech}
//               </p>
//             </div>
//             <div className="flex items-center justify-end gap-2 pt-6 mt-4 border-t border-border">
//               <button
//                 onClick={() => onDelete(proj.id)}
//                 className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  X,
  Star,
  Globe,
  //   Github,
  PlayCircle,
  LayoutGrid,
  List,
  Pencil,
  Eye,
  EyeOff,
  Calendar,
  User,
  Images,
  FolderGit2,
  Smartphone,
  Monitor,
  Plug,
  Building2,
  ClipboardList,
  Shapes,
} from "lucide-react";

// ---------- Schema-driven config (ProjectCategory / ProjectStatus enums) ----------
const CATEGORY = {
  WEB_APPLICATION: { label: "Web application", icon: Globe },
  MOBILE_APPLICATION: { label: "Mobile application", icon: Smartphone },
  DESKTOP_APPLICATION: { label: "Desktop application", icon: Monitor },
  API: { label: "API", icon: Plug },
  ENTERPRISE_SYSTEM: { label: "Enterprise system", icon: Building2 },
  MANAGEMENT_SYSTEM: { label: "Management system", icon: ClipboardList },
  OTHER: { label: "Other", icon: Shapes },
};

const STATUS = {
  PLANNING: {
    label: "Planning",
    badge: "bg-violet-500/10 text-violet-500",
    dot: "bg-violet-500",
  },
  IN_PROGRESS: {
    label: "In progress",
    badge: "bg-blue-500/10 text-blue-500",
    dot: "bg-blue-500",
  },
  COMPLETED: {
    label: "Completed",
    badge: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  },
  MAINTENANCE: {
    label: "Maintenance",
    badge: "bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
  },
  ARCHIVED: {
    label: "Archived",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

// ---------- Helpers (accept both schema records and your older mock shape) ----------
const humanize = (s = "") =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const getName = (p) => p.name ?? p.title ?? "Untitled project";

const getSkills = (p) => {
  if (Array.isArray(p.skills))
    return p.skills
      .map((s) => (typeof s === "string" ? s : (s?.skill?.name ?? s?.name)))
      .filter(Boolean);
  if (typeof p.tech === "string")
    return p.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  return [];
};

const getThumb = (p) => p.thumbnail || p.images?.[0]?.imageUrl || null;

const fmtMonth = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

const getDates = (p) => {
  if (!p.startDate && !p.endDate) return "";
  if (p.startDate && p.endDate)
    return `${fmtMonth(p.startDate)} – ${fmtMonth(p.endDate)}`;
  if (p.startDate) return `${fmtMonth(p.startDate)} – Present`;
  return `Until ${fmtMonth(p.endDate)}`;
};

const categoryOf = (p) =>
  CATEGORY[p.category] || {
    label: humanize(p.category || "Other"),
    icon: FolderGit2,
  };
const statusOf = (p) =>
  STATUS[p.status] || {
    label: humanize(p.status || "Active"),
    badge: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
  };

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95";

// ---------- Components ----------
function Stat({ label, value, tone }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-bold tracking-tight ${tone || ""}`}>
        {value}
      </p>
    </div>
  );
}

function ProjectCard({
  proj,
  view,
  confirming,
  setConfirming,
  onDelete,
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const cat = categoryOf(proj);
  const CatIcon = cat.icon;
  const status = statusOf(proj);
  const thumb = !imgFailed ? getThumb(proj) : null;
  const skills = getSkills(proj);
  const dates = getDates(proj);
  const isPublished = proj.isPublished !== false;
  const list = view === "list";
  const summary = proj.tagline || proj.description;
  const imageCount = proj.images?.length || 0;

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        list ? "flex-col sm:flex-row" : "flex-col"
      } ${isPublished ? "border-border" : "border-dashed border-border"}`}
    >
      {/* Thumbnail */}
      <div
        className={`relative shrink-0 overflow-hidden bg-muted ${
          list ? "aspect-[16/9] sm:aspect-auto sm:w-60" : "aspect-[16/9]"
        }`}
      >
        {thumb ? (
          <img
            src={thumb}
            alt={proj.images?.[0]?.altText || getName(proj)}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full min-h-[9rem] w-full place-items-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
            <CatIcon className="h-10 w-10 text-primary/60" />
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-1.5">
          {proj.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
          {!isPublished && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-muted-foreground shadow backdrop-blur">
              <EyeOff className="h-3 w-3" /> Draft
            </span>
          )}
        </div>
        {imageCount > 0 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
            <Images className="h-3 w-3" /> {imageCount}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <CatIcon className="h-3.5 w-3.5" /> {cat.label}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.badge}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.dot} ${proj.status === "IN_PROGRESS" ? "animate-pulse" : ""}`}
            />
            {status.label}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug">{getName(proj)}</h3>
        {summary && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        )}

        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
            {skills.length > 4 && (
              <span
                className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground"
                title={skills.slice(4).join(", ")}
              >
                +{skills.length - 4}
              </span>
            )}
          </div>
        )}

        {(proj.clientName || dates) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {proj.clientName && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {proj.clientName}
              </span>
            )}
            {dates && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {dates}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex flex-wrap items-center gap-1 border-t border-border pt-4 mt-5">
          {confirming ? (
            <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
              <span className="mr-auto text-sm font-medium text-destructive">
                Delete this project?
              </span>
              <button
                onClick={() => setConfirming(null)}
                className="h-9 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(proj.id);
                  setConfirming(null);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground transition hover:opacity-90 active:scale-[0.97]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Yes, delete
              </button>
            </div>
          ) : (
            <>
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open live site"
                  title="Live site"
                  className={iconBtn}
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open GitHub repository"
                  title="GitHub"
                  className={iconBtn}
                >
                  {/* <Github className="h-4 w-4" /> */}
                </a>
              )}
              {proj.demoUrl && (
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open demo"
                  title="Demo"
                  className={iconBtn}
                >
                  <PlayCircle className="h-4 w-4" />
                </a>
              )}

              <div className="ml-auto flex items-center gap-1">
                {onToggleFeatured && (
                  <button
                    onClick={() => onToggleFeatured(proj)}
                    aria-pressed={!!proj.isFeatured}
                    aria-label={
                      proj.isFeatured
                        ? "Remove from featured"
                        : "Mark as featured"
                    }
                    title={proj.isFeatured ? "Unfeature" : "Feature"}
                    className={`${iconBtn} ${proj.isFeatured ? "text-amber-500" : ""}`}
                  >
                    <Star
                      className={`h-4 w-4 ${proj.isFeatured ? "fill-current" : ""}`}
                    />
                  </button>
                )}
                {onTogglePublished && (
                  <button
                    onClick={() => onTogglePublished(proj)}
                    aria-label={
                      isPublished ? "Unpublish project" : "Publish project"
                    }
                    title={isPublished ? "Unpublish" : "Publish"}
                    className={iconBtn}
                  >
                    {isPublished ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(proj)}
                    aria-label="Edit project"
                    title="Edit"
                    className={iconBtn}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setConfirming(proj.id)}
                  aria-label="Delete project"
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsTab({
  projects = [],
  onOpenAddModal,
  onDelete,
  // Optional extras: the matching buttons only appear when you pass these
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [view, setView] = useState("grid");
  const [confirmId, setConfirmId] = useState(null);

  const stats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((p) => p.isPublished !== false).length,
      featured: projects.filter((p) => p.isFeatured).length,
      active: projects.filter((p) => p.status === "IN_PROGRESS").length,
    }),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      if (!q) return true;
      const hay = [
        getName(p),
        p.tagline,
        p.description,
        p.clientName,
        ...getSkills(p),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [projects, query, category, status]);

  const hasFilters = query || category || status;
  const selectCls =
    "h-11 rounded-xl border border-input bg-background/60 px-3 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Portfolio projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, review and remove the projects you showcase.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant outline-none transition hover:opacity-95 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total projects" value={stats.total} />
        <Stat
          label="Published"
          value={stats.published}
          tone="text-emerald-500"
        />
        <Stat label="Featured" value={stats.featured} tone="text-amber-500" />
        <Stat label="In progress" value={stats.active} tone="text-blue-500" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="group relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, client or skill"
            aria-label="Search projects"
            className="h-11 w-full rounded-xl border border-input bg-background/60 pl-10 pr-10 text-base outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className={`${selectCls} min-w-0 flex-1 lg:flex-none`}
          >
            <option value="">All categories</option>
            {Object.entries(CATEGORY).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className={`${selectCls} min-w-0 flex-1 lg:flex-none`}
          >
            <option value="">All statuses</option>
            {Object.entries(STATUS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>

          <div
            role="group"
            aria-label="Layout"
            className="hidden shrink-0 rounded-xl border border-border bg-card p-1 sm:flex"
          >
            {[
              { id: "grid", icon: LayoutGrid, label: "Grid view" },
              { id: "list", icon: List, label: "List view" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                aria-pressed={view === id}
                aria-label={label}
                title={label}
                className={`grid h-9 w-9 place-items-center rounded-lg transition ${
                  view === id
                    ? "gradient-bg text-primary-foreground shadow-elegant"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasFilters && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {projects.length} projects
        </p>
      )}

      {/* Results */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <FolderGit2 className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No projects yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Add your first project to start building your portfolio.
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add project
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No matching projects</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or clear your filters.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("");
              setStatus("");
            }}
            className="mt-5 h-10 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-accent"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div
          className={
            view === "list"
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3"
          }
        >
          {filtered.map((proj) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              view={view}
              confirming={confirmId === proj.id}
              setConfirming={setConfirmId}
              onDelete={onDelete}
              onEdit={onEdit}
              onTogglePublished={onTogglePublished}
              onToggleFeatured={onToggleFeatured}
            />
          ))}
        </div>
      )}
    </div>
  );
}
