import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const hash = window.location.hash;
    const sessionId = new URLSearchParams(hash.slice(1)).get("session_id");
    if (!sessionId) {
      navigate("/admin/login", { replace: true });
      return;
    }
    api.post("/auth/session", { session_id: sessionId })
      .then((res) => {
        setUser(res.data);
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/admin", { replace: true, state: { user: res.data } });
      })
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate, setUser]);

  return <div className="min-h-screen flex items-center justify-center text-slate-500">Signing you in…</div>;
}
