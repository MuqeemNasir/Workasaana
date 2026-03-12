import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields to login.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="auth-container min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div className="auth-overlay"></div>
      <div
        className="card glass-card border-0 w-100 position-relative z-1"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-body p-4 p-sm-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 p-2 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              <span
                className="text-white fw-bold fs-4"
                style={{ lineHeight: 1 }}
              >
                W
              </span>
            </div>
            <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
            <p className="text-muted small">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-bold small text-secondary">
                Email Address
              </label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label fw-bold small text-secondary">
                  Password
                </label>
                <Link
                  to="#"
                  className="small text-primary text-decoration-none fw-bold"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg fw-bold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                border: "none",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-8">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary text-decoration-none fw-bold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
