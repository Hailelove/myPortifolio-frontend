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
  Layers,
  Check,
  Tag,
} from "lucide-react";

// ---------- Config ----------
const SORTS = [
  { value: "order", label: "Custom order" },
  { value: "name", label: "Name (A–Z)" },
  { value: "priceLow", label: "Price (low–high)" },
  { value: "priceHigh", label: "Price (high–low)" },
];

const FILTERS = [
  { value: "", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
];

// ---------- Helpers (accept schema records and your older mock shape) ----------
const getSkills = (s) =>
  Array.isArray(s.skills)
    ? s.skills
        .map((x) => (typeof x === "string" ? x : (x?.skill?.name ?? x?.name)))
        .filter(Boolean)
    : [];

const getFeatures = (s) =>
  Array.isArray(s.features) ? s.features.filter(Boolean) : [];

// Prisma Decimal arrives as a string over JSON, so normalise to a number
const priceOf = (s) => {
  if (s.startingPrice == null || s.startingPrice === "") return null;
  const n = Number(s.startingPrice);
  return Number.isFinite(n) ? n : null;
};

const formatPrice = (n, currency = "ETB") => {
  const code = currency || "ETB";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code,
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${code} ${n.toLocaleString()}`;
  }
};

const isPublished = (s) => s.isPublished !== false;

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95";

// ---------- Components ----------
function ServiceIcon({ service, size = "h-12 w-12" }) {
  const [failed, setFailed] = useState(false);
  const icon = service.icon;
  const isUrl =
    typeof icon === "string" && /^(https?:\/\/|\/|data:image)/.test(icon);
  const isEmoji =
    typeof icon === "string" && icon && !isUrl && [...icon].length <= 2;

  return (
    <div
      className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-xl bg-primary/10 text-primary`}
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
        <Layers className="h-5 w-5" />
      )}
    </div>
  );
}

function PriceTag({ service }) {
  const price = priceOf(service);
  if (price == null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
        <Tag className="h-3.5 w-3.5" /> Custom quote
      </span>
    );
  }
  return (
    <span className="inline-flex flex-col items-end leading-tight">
      <span className="text-[11px] text-muted-foreground">Starting at</span>
      <span className="text-base font-bold text-primary">
        {formatPrice(price, service.currency)}
      </span>
    </span>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`mt-1 truncate text-2xl font-bold tracking-tight ${tone || ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function ServiceCard({
  service,
  view,
  confirming,
  setConfirming,
  onDelete,
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [expanded, setExpanded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const published = isPublished(service);
  const list = view === "list";
  const features = getFeatures(service);
  const skills = getSkills(service);
  const summary = service.shortDescription || service.description;
  const showFeatures = expanded ? features : features.slice(0, 3);
  const hasImage = service.imageUrl && !imgFailed;

  const actions = confirming ? (
    <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
      <span className="mr-auto text-sm font-medium text-destructive">
        Delete this service?
      </span>
      <button
        onClick={() => setConfirming(null)}
        className="h-9 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-accent"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onDelete(service.id);
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
          onClick={() => onToggleFeatured(service)}
          aria-pressed={!!service.isFeatured}
          aria-label={
            service.isFeatured ? "Remove from featured" : "Mark as featured"
          }
          title={service.isFeatured ? "Unfeature" : "Feature"}
          className={`${iconBtn} ${service.isFeatured ? "text-amber-500" : ""}`}
        >
          <Star
            className={`h-4 w-4 ${service.isFeatured ? "fill-current" : ""}`}
          />
        </button>
      )}
      {onTogglePublished && (
        <button
          onClick={() => onTogglePublished(service)}
          aria-label={published ? "Unpublish service" : "Publish service"}
          title={published ? "Unpublish" : "Publish"}
          className={iconBtn}
        >
          {published ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      )}
      {onEdit && (
        <button
          onClick={() => onEdit(service)}
          aria-label="Edit service"
          title="Edit"
          className={iconBtn}
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => setConfirming(service.id)}
        aria-label="Delete service"
        title="Delete"
        className="grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );

  const badges = (
    <>
      {service.isFeatured && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
          <Star className="h-3 w-3 fill-current" /> Featured
        </span>
      )}
      {!published && (
        <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-muted-foreground shadow backdrop-blur">
          <EyeOff className="h-3 w-3" /> Draft
        </span>
      )}
    </>
  );

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        list ? "flex-col sm:flex-row" : "flex-col"
      } ${published ? "border-border" : "border-dashed border-border"}`}
    >
      {hasImage && (
        <div
          className={`relative shrink-0 overflow-hidden bg-muted ${list ? "aspect-[16/9] sm:aspect-auto sm:w-56" : "aspect-[16/9]"}`}
        >
          <img
            src={service.imageUrl}
            alt={service.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">{badges}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <ServiceIcon service={service} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
            {service.slug && (
              <p className="truncate text-xs text-muted-foreground">
                /{service.slug}
              </p>
            )}
            {!hasImage && (service.isFeatured || !published) && (
              <div className="mt-2 flex flex-wrap gap-1.5">{badges}</div>
            )}
          </div>
          <PriceTag service={service} />
        </div>

        {summary && (
          <p
            className={`mt-3 text-sm leading-relaxed text-muted-foreground ${list ? "line-clamp-2" : "line-clamp-3"}`}
          >
            {summary}
          </p>
        )}

        {features.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {showFeatures.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="min-w-0 break-words">{f}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li>
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {expanded
                    ? "Show fewer"
                    : `Show ${features.length - 3} more feature${features.length - 3 > 1 ? "s" : ""}`}
                </button>
              </li>
            )}
          </ul>
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

        <div className="mt-auto flex flex-wrap items-center border-t border-border pt-4 mt-5">
          {actions}
        </div>
      </div>
    </article>
  );
}

export default function ServicesTab({
  services = [],
  onOpenAddModal,
  onDelete,
  // Optional extras: matching buttons only appear when provided
  onEdit,
  onTogglePublished,
  onToggleFeatured,
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("order");
  const [view, setView] = useState("grid");
  const [confirmId, setConfirmId] = useState(null);

  const counts = useMemo(
    () => ({
      "": services.length,
      featured: services.filter((s) => s.isFeatured).length,
      published: services.filter(isPublished).length,
      draft: services.filter((s) => !isPublished(s)).length,
    }),
    [services],
  );

  const stats = useMemo(() => {
    const prices = services.map(priceOf).filter((n) => n != null);
    const first = services.find((s) => priceOf(s) === Math.min(...prices));
    return {
      lowest: prices.length
        ? formatPrice(Math.min(...prices), first?.currency)
        : "–",
      priced: prices.length,
    };
  }, [services]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = services.filter((s) => {
      if (filter === "featured" && !s.isFeatured) return false;
      if (filter === "published" && !isPublished(s)) return false;
      if (filter === "draft" && isPublished(s)) return false;
      if (!q) return true;
      return [
        s.title,
        s.shortDescription,
        s.description,
        ...getFeatures(s),
        ...getSkills(s),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    const sorted = [...list];
    if (sort === "name")
      sorted.sort((a, b) => String(a.title).localeCompare(String(b.title)));
    else if (sort === "priceLow")
      sorted.sort(
        (a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity),
      );
    else if (sort === "priceHigh")
      sorted.sort((a, b) => (priceOf(b) ?? -1) - (priceOf(a) ?? -1));
    else sorted.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    return sorted;
  }, [services, query, filter, sort]);

  const hasFilters = query || filter;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Services offered
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage what you offer, what's included and what it costs.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-primary-foreground shadow-elegant outline-none transition hover:opacity-95 focus-visible:ring-4 focus-visible:ring-primary/30 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total services" value={counts[""]} />
        <Stat
          label="Published"
          value={counts.published}
          tone="text-emerald-500"
        />
        <Stat label="Featured" value={counts.featured} tone="text-amber-500" />
        <Stat
          label="Prices start at"
          value={stats.lowest}
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
            placeholder="Search title, feature or skill"
            aria-label="Search services"
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
            aria-label="Sort services"
            className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background/60 px-3 text-base outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm lg:w-48 lg:flex-none"
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

      {/* Filter chips */}
      {services.length > 0 && (
        <div
          role="group"
          aria-label="Filter services"
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

      {hasFilters && services.length > 0 && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filtered.length} of {services.length} services
        </p>
      )}

      {/* Results */}
      {services.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Layers className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No services yet</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Add the services you offer so clients know how you can help.
          </p>
          <button
            onClick={onOpenAddModal}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl gradient-bg px-4 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add service
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Search className="mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-semibold">No matching services</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setFilter("");
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
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              view={view}
              confirming={confirmId === service.id}
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
