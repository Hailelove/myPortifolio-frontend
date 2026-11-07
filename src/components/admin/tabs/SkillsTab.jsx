// import { Plus, Trash2 } from "lucide-react";

// export default function SkillsTab({ skills, onOpenAddModal, onDelete }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Technical Skills</h2>
//           <p className="text-sm text-muted-foreground">
//             Manage your technical stack and proficiencies.
//           </p>
//         </div>
//         <button
//           onClick={onOpenAddModal}
//           className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"
//         >
//           <Plus className="h-4 w-4" /> Add Skill
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {skills.map((skill) => (
//           <div
//             key={skill.id}
//             className="p-6 rounded-2xl border border-border bg-card flex items-center justify-between"
//           >
//             <div>
//               <span className="text-xs font-medium text-muted-foreground uppercase">
//                 {skill.category}
//               </span>
//               <h3 className="font-bold text-lg mt-0.5">{skill.name}</h3>
//               <p className="text-xs text-primary font-semibold mt-1">
//                 Proficiency: {skill.proficiency}
//               </p>
//             </div>
//             <button
//               onClick={() => onDelete(skill.id)}
//               className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  X,
  Star,
  Eye,
  EyeOff,
  Pencil,
  LayoutGrid,
  List,
  Cpu,
  Monitor,
  Server,
  Database,
  Smartphone,
  Cloud,
  Wrench,
  Palette,
  Shapes,
  FolderGit2,
  Briefcase,
  Layers,
} from "lucide-react";

// ---------- Schema-driven config (SkillCategory enum) ----------
const CATEGORY = {
  FRONTEND: {
    label: "Frontend",
    icon: Monitor,
    tone: "bg-sky-500/10 text-sky-500",
  },
  BACKEND: {
    label: "Backend",
    icon: Server,
    tone: "bg-violet-500/10 text-violet-500",
  },
  DATABASE: {
    label: "Database",
    icon: Database,
    tone: "bg-emerald-500/10 text-emerald-500",
  },
  MOBILE: {
    label: "Mobile",
    icon: Smartphone,
    tone: "bg-pink-500/10 text-pink-500",
  },
  DEVOPS: {
    label: "DevOps",
    icon: Cloud,
    tone: "bg-orange-500/10 text-orange-500",
  },
  TOOLS: {
    label: "Tools",
    icon: Wrench,
    tone: "bg-amber-500/10 text-amber-500",
  },
  DESIGN: {
    label: "Design",
    icon: Palette,
    tone: "bg-rose-500/10 text-rose-500",
  },
  OTHER: {
    label: "Other",
    icon: Shapes,
    tone: "bg-muted text-muted-foreground",
  },
};

const SORTS = [
  { value: "order", label: "Custom order" },
  { value: "name", label: "Name (A–Z)" },
  { value: "level", label: "Proficiency (high–low)" },
];

// ---------- Helpers (accept schema records and your older mock shape) ----------
const humanize = (s = "") =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const catOf = (s) =>
  CATEGORY[s.category] ||
  CATEGORY[String(s.category || "").toUpperCase()] || {
    label: humanize(s.category || "Other"),
    icon: Cpu,
    tone: "bg-muted text-muted-foreground",
  };

// 95, "95", "95%" -> 95 ; null/invalid -> null
const levelOf = (s) => {
  if (s.proficiency == null || s.proficiency === "") return null;
  const n = parseInt(s.proficiency, 10);
  return Number.isNaN(n) ? null : Math.min(100, Math.max(0, n));
};

const levelLabel = (n) =>
  n == null
    ? "Not rated"
    : n >= 90
      ? "Expert"
      : n >= 70
        ? "Advanced"
        : n >= 40
          ? "Intermediate"
          : "Beginner";

const validHex = (c) => (/^#[0-9a-f]{6}$/i.test(c || "") ? c : null);

const usage = (s) =>
  [
    {
      key: "projects",
      icon: FolderGit2,
      n: s.projects?.length || 0,
      word: "project",
    },
    {
      key: "experiences",
      icon: Briefcase,
      n: s.experiences?.length || 0,
      word: "role",
    },
    {
      key: "services",
      icon: Layers,
      n: s.services?.length || 0,
      word: "service",
    },
  ].filter((u) => u.n > 0);

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95";

// ---------- Small components ----------
function SkillIcon({ skill, size = "h-12 w-12" }) {
  const [failed, setFailed] = useState(false);
  const color = validHex(skill.color);
  const cat = catOf(skill);
  const CatIcon = cat.icon;
  const icon = skill.icon;
  const isUrl =
    typeof icon === "string" && /^(https?:\/\/|\/|data:image)/.test(icon);
  const isEmoji =
    typeof icon === "string" && icon && !isUrl && [...icon].length <= 2;

  return (
    <div
      className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-xl ${color ? "" : "bg-primary/10 text-primary"}`}
      style={color ? { backgroundColor: `${color}22`, color } : undefined}
    >
      {isUrl && !failed ? (
        <img
          src={icon}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-6 w-6 object-contain"
        />
      ) : isEmoji ? (
        <span className="text-xl leading-none">{icon}</span>
      ) : (
        <CatIcon className="h-5 w-5" />
      )}
    </div>
  );
}

function Ring({ value, color }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setShown(value ?? 0), 80);
    return () => clearTimeout(t);
  }, [value]);

  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div
      className="relative h-16 w-16 shrink-0"
      role="img"
      aria-label={value == null ? "Not rated" : `Proficiency ${value}%`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="6"
          className="stroke-muted"
        />
        {value != null && (
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (c * shown) / 100}
            className={`transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none ${color ? "" : "stroke-primary"}`}
            style={color ? { stroke: color } : undefined}
          />
        )}
      </svg>
      <span className="absolute inset-0 grid place-items-center text-sm font-bold">
        {value == null ? "–" : `${value}%`}
      </span>
    </div>
  );
}

function SkillCard({
  skill,
  view,
  confirming,
  setConfirming,
  onDelete,
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const cat = catOf(skill);
  const level = levelOf(skill);
  const color = validHex(skill.color);
  const isPublished = skill.isPublished !== false;
  const used = usage(skill);
  const list = view === "list";
  const linkedProjects = skill.projects?.length || 0;

  const actions = confirming ? (
    <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
      <span className="mr-auto text-sm font-medium text-destructive">
        {linkedProjects > 0
          ? `Delete and unlink from ${linkedProjects} project${linkedProjects > 1 ? "s" : ""}?`
          : "Delete this skill?"}
      </span>
      <button
        onClick={() => setConfirming(null)}
        className="h-9 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-accent"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onDelete(skill.id);
          setConfirming(null);
        }}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground transition hover:opacity-90 active:scale-[0.97]"
      >
        <Trash2 className="h-3.5 w-3.5" /> Yes, delete
      </button>
    </div>
  ) : (
    <div className="ml-auto flex items-center gap-1">
      {onToggleFeatured && (
        <button
          onClick={() => onToggleFeatured(skill)}
          aria-pressed={!!skill.isFeatured}
          aria-label={
            skill.isFeatured ? "Remove from featured" : "Mark as featured"
          }
          title={skill.isFeatured ? "Unfeature" : "Feature"}
          className={`${iconBtn} ${skill.isFeatured ? "text-amber-500" : ""}`}
        >
          <Star
            className={`h-4 w-4 ${skill.isFeatured ? "fill-current" : ""}`}
          />
        </button>
      )}
      {onTogglePublished && (
        <button
          onClick={() => onTogglePublished(skill)}
          aria-label={isPublished ? "Unpublish skill" : "Publish skill"}
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
          onClick={() => onEdit(skill)}
          aria-label="Edit skill"
          title="Edit"
          className={iconBtn}
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => setConfirming(skill.id)}
        aria-label="Delete skill"
        title="Delete"
        className="grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );

  const badges = (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={`rounded-md px-2 py-0.5 text-xs font-semibold ${cat.tone}`}
      >
        {cat.label}
      </span>
      {skill.isFeatured && (
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500">
          <Star className="h-3 w-3 fill-current" /> Featured
        </span>
      )}
      {!isPublished && (
        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
          <EyeOff className="h-3 w-3" /> Draft
        </span>
      )}
    </div>
  );

  if (list) {
    return (
      <article
        className={`rounded-2xl border bg-card p-4 transition-all duration-200 hover:shadow-md ${isPublished ? "border-border" : "border-dashed border-border"}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <SkillIcon skill={skill} size="h-11 w-11" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-bold">{skill.name}</h3>
                {badges}
              </div>
              {skill.description && (
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {skill.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:w-56">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-700 ${color ? "" : "gradient-bg"}`}
                style={{
                  width: `${level ?? 0}%`,
                  ...(color ? { backgroundColor: color } : {}),
                }}
              />
            </div>
            <span className="w-24 text-right text-xs font-semibold text-muted-foreground">
              {level == null ? "Not rated" : `${level}% · ${levelLabel(level)}`}
            </span>
          </div>
          {!confirming && <div className="flex">{actions}</div>}
        </div>
        {confirming && (
          <div className="mt-3 border-t border-border pt-3">{actions}</div>
        )}
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${isPublished ? "border-border" : "border-dashed border-border"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <SkillIcon skill={skill} />
        <Ring value={level} color={color} />
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug">{skill.name}</h3>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
        {levelLabel(level)}
      </p>
      <div className="mt-2.5">{badges}</div>

      {skill.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>
      )}

      {used.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {used.map(({ key, icon: Icon, n, word }) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" /> {n} {word}
              {n > 1 ? "s" : ""}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center border-t border-border pt-4 mt-5">
        {actions}
      </div>
    </article>
  );
}

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

export default function SkillsTab({
  skills = [],
  onOpenAddModal,
  onDelete,
  // Optional extras: matching buttons only appear when provided
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("order");
  const [view, setView] = useState("grid");
  const [confirmId, setConfirmId] = useState(null);

  const stats = useMemo(() => {
    const rated = skills.map(levelOf).filter((n) => n != null);
    return {
      total: skills.length,
      published: skills.filter((s) => s.isPublished !== false).length,
      featured: skills.filter((s) => s.isFeatured).length,
      avg: rated.length
        ? Math.round(rated.reduce((a, b) => a + b, 0) / rated.length)
        : null,
    };
  }, [skills]);

  const categoryCounts = useMemo(() => {
    const m = {};
    skills.forEach((s) => {
      const key = s.category || "OTHER";
      m[key] = (m[key] || 0) + 1;
    });
    return m;
  }, [skills]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = skills.filter((s) => {
      if (category && (s.category || "OTHER") !== category) return false;
      if (!q) return true;
      return [s.name, s.description, catOf(s).label]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const sorted = [...list];
    if (sort === "name")
      sorted.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    else if (sort === "level")
      sorted.sort((a, b) => (levelOf(b) ?? -1) - (levelOf(a) ?? -1));
    else sorted.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return sorted;
  }, [skills, query, category, sort]);

  const hasFilters = query || category;
  const chips = [
    { value: "", label: "All", count: skills.length },
    ...Object.keys(categoryCounts).map((k) => ({
      value: k,
      label: (CATEGORY[k] || { label: humanize(k) }).label,
      count: categoryCounts[k],
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Technical skills
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your stack and how well you know each tool.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant outline-none transition hover:opacity-95 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add skill
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total skills" value={stats.total} />
        <Stat
          label="Published"
          value={stats.published}
          tone="text-emerald-500"
        />
        <Stat label="Featured" value={stats.featured} tone="text-amber-500" />
        <Stat
          label="Average proficiency"
          value={stats.avg == null ? "–" : `${stats.avg}%`}
          tone="text-primary"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="group relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills"
            aria-label="Search skills"
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
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort skills"
            className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background/60 px-3 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm lg:flex-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <div
            role="group"
            aria-label="Layout"
            className="flex shrink-0 rounded-xl border border-border bg-card p-1"
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
                className={`grid h-9 w-9 place-items-center rounded-lg transition ${view === id ? "gradient-bg text-primary-foreground shadow-elegant" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category chips */}
      {skills.length > 0 && (
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chips.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value || "all"}
                onClick={() => setCategory(c.value)}
                aria-pressed={active}
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 ${
                  active
                    ? "border-transparent gradient-bg text-primary-foreground shadow-elegant"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {c.label}
                <span
                  className={`rounded-full px-1.5 text-xs ${active ? "bg-primary-foreground/20" : "bg-muted"}`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {hasFilters && skills.length > 0 && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {skills.length} skills
        </p>
      )}

      {/* Results */}
      {skills.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Cpu className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No skills yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Add the technologies you work with so visitors can see your stack.
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add skill
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No matching skills</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or category.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("");
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
              ? "grid grid-cols-1 gap-3"
              : "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          }
        >
          {filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              view={view}
              confirming={confirmId === skill.id}
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
