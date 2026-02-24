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
    e.preventDefault()

    if(!name || !email || !password){
        toast.warning("Please fill in all fields.")
        return
    }

    if(password.length < 8){
        toast.warning("Password must be at least 8 characters.")
        return
    }

    const success = await signup(name, email, password)

    if(success){
        navigate('/')
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "400px" }}>
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center text-primary fw-bold mb-4">
            Create Account
          </h3>
          <p className="text-center text-muted mb-4">Join Workasana today.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control form-control-lg fs-6"
                placeholder="Muqeem Nasir"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg fs-6"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg fs-6"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 btn-lg fw-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <i className="spinner-border spinner-border-sm me-2"></i>
                  Creating...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an Account?{" "}
              <Link to="/login" className="text-decoration-none fw-bold">
                Login
              </Link>{" "}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup