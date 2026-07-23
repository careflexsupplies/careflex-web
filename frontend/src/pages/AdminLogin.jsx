import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/admin");
  }, [user, loading, navigate]);

  const login = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/admin";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <HeartPulse className="w-9 h-9 text-accent" aria-hidden="true" />
          <span className="font-serif text-3xl font-bold text-primary">CareFlex</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2" data-testid="admin-login-title">Staff Dashboard</h1>
        <p className="text-slate-600 mb-8">Sign in with your Google account to manage products, content, and leads.</p>
        <button onClick={login} data-testid="google-login-button"
          className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
          <LogIn className="w-5 h-5" aria-hidden="true" /> Sign in with Google
        </button>
        <a href="/" className="inline-block mt-6 text-primary font-semibold hover:text-accent transition-colors" data-testid="back-to-site-link">← Back to website</a>
      </div>
    </div>
  );
}
