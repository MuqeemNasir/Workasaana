import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { signup, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters.");
      return;
    }

    const success = await signup(name, email, password);

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
            <h3 className="text-dark fw-bold mb-1">
              Get Started
            </h3>
            <p className="text-muted small">Create your free account.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-bold small text-secondary">Full Name</label>
              <input
                type="text"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="Muqeem Nasir"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold small text-secondary">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg bg-light border-0 fs-6"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary">Password</label>
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
              style={{background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none'}}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              Already have an Account?{" "}
              <Link to="/login" className="text-primary text-decoration-none fw-bold">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
