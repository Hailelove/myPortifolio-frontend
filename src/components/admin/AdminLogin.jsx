import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { authService } from "../../services/auth.service";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login(username, password);
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 py-8 sm:px-6 overflow-hidden">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-32 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          {/* Top accent line */}
          <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-flex mb-5">
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg text-primary-foreground shadow-elegant">
                <ShieldCheck className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Restricted access. Authorized personnel only.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Username or Email
              </label>
              <div className="group relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                  <User className="h-4 w-4" />
                </span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background/60 text-foreground text-base sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter username or email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Password
              </label>
              <div className="group relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground transition-colors group-focus-within:text-primary">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full h-12 pl-11 pr-12 rounded-xl border border-input bg-background/60 text-foreground text-base sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-12 rounded-r-xl text-muted-foreground hover:text-foreground focus:outline-none focus-visible:text-primary transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="h-[18px] w-[18px]" />
                  ) : (
                    <Eye className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold shadow-elegant hover:opacity-95 hover:shadow-lg active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Secured connection · Activity is monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
}
