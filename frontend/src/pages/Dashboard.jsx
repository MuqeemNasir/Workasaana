import { useEffect, useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { Link } from "react-router-dom";
import { Spinner} from "react-bootstrap"
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuthStore();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ pending: 0, completed: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get(`/tasks?owner=${user?._id}`);

        setTasks(data.data || []);

        const pending = data.data.filter(
          (t) => t.status === "Completed",
        ).length;
        const completed = data.data.filter(
          (t) => t.status !== "Completed",
        ).length;
        setStats({ pending, completed });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Dashboard</h2>
      <p className="text-muted">
        Welcome back, <strong>{user?.name}</strong>!
      </p>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card-border-0 shadow-sm bg-white border-start border-0 border-warning">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Pending Tasks</h6>
              <h2 className="mb-0 text-warning">{stats.pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card-border-0 shadow-sm bg-white border-start border-0 border-warning">
            <div className="card-body">
              <h6 className="text-muted text-uppercase">Completed Tasks</h6>
              <h2 className="mb-0 text-warning">{stats.completed}</h2>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">My Recent Tasks</h5>
            <Link to="/tasks" className="btn btn-sm btn-outline-primary">View All</Link>
          </div>
          <div className="card-body p-0">
            {tasks.length === 0 ? (
                <div className="p-4 text-center text-muted">No tasks assigned to you yet.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Task Name</th>
                                <th>Project</th>
                                <th>Status</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.slice(0, 5).map((task) => (
                                <tr key={task._id}>
                                    <td className="ps-4 fw-semibold">{task.name}</td>
                                    <td><span className={`badge rounded-pill task.status === 'Completed' ? 'bg-success' : task.stats === 'In Progress' ? 'bg-primary' : 'bg-secondary'`}>{task.status}</span></td>
                                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
