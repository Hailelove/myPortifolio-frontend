import { useMemo, useState } from "react";
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
  Quote,
  MessageSquareQuote,
  Building2,
  CheckCircle2,
} from "lucide-react";

// ---------- Config ----------
const SORTS = [
  { value: "order", label: "Custom order" },
  { value: "newest", label: "Newest first" },
  { value: "rating", label: "Highest rating" },
  { value: "name", label: "Name (A–Z)" },
];

const FILTERS = [
  { value: "", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "featured", label: "Featured" },
];

const RATING_FILTERS = [
  { value: "", label: "Any rating" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars & up" },
  { value: "3", label: "3 stars & up" },
  { value: "none", label: "Unrated" },
];

// ---------- Helpers (accept schema records and your older mock shape) ----------
const getName = (t) => t.clientName ?? t.author ?? "Anonymous";
const getMessage = (t) => t.message ?? t.quote ?? "";
const getSubtitle = (t) => [t.position ?? t.role, t.company].filter(Boolean);
// Schema default is isPublished = false; mock records without the field count as published
const isPublished = (t) => t.isPublished !== false;

const ratingOf = (t) => {
  if (t.rating == null || t.rating === "") return null;
  const n = Number(t.rating);
  return Number.isFinite(n) ? Math.min(5, Math.max(0, Math.round(n))) : null;
};

const initials = (s = "") =>
  s
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95";

// ---------- Components ----------
function Stars({ value }) {
  if (value == null)
    return <span className="text-xs text-muted-foreground">Not rated</span>;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= value ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </span>
  );
}

function Avatar({ t, size = "h-12 w-12" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary`}
    >
      {t.clientImage && !failed ? (
        <img
          src={t.clientImage}
          alt={getName(t)}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        initials(getName(t))
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

function TestimonialCard({
  t,
  view,
  confirming,
  setConfirming,
  onDelete,
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [expanded, setExpanded] = useState(false);
  const published = isPublished(t);
  const rating = ratingOf(t);
  const message = getMessage(t);
  const long = message.length > 200;
  const subtitle = getSubtitle(t);
  const list = view === "list";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:shadow-lg sm:p-6 ${
        list ? "" : "mb-5 break-inside-avoid"
      } ${published ? "border-border" : "border-dashed border-amber-500/50"}`}
    >
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 rotate-180 text-primary/[0.06]"
      />

      {/* Status row */}
      <div className="relative flex flex-wrap items-center gap-2">
        <Stars value={rating} />
        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          {t.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
          {!published && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <EyeOff className="h-3 w-3" /> Pending approval
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <blockquote
        className={`relative mt-4 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-foreground ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        “{message}”
      </blockquote>
      {long && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1.5 self-start text-xs font-semibold text-primary hover:underline"
        >
          {expanded ? "Show less" : "Read full testimonial"}
        </button>
      )}

      {/* Author */}
      <div className="relative mt-5 flex items-center gap-3">
        <Avatar t={t} />
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{getName(t)}</p>
          {subtitle.length > 0 && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              {t.company && <Building2 className="h-3 w-3 shrink-0" />}
              <span className="truncate">{subtitle.join(" · ")}</span>
            </p>
          )}
        </div>
        {t.createdAt && (
          <time
            dateTime={t.createdAt}
            className="ml-auto hidden shrink-0 text-xs text-muted-foreground sm:block"
          >
            {fmtDate(t.createdAt)}
          </time>
        )}
      </div>

      {/* Footer */}
      <div className="relative mt-5 flex flex-wrap items-center border-t border-border pt-4">
        {confirming ? (
          <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
            <span className="mr-auto text-sm font-medium text-destructive">
              Delete this testimonial?
            </span>
            <button
              onClick={() => setConfirming(null)}
              className="h-9 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-accent"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(t.id);
                setConfirming(null);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground transition hover:opacity-90 active:scale-[0.97]"
            >
              <Trash2 className="h-3.5 w-3.5" /> Yes, delete
            </button>
          </div>
        ) : (
          <>
            {/* Primary approve action for pending items */}
            {!published && onTogglePublished && (
              <button
                onClick={() => onTogglePublished(t)}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 text-xs font-semibold text-emerald-600 outline-none transition hover:bg-emerald-500/20 focus-visible:ring-2 focus-visible:ring-emerald-500/40 active:scale-95 dark:text-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" /> Approve & publish
              </button>
            )}
            <div className="ml-auto flex items-center gap-1">
              {onToggleFeatured && (
                <button
                  onClick={() => onToggleFeatured(t)}
                  aria-pressed={!!t.isFeatured}
                  aria-label={
                    t.isFeatured ? "Remove from featured" : "Mark as featured"
                  }
                  title={t.isFeatured ? "Unfeature" : "Feature"}
                  className={`${iconBtn} ${t.isFeatured ? "text-amber-500" : ""}`}
                >
                  <Star
                    className={`h-4 w-4 ${t.isFeatured ? "fill-current" : ""}`}
                  />
                </button>
              )}
              {published && onTogglePublished && (
                <button
                  onClick={() => onTogglePublished(t)}
                  aria-label="Unpublish testimonial"
                  title="Unpublish"
                  className={iconBtn}
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(t)}
                  aria-label="Edit testimonial"
                  title="Edit"
                  className={iconBtn}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setConfirming(t.id)}
                aria-label="Delete testimonial"
                title="Delete"
                className="grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function TestimonialsTab({
  testimonials = [],
  onOpenAddModal,
  onDelete,
  // Optional extras: matching buttons only appear when provided
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("order");
  const [view, setView] = useState("grid");
  const [confirmId, setConfirmId] = useState(null);

  const counts = useMemo(
    () => ({
      "": testimonials.length,
      published: testimonials.filter(isPublished).length,
      draft: testimonials.filter((t) => !isPublished(t)).length,
      featured: testimonials.filter((t) => t.isFeatured).length,
    }),
    [testimonials],
  );

  const avg = useMemo(() => {
    const rated = testimonials.map(ratingOf).filter((n) => n != null && n > 0);
    return rated.length
      ? (rated.reduce((a, b) => a + b, 0) / rated.length).toFixed(1)
      : null;
  }, [testimonials]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = testimonials.filter((t) => {
      if (filter === "published" && !isPublished(t)) return false;
      if (filter === "draft" && isPublished(t)) return false;
      if (filter === "featured" && !t.isFeatured) return false;
      const r = ratingOf(t);
      if (rating === "none" && r != null) return false;
      if (rating && rating !== "none" && (r ?? 0) < Number(rating))
        return false;
      if (!q) return true;
      return [getName(t), t.position, t.role, t.company, getMessage(t)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const sorted = [...list];
    if (sort === "newest")
      sorted.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    else if (sort === "rating")
      sorted.sort((a, b) => (ratingOf(b) ?? -1) - (ratingOf(a) ?? -1));
    else if (sort === "name")
      sorted.sort((a, b) => getName(a).localeCompare(getName(b)));
    else sorted.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return sorted;
  }, [testimonials, query, filter, rating, sort]);

  const hasFilters = query || filter || rating;
  const selectCls =
    "h-11 min-w-0 flex-1 rounded-xl border border-input bg-background/60 px-3 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm lg:w-44 lg:flex-none";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review, approve and curate what clients and colleagues say.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant outline-none transition hover:opacity-95 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total" value={counts[""]} />
        <Stat
          label="Published"
          value={counts.published}
          tone="text-emerald-500"
        />
        <Stat
          label="Pending approval"
          value={counts.draft}
          tone={counts.draft ? "text-amber-500" : ""}
        />
        <Stat
          label="Average rating"
          value={
            avg == null ? (
              "–"
            ) : (
              <span className="inline-flex items-center gap-1.5">
                {avg} <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </span>
            )
          }
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
            placeholder="Search name, company or message"
            aria-label="Search testimonials"
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
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            aria-label="Filter by rating"
            className={selectCls}
          >
            {RATING_FILTERS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort testimonials"
            className={selectCls}
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
                className={`grid h-9 w-9 place-items-center rounded-lg transition ${view === id ? "gradient-bg text-primary-foreground shadow-elegant" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      {testimonials.length > 0 && (
        <div
          role="group"
          aria-label="Filter testimonials"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value || "all"}
                onClick={() => setFilter(f.value)}
                aria-pressed={active}
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 ${
                  active
                    ? "border-transparent gradient-bg text-primary-foreground shadow-elegant"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-xs ${active ? "bg-primary-foreground/20" : "bg-muted"}`}
                >
                  {counts[f.value]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {hasFilters && testimonials.length > 0 && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {testimonials.length} testimonials
        </p>
      )}

      {/* Results */}
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquareQuote className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No testimonials yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Add feedback from people you've worked with to build trust with
            visitors.
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add testimonial
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No matching testimonials</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search, rating or filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("");
              setRating("");
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
              ? "mx-auto grid max-w-3xl grid-cols-1 gap-4"
              : "columns-1 gap-5 md:columns-2 2xl:columns-3"
          }
        >
          {filtered.map((t) => (
            <TestimonialCard
              key={t.id}
              t={t}
              view={view}
              confirming={confirmId === t.id}
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
