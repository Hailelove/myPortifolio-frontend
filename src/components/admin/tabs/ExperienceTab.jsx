// import { Plus, Trash2 } from "lucide-react";

// export default function ExperienceTab({
//   experiences,
//   onOpenAddModal,
//   onDelete,
// }) {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Work Experience</h2>
//           <p className="text-sm text-muted-foreground">
//             Manage your professional career milestones.
//           </p>
//         </div>
//         <button
//           onClick={onOpenAddModal}
//           className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"
//         >
//           <Plus className="h-4 w-4" /> Add Experience
//         </button>
//       </div>

//       <div className="space-y-4">
//         {experiences.map((exp) => (
//           <div
//             key={exp.id}
//             className="p-6 rounded-2xl border border-border bg-card flex items-center justify-between"
//           >
//             <div>
//               <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
//                 {exp.period}
//               </span>
//               <h3 className="font-bold text-lg mt-2">{exp.role}</h3>
//               <p className="text-sm text-muted-foreground">{exp.company}</p>
//             </div>
//             <button
//               onClick={() => onDelete(exp.id)}
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
import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  X,
  Eye,
  EyeOff,
  Pencil,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

// ---------- Config ----------
// EmploymentType enum values weren't in the schema you sent, so common ones are styled
// and anything else falls back to a readable label automatically.
const EMPLOYMENT = {
  FULL_TIME: { label: "Full-time", tone: "bg-emerald-500/10 text-emerald-500" },
  PART_TIME: { label: "Part-time", tone: "bg-sky-500/10 text-sky-500" },
  CONTRACT: { label: "Contract", tone: "bg-violet-500/10 text-violet-500" },
  FREELANCE: { label: "Freelance", tone: "bg-amber-500/10 text-amber-500" },
  INTERNSHIP: { label: "Internship", tone: "bg-pink-500/10 text-pink-500" },
};

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "order", label: "Custom order" },
];

// ---------- Helpers (accept schema records and your older mock shape) ----------
const humanize = (s = "") =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const getTitle = (e) => e.position ?? e.role ?? "Untitled role";
const getSkills = (e) =>
  Array.isArray(e.skills)
    ? e.skills
        .map((s) => (typeof s === "string" ? s : (s?.skill?.name ?? s?.name)))
        .filter(Boolean)
    : [];
const typeOf = (e) =>
  e.employmentType
    ? EMPLOYMENT[e.employmentType] || {
        label: humanize(e.employmentType),
        tone: "bg-muted text-muted-foreground",
      }
    : null;

const fmtMonth = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

const isCurrentRole = (e) => !!e.isCurrent;

const getRange = (e) => {
  if (!e.startDate) return e.period || "";
  const end = isCurrentRole(e)
    ? "Present"
    : e.endDate
      ? fmtMonth(e.endDate)
      : "";
  return end ? `${fmtMonth(e.startDate)} – ${end}` : fmtMonth(e.startDate);
};

const monthsBetween = (a, b) => {
  const s = new Date(a);
  const e = new Date(b);
  return Math.max(
    0,
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()),
  );
};

const fmtDuration = (months) => {
  if (months == null) return "";
  if (months < 1) return "Less than a month";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
};

const getDuration = (e) => {
  if (!e.startDate) return null;
  if (isCurrentRole(e)) return monthsBetween(e.startDate, new Date());
  if (e.endDate) return monthsBetween(e.startDate, e.endDate);
  return null;
};

const initials = (s = "") =>
  s
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95";

// ---------- Components ----------
function CompanyLogo({ exp, current }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-card text-sm font-bold ring-4 ring-background ${
        current
          ? "border-2 border-primary text-primary"
          : "border border-border text-muted-foreground"
      }`}
    >
      {exp.companyLogo && !failed ? (
        <img
          src={exp.companyLogo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        initials(exp.company)
      )}
    </div>
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

function ExperienceItem({
  exp,
  confirming,
  setConfirming,
  onDelete,
  onEdit,
  onTogglePublished,
}) {
  const [expanded, setExpanded] = useState(false);
  const current = isCurrentRole(exp);
  const isPublished = exp.isPublished !== false;
  const type = typeOf(exp);
  const range = getRange(exp);
  const duration = fmtDuration(getDuration(exp));
  const skills = getSkills(exp);
  const achievements = Array.isArray(exp.achievements)
    ? exp.achievements.filter(Boolean)
    : [];
  const longText = (exp.description || "").length > 220;
  const hasMore = longText || achievements.length > 2;
  const shownAchievements = expanded ? achievements : achievements.slice(0, 2);

  return (
    <li className="relative pl-14">
      <div className="absolute left-0 top-0">
        <CompanyLogo exp={exp} current={current} />
      </div>

      <article
        className={`rounded-2xl border bg-card p-5 transition-all duration-200 hover:shadow-lg sm:p-6 ${
          current
            ? "border-primary/40 shadow-sm"
            : isPublished
              ? "border-border"
              : "border-dashed border-border"
        }`}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-2">
          {range && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Calendar className="h-3.5 w-3.5" /> {range}
            </span>
          )}
          {duration && (
            <span className="text-xs text-muted-foreground">{duration}</span>
          )}
          {current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />{" "}
              Current
            </span>
          )}
          {!isPublished && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground sm:ml-auto">
              <EyeOff className="h-3 w-3" /> Draft
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold leading-snug">{getTitle(exp)}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {exp.companyWebsite ? (
            <a
              href={exp.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline"
            >
              {exp.company} <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="font-medium text-foreground">{exp.company}</span>
          )}
          {type && (
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-semibold ${type.tone}`}
            >
              {type.label}
            </span>
          )}
          {exp.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {exp.location}
            </span>
          )}
        </div>

        {/* Description */}
        {exp.description && (
          <p
            className={`mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {exp.description}
          </p>
        )}

        {/* Achievements */}
        {shownAchievements.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {shownAchievements.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="min-w-0 break-words">{a}</span>
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 text-xs font-semibold text-primary hover:underline"
          >
            {expanded
              ? "Show less"
              : achievements.length > 2
                ? `Show ${achievements.length - 2} more achievement${achievements.length - 2 > 1 ? "s" : ""}`
                : "Read full description"}
          </button>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, expanded ? skills.length : 6).map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
            {!expanded && skills.length > 6 && (
              <button
                onClick={() => setExpanded(true)}
                className="rounded-md px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
              >
                +{skills.length - 6}
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center border-t border-border pt-4">
          {confirming ? (
            <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
              <span className="mr-auto text-sm font-medium text-destructive">
                Delete this experience?
              </span>
              <button
                onClick={() => setConfirming(null)}
                className="h-9 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(exp.id);
                  setConfirming(null);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground transition hover:opacity-90 active:scale-[0.97]"
              >
                <Trash2 className="h-3.5 w-3.5" /> Yes, delete
              </button>
            </div>
          ) : (
            <div className="ml-auto flex items-center gap-1">
              {onTogglePublished && (
                <button
                  onClick={() => onTogglePublished(exp)}
                  aria-label={
                    isPublished ? "Unpublish experience" : "Publish experience"
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
                  onClick={() => onEdit(exp)}
                  aria-label="Edit experience"
                  title="Edit"
                  className={iconBtn}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setConfirming(exp.id)}
                aria-label="Delete experience"
                title="Delete"
                className="grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

export default function ExperienceTab({
  experiences = [],
  onOpenAddModal,
  onDelete,
  // Optional extras: matching buttons only appear when provided
  onEdit,
  onTogglePublished,
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("newest");
  const [confirmId, setConfirmId] = useState(null);

  const stats = useMemo(() => {
    const dated = experiences.filter((e) => e.startDate);
    let span = null;
    if (dated.length) {
      const first = Math.min(
        ...dated.map((e) => new Date(e.startDate).getTime()),
      );
      const last = Math.max(
        ...dated.map((e) =>
          isCurrentRole(e) || !e.endDate
            ? Date.now()
            : new Date(e.endDate).getTime(),
        ),
      );
      span = monthsBetween(first, last);
    }
    return {
      total: experiences.length,
      companies: new Set(
        experiences.map((e) => (e.company || "").toLowerCase()),
      ).size,
      current: experiences.filter(isCurrentRole).length,
      span,
    };
  }, [experiences]);

  const typeCounts = useMemo(() => {
    const m = {};
    experiences.forEach((e) => {
      if (e.employmentType)
        m[e.employmentType] = (m[e.employmentType] || 0) + 1;
    });
    return m;
  }, [experiences]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = experiences.filter((e) => {
      if (type && e.employmentType !== type) return false;
      if (!q) return true;
      return [
        getTitle(e),
        e.company,
        e.location,
        e.description,
        ...getSkills(e),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const time = (e) => (e.startDate ? new Date(e.startDate).getTime() : null);
    const sorted = [...list];
    if (sort === "newest")
      sorted.sort((a, b) => (time(b) ?? 0) - (time(a) ?? 0));
    else if (sort === "oldest")
      sorted.sort((a, b) => (time(a) ?? 0) - (time(b) ?? 0));
    else sorted.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return sorted;
  }, [experiences, query, type, sort]);

  const hasFilters = query || type;
  const chips = [
    { value: "", label: "All", count: experiences.length },
    ...Object.keys(typeCounts).map((k) => ({
      value: k,
      label: (EMPLOYMENT[k] || { label: humanize(k) }).label,
      count: typeCounts[k],
    })),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Work experience</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your career timeline, from newest to oldest.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant outline-none transition hover:opacity-95 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add experience
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Roles" value={stats.total} />
        <Stat label="Companies" value={stats.companies} />
        <Stat label="Current" value={stats.current} tone="text-emerald-500" />
        <Stat
          label="Career span"
          value={stats.span == null ? "–" : fmtDuration(stats.span)}
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
            placeholder="Search role, company, location or skill"
            aria-label="Search experience"
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort experience"
          className="h-11 rounded-xl border border-input bg-background/60 px-3 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm lg:w-48"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Employment type chips (only when the data has them) */}
      {chips.length > 1 && (
        <div
          role="group"
          aria-label="Filter by employment type"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chips.map((c) => {
            const active = type === c.value;
            return (
              <button
                key={c.value || "all"}
                onClick={() => setType(c.value)}
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

      {hasFilters && experiences.length > 0 && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {experiences.length} roles
        </p>
      )}

      {/* Timeline */}
      {experiences.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Briefcase className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No experience added yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Add your roles to build a timeline visitors can scan quickly.
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add experience
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No matching roles</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or employment type.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setType("");
            }}
            className="mt-5 h-10 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-accent"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-border">
          {filtered.map((exp) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              confirming={confirmId === exp.id}
              setConfirming={setConfirmId}
              onDelete={onDelete}
              onEdit={onEdit}
              onTogglePublished={onTogglePublished}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
