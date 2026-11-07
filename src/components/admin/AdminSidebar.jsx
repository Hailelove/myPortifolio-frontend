import { useEffect, useRef, useState } from "react";
import { LogOut, X, ChevronLeft } from "lucide-react";

const STORAGE_KEY = "admin-sidebar-collapsed";

export default function AdminSidebar({
  navItems,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
}) {
  // Desktop-only UI state (remembered between visits, no app logic involved)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tip, setTip] = useState(null); // { label, top }
  const asideRef = useRef(null);

  const toggleCollapsed = () => {
    setTip(null);
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsSidebarOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // "[" toggles the desktop sidebar (ignored while typing)
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (e.key !== "[" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable)
        return;
      toggleCollapsed();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Tooltip is rendered outside the scrolling nav so it never gets clipped
  const tipProps = (label) => ({
    onMouseEnter: (e) => {
      if (!collapsed || !asideRef.current) return;
      const r = e.currentTarget.getBoundingClientRect();
      const a = asideRef.current.getBoundingClientRect();
      setTip({ label, top: r.top - a.top + r.height / 2 });
    },
    onMouseLeave: () => setTip(null),
    onFocus: (e) => {
      if (!collapsed || !asideRef.current) return;
      const r = e.currentTarget.getBoundingClientRect();
      const a = asideRef.current.getBoundingClientRect();
      setTip({ label, top: r.top - a.top + r.height / 2 });
    },
    onBlur: () => setTip(null),
  });

  // Labels fade and slide away smoothly on desktop when collapsed
  const label = `overflow-hidden whitespace-nowrap transition-all duration-300 ${
    collapsed
      ? "md:max-w-0 md:opacity-0 md:ml-0"
      : "max-w-[12rem] opacity-100 ml-3"
  }`;

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={asideRef}
        aria-label="Admin navigation"
        className={`fixed inset-y-0 left-0 z-50 h-[100dvh] w-72 md:sticky md:top-0 md:z-40 ${
          collapsed ? "md:w-[76px]" : "md:w-64"
        } shrink-0 flex flex-col border-r border-border bg-card shadow-2xl md:shadow-none transition-[transform,width] duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Edge toggle (desktop) */}
        <button
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand  [" : "Collapse  ["}
          className="hidden md:grid absolute -right-3 top-[26px] z-10 h-6 w-6 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm outline-none transition hover:bg-primary hover:text-primary-foreground hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <ChevronLeft
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Brand */}
        <div
          className={`h-16 shrink-0 border-b border-border px-4 flex items-center justify-between ${
            collapsed ? "md:justify-center md:px-0" : ""
          }`}
        >
          <div className="flex items-center min-w-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-bg text-primary-foreground font-bold shadow-elegant">
              D
            </div>
            <div className={`min-w-0 leading-tight ${label}`}>
              <span className="block font-bold text-lg gradient-text">
                Deme
              </span>
              <span className="block text-xs text-muted-foreground">
                Admin panel
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
            className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          onScroll={() => setTip(null)}
          className={`flex-1 overflow-y-auto overflow-x-hidden py-5 space-y-1.5 ${
            collapsed ? "px-3 md:px-0" : "px-3"
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasBadge = item.badge > 0;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                {...tipProps(item.label)}
                className={`group relative flex h-11 w-full items-center justify-between rounded-xl px-3.5 text-sm font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  collapsed
                    ? "md:mx-auto md:w-11 md:justify-center md:px-0"
                    : ""
                } ${
                  isActive
                    ? "gradient-bg text-primary-foreground shadow-elegant"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <span className="flex items-center min-w-0">
                  <span className="relative shrink-0">
                    <Icon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isActive ? "" : "group-hover:scale-110"
                      }`}
                    />
                    {hasBadge && collapsed && (
                      <span
                        className={`hidden md:block absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ${
                          isActive ? "ring-primary" : "ring-card"
                        }`}
                      />
                    )}
                  </span>
                  <span className={`truncate ${label}`}>{item.label}</span>
                </span>

                {hasBadge && (
                  <span
                    className={`min-w-[1.4rem] rounded-full px-1.5 py-0.5 text-center text-xs font-bold ${
                      collapsed ? "md:hidden" : ""
                    } ${
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "bg-destructive text-destructive-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`shrink-0 border-t border-border p-3 space-y-1.5 ${
            collapsed ? "md:px-0" : ""
          }`}
        >
          <div
            {...tipProps("Administrator")}
            className={`flex items-center rounded-xl bg-accent/50 p-2.5 ${
              collapsed
                ? "md:mx-auto md:w-11 md:justify-center md:bg-transparent md:p-0"
                : ""
            }`}
          >
            <div className="relative shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary text-sm font-semibold">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card" />
            </div>
            <div className={`min-w-0 leading-tight ${label}`}>
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-muted-foreground">Signed in</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            aria-label="Logout"
            {...tipProps("Logout")}
            className={`flex h-11 w-full items-center rounded-xl px-3.5 text-sm font-medium text-destructive outline-none transition hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/40 ${
              collapsed ? "md:mx-auto md:w-11 md:justify-center md:px-0" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={label}>Logout</span>
          </button>
        </div>

        {/* Tooltip for collapsed mode */}
        {collapsed && tip && (
          <div
            role="tooltip"
            style={{ top: tip.top }}
            className="pointer-events-none absolute left-full ml-3 hidden md:block -translate-y-1/2 animate-in fade-in slide-in-from-left-1 duration-150"
          >
            <div className="relative whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-lg">
              <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-foreground" />
              {tip.label}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
