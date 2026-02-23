import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../stores/useAuthStore"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { login, isLoading } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const success = await login(email, password)
        if(success){
            navigate('/')
        }
    }

    return(
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-lg border-0" style={{width: '400px'}}>
                <div className="card-body p-4 p-md-5">
                    <h3 className="text-center text-primary fw-bold mb-4">Workasana</h3>
                    <p className="text-center text-muted mb-4">Welcome back! Please Login.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email Address</label>
                            <input type="email" className="form-control form-control-lg fs-6" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Password</label>
                            <input type="password" className="form-control form-control-lg fs-6" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold" disabled={isLoading}>
                            {isLoading ? (
                                <span><i className="spinner-border spinner-border-sm me-2"></i>Loading...</span>
                            ) : "Login"}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <small className="text-muted">
                            New here? <Link to="/signup" className="text-decoration-none fw-bold">Create Account</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login