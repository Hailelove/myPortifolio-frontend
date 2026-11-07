/* eslint-disable react-refresh/only-export-components */
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { authService } from "../services/auth.service";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsChecking(false);
      return;
    }

    let isMounted = true;

    async function checkAuth() {
      try {
        await authService.getCurrentAdmin();
        if (isMounted) {
          setIsChecking(false);
        }
      } catch (err) {
        if (isMounted) {
          navigate({ to: "/admin/login" });
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, isLoginPage]);

  if (isChecking && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <Outlet />;
}
