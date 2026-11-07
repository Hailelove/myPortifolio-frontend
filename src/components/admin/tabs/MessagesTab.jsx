import { useState, useEffect } from "react";
import {
  CheckCircle,
  Trash2,
  Loader2,
  RefreshCw,
  Archive,
  MessageSquareReply,
  Search,
  X,
  Mail,
  Inbox,
  Copy,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Reply,
} from "lucide-react";
import { contactService } from "../../../services/contact.service";

// ---------- presentation helpers (no app logic) ----------
const FILTERS = [
  { value: "", label: "All" },
  { value: "NEW", label: "New" },
  { value: "READ", label: "Read" },
  { value: "REPLIED", label: "Replied" },
  { value: "ARCHIVED", label: "Archived" },
];

const STATUS_STYLE = {
  NEW: {
    badge: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    bar: "bg-destructive",
  },
  READ: {
    badge: "bg-blue-500/10 text-blue-500",
    dot: "bg-blue-500",
    bar: "bg-blue-500/40",
  },
  REPLIED: {
    badge: "bg-emerald-500/10 text-emerald-500",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500/40",
  },
  ARCHIVED: {
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    bar: "bg-border",
  },
};

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";

const timeAgo = (value) => {
  const date = new Date(value);
  if (isNaN(date)) return "";
  const s = Math.round((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "Just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
};

const actionBtn =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium outline-none transition hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  // UI-only state
  const [expandedId, setExpandedId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [busy, setBusy] = useState(null); // { id, action }
  const [copiedId, setCopiedId] = useState(null);

  const loadMessages = async (page = 1, status = "", search = "") => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 10 };
      if (status) params.status = status;
      if (search) params.search = search;

      const result = await contactService.listMessages(params);
      setMessages(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load messages from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages(1, statusFilter, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    setBusy({ id, action: newStatus });
    try {
      await contactService.updateStatus(id, newStatus);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
      );
    } catch (err) {
      console.error("Failed to update status", err);
      setError(err.message || "Could not update the message status.");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (id) => {
    setBusy({ id, action: "DELETE" });
    try {
      await contactService.deleteMessage(id);
      const remaining = messages.filter((m) => m.id !== id);
      setMessages(remaining);
      setConfirmId(null);
      // If that was the last item on a later page, step back one page
      if (remaining.length === 0 && (pagination.page || 1) > 1) {
        loadMessages(pagination.page - 1, statusFilter, searchQuery);
      }
    } catch (err) {
      console.error("Failed to delete message", err);
      setError(err.message || "Could not delete the message.");
    } finally {
      setBusy(null);
    }
  };

  const copyEmail = async (msg) => {
    try {
      await navigator.clipboard.writeText(msg.email);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    loadMessages(1, statusFilter, "");
  };

  const page = pagination?.page || 1;
  const totalPages = pagination?.totalPages || 1;
  const isBusy = (id, action) => busy?.id === id && busy?.action === action;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Contact inquiries
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Messages submitted by visitors across your site.
          </p>
        </div>

        <div className="flex w-full items-center gap-2 lg:w-auto">
          <div className="group relative flex-1 lg:w-72 lg:flex-none">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search name or email"
              aria-label="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && loadMessages(1, statusFilter, searchQuery)
              }
              className="h-11 w-full rounded-xl border border-input bg-background/60 pl-10 pr-10 text-base outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15 sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => loadMessages(page, statusFilter, searchQuery)}
            disabled={loading}
            aria-label="Refresh messages"
            title="Refresh"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground outline-none transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div
        role="group"
        aria-label="Filter by status"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FILTERS.map((f) => {
          const active = statusFilter === f.value;
          return (
            <button
              key={f.value || "all"}
              onClick={() => setStatusFilter(f.value)}
              aria-pressed={active}
              className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 ${
                active
                  ? "border-transparent gradient-bg text-primary-foreground shadow-elegant"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="flex-1 leading-snug">{error}</span>
          <button
            onClick={() => loadMessages(page, statusFilter, searchQuery)}
            className="shrink-0 font-semibold underline-offset-2 hover:underline"
          >
            Retry
          </button>
          <button
            onClick={() => setError("")}
            aria-label="Dismiss error"
            className="shrink-0 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Content */}
      {loading && messages.length === 0 ? (
        <div
          className="space-y-3"
          aria-busy="true"
          aria-label="Loading messages"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="font-semibold">No messages found</h3>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            {searchQuery || statusFilter
              ? "Nothing matches your search or filter. Try clearing them."
              : "New inquiries from your contact form will show up here."}
          </p>
          {(searchQuery || statusFilter) && (
            <button
              onClick={() => {
                setSearchQuery("");
                if (statusFilter) setStatusFilter("");
                else loadMessages(1, "", "");
              }}
              className="mt-5 h-10 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-accent"
            >
              Clear search and filter
            </button>
          )}
        </div>
      ) : (
        <div
          className={`space-y-3 transition-opacity ${loading ? "opacity-60" : ""}`}
        >
          {messages.map((msg) => {
            const style = STATUS_STYLE[msg.status] || STATUS_STYLE.ARCHIVED;
            const isLong = (msg.message || "").length > 180;
            const expanded = expandedId === msg.id;
            const confirming = confirmId === msg.id;
            const rowBusy = busy?.id === msg.id;

            return (
              <article
                key={msg.id}
                className={`relative overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:shadow-md ${
                  msg.status === "NEW"
                    ? "border-destructive/30"
                    : "border-border"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-1 ${style.bar}`}
                />

                <div className="p-5 pl-6 sm:p-6 sm:pl-7">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {initials(msg.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <h3 className="truncate text-base font-bold">
                          {msg.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${style.dot} ${
                              msg.status === "NEW" ? "animate-pulse" : ""
                            }`}
                          />
                          {msg.status}
                        </span>
                        <time
                          dateTime={msg.createdAt}
                          title={new Date(msg.createdAt).toLocaleString()}
                          className="text-xs text-muted-foreground sm:ml-auto"
                        >
                          {timeAgo(msg.createdAt)}
                        </time>
                      </div>

                      {/* Email */}
                      <div className="mt-1 flex items-center gap-1.5">
                        <a
                          href={`mailto:${msg.email}`}
                          className="inline-flex min-w-0 items-center gap-1.5 text-sm text-primary hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{msg.email}</span>
                        </a>
                        <button
                          onClick={() => copyEmail(msg)}
                          aria-label="Copy email address"
                          title="Copy email"
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Body */}
                      {msg.subject && (
                        <p className="mt-3 text-sm font-semibold">
                          {msg.subject}
                        </p>
                      )}
                      <p
                        className={`mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground ${
                          expanded ? "" : "line-clamp-3"
                        }`}
                      >
                        {msg.message}
                      </p>
                      {isLong && (
                        <button
                          onClick={() =>
                            setExpandedId(expanded ? null : msg.id)
                          }
                          aria-expanded={expanded}
                          className="mt-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {expanded ? "Show less" : "Read full message"}
                        </button>
                      )}

                      {expanded && msg.ipAddress && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          IP: {msg.ipAddress} · Received{" "}
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                    {confirming ? (
                      <div className="flex w-full flex-wrap items-center gap-2 animate-in fade-in duration-150">
                        <span className="mr-auto text-sm font-medium text-destructive">
                          Delete this message permanently?
                        </span>
                        <button
                          onClick={() => setConfirmId(null)}
                          disabled={rowBusy}
                          className={actionBtn}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          disabled={rowBusy}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-destructive px-3.5 text-xs font-semibold text-destructive-foreground outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-destructive/50 active:scale-[0.97] disabled:opacity-50"
                        >
                          {isBusy(msg.id, "DELETE") ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Yes, delete
                        </button>
                      </div>
                    ) : (
                      <>
                        <a
                          href={`mailto:${msg.email}${
                            msg.subject
                              ? `?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`
                              : ""
                          }`}
                          className={`${actionBtn} bg-primary/5 text-primary hover:bg-primary/10`}
                        >
                          <Reply className="h-3.5 w-3.5" /> Reply by email
                        </a>

                        {msg.status === "NEW" && (
                          <button
                            onClick={() => handleStatusChange(msg.id, "READ")}
                            disabled={rowBusy}
                            className={actionBtn}
                          >
                            {isBusy(msg.id, "READ") ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                            )}
                            Mark read
                          </button>
                        )}
                        {msg.status !== "REPLIED" && (
                          <button
                            onClick={() =>
                              handleStatusChange(msg.id, "REPLIED")
                            }
                            disabled={rowBusy}
                            className={actionBtn}
                          >
                            {isBusy(msg.id, "REPLIED") ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <MessageSquareReply className="h-3.5 w-3.5 text-emerald-500" />
                            )}
                            Mark replied
                          </button>
                        )}
                        {msg.status !== "ARCHIVED" && (
                          <button
                            onClick={() =>
                              handleStatusChange(msg.id, "ARCHIVED")
                            }
                            disabled={rowBusy}
                            className={actionBtn}
                          >
                            {isBusy(msg.id, "ARCHIVED") ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Archive className="h-3.5 w-3.5 text-amber-500" />
                            )}
                            Archive
                          </button>
                        )}

                        <button
                          onClick={() => setConfirmId(msg.id)}
                          disabled={rowBusy}
                          aria-label="Delete message"
                          title="Delete message"
                          className="ml-auto grid h-9 w-9 place-items-center rounded-lg text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 active:scale-95 disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {messages.length > 0 && totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-3 pt-2"
        >
          <button
            onClick={() => loadMessages(page - 1, statusFilter, searchQuery)}
            disabled={page <= 1 || loading}
            className={`${actionBtn} h-10 px-4`}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <span className="text-sm text-muted-foreground">
            Page <span className="font-semibold text-foreground">{page}</span>{" "}
            of {totalPages}
          </span>
          <button
            onClick={() => loadMessages(page + 1, statusFilter, searchQuery)}
            disabled={page >= totalPages || loading}
            className={`${actionBtn} h-10 px-4`}
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
