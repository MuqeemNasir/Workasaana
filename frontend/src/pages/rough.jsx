import { useEffect, useState } from 'react';
import useAuthStore from '../stores/useAuthStore';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          // 1. Fetch User's Tasks
          const taskRes = await api.get(`/tasks?owner=${user._id}`);
          setTasks(taskRes.data.data || []);

          // 2. Fetch Projects 
          const projectRes = await api.get('/projects');
          setProjects(projectRes.data.data || []);
        }
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Helper for Status Colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success'; // Green
      case 'In Progress': return 'warning'; // Yellow/Orange
      case 'Blocked': return 'danger'; // Red
      default: return 'primary'; // Blue (To Do)
    }
  };

  if (loading) return <div className="p-5 text-center text-muted">Loading dashboard...</div>;

  return (
    <div className="container-fluid px-4 py-4">
      
      {/* --- HEADER --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0">Dashboard</h2>
          <p className="text-muted small mb-0">Welcome back, {user?.name}</p>
        </div>
        <input type="text" className="form-control w-25 rounded-pill bg-white border-0 shadow-sm px-3 d-none d-md-block" placeholder="Search..." />
      </div>

      {/* --- SECTION 1: PROJECTS GRID --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-secondary">Projects</h5>
        <Link to="/projects" className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">+ New Project</Link>
      </div>

      <div className="row mb-5">
        {projects.slice(0, 3).map((project) => (
          <div className="col-md-4 mb-3" key={project._id}>
            <div className="card h-100 border-0 shadow-sm p-3 bg-white hover-shadow transition-all">
              <div className="d-flex justify-content-between mb-2">
                <span className="badge bg-light text-dark border rounded-pill px-3">Active</span>
              </div>
              <h5 className="fw-bold mb-1 text-dark">{project.name}</h5>
              <p className="text-muted small mb-3 text-truncate">{project.description || "No description provided."}</p>
              
              <div className="mt-auto d-flex align-items-center">
                <div className="d-flex">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center border border-white" style={{width:28, height:28, fontSize:12}}>A</div>
                  <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center border border-white" style={{width:28, height:28, fontSize:12, marginLeft: -10}}>B</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="col-12 text-muted">No projects found.</div>}
      </div>

      {/* --- SECTION 2: MY TASKS (DIV-BASED LIST) --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-secondary">My Tasks</h5>
        <button className="btn btn-light btn-sm border bg-white shadow-sm">Filter</button>
      </div>

      <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
        
        {/* LIST HEADER (Visible on Desktop) */}
        <div className="d-none d-md-flex row mx-0 bg-light py-3 border-bottom fw-bold text-secondary text-uppercase small">
          <div className="col-5 ps-4">Task Name</div>
          <div className="col-2">Status</div>
          <div className="col-2">Priority</div>
          <div className="col-3 text-end pe-4">Due Date</div>
        </div>

        {/* LIST BODY */}
        <div className="bg-white">
          {tasks.length > 0 ? tasks.map((task) => (
            
            // TASK ROW
            <div key={task._id} className="row mx-0 py-3 border-bottom align-items-center hover-bg-light transition-all">
              
              {/* Column 1: Name + Project */}
              <div className="col-12 col-md-5 ps-4 mb-2 mb-md-0">
                <div className="fw-bold text-dark">{task.name}</div>
                <div className="small text-muted">{task.project?.name || "No Project"}</div>
              </div>

              {/* Column 2: Status Badge */}
              <div className="col-6 col-md-2">
                <span className={`badge bg-${getStatusColor(task.status)} bg-opacity-10 text-${getStatusColor(task.status)} px-3 py-2 rounded-pill`}>
                  {task.status}
                </span>
              </div>

              {/* Column 3: Priority (Static for now) */}
              <div className="col-6 col-md-2">
                <span className="text-danger fw-bold small">High</span>
              </div>

              {/* Column 4: Date */}
              <div className="col-12 col-md-3 text-md-end text-muted small pe-4 mt-2 mt-md-0">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
              </div>

            </div>

          )) : (
            <div className="p-5 text-center text-muted">
              No tasks assigned to you yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;