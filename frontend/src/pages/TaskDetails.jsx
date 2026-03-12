import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaArrowLeft, FaCheck, FaHashtag, FaTrash } from "react-icons/fa";
import { calculateDueDate, calculateTimeRemaining, getBadgeClass, getInitials } from "../utils/formatters";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchTask = async () => {
    try {
      const { data } = await api.get(`/tasks/${id}`);
      setTask(data);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to load task details.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const markAsComplete = async () => {
    setUpdating(true);
    try {
      await api.patch(`/tasks/${id}`, { status: "Completed" });
      toast.success("Task marked as completed!");
      fetchTask();
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success("Task Deleted");
        navigate(-1);
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (!task) return null;

  return(
    <div className="container-fluid px-3 px-md-4 py-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div className="d-flex align-items center gap-3">
                <button className="btn btn-light border rounded-circle shadow-sm flex-shrink-0 d-flex justify-content-center align-items-center" style={{width: '40px', height: '40px'}} onClick={() => navigate(-1)}>
                    <FaArrowLeft size={14} />
                </button>
                <div className="text-truncate">
                    <span className="text-muted small fw-bold text-uppercase tracking-wide">Task</span>
                    <h3 className="fw-bold text-dark mb-0 text-truncate">{task.name}</h3>
                </div>
            </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 bg-white mx-auto" style={{maxWidth: '800px'}}>
            <div className="card-body p-4 p-md-5">
                <h5 className="fw-bold text-secondary mb-4 border-bottom pb-3">Task Details</h5>
                <div className="row mb-3">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Project:</div>
                    <div className="col-8 col-sm-9 fw-semibold text-dark">{task.project?.name || 'N/A'}</div>
                </div>

                <div className="row mb-3">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Team:</div>
                    <div className="col-8 col-sm-9 fw-semibold text-dark">{task.team?.name || 'N/A'}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Owners:</div>
                    <div className="col-8 col-sm-9">
                        <div className="d-flex flex-wrap gap-2">
                            {task.owners && task.owners.length > 0 ? (
                                task.owners.map(owner => (
                                    <span key={owner._id} className="badge bg-light text-dark border py-1 px-3 d-flex align-items-center gap-3">
                                        <div className="avatar-circle bg-primary" title={owner.name} style={{width: 20, height: 20, fontSize: 8}}>{getInitials(owner.name)}</div>
                                        {owner.name}
                                    </span>
                                ))
                            ) : <span className="text-muted small">Unassigned</span> }
                        </div>
                    </div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Tags:</div>
                    <div className="col-8 col-sm-9">
                        <div className="d-flex flex-wrap gap-2">
                            {task.tags && task.tags.length > 0 ? (
                                task.tags.map(tag => (
                                    <span key={tag} className="badge bg-warning bg-opacity-10 text-dark border border-warning border-opacity-25 px-2 py-1">
                                        <FaHashtag size={10} className="text-warning me-1" />
                                        {tag}
                                    </span>
                                ))
                            ) : <span className="text-muted small">None</span> }
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Due Date:</div>
                    <div className="col-8 col-sm-9 fw-semibold text-dark">
                        {calculateDueDate(task.createdAt, task.timeToComplete)}
                    </div>
                </div>
                
            </div>

            <div className="card-footer bg-light p-4 p-md-5 border-top">
                <div className="row mb-3 align-items-center">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Status:</div>
                    <div className="col-8 col-sm-9">
                        <span className={`status-badge ${getBadgeClass(task.status)} px-3 py-2 fs-6`}>
                            {task.status}
                        </span>
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <div className="col-4 col-sm-3 text-muted fw-bold small">Time Remaining:</div>
                    <div className="col-8 col-sm-9">
                        <span className={`fw-bold ${task.status === 'Completed' ? 'text-success' : 'text-danger'}`}>
                            {calculateTimeRemaining(task.createdAt, task.timeToComplete, task.status)}
                        </span>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-4 pt-3 border-top border-secondary border-opacity-10">
                    <button className="btn btn-outline-danger btn-sm px-4 rounded-pill fw-semibold order-2 order-sm-1" onClick={handleDelete}>
                        <FaTrash className="me-2" /> Delete Task
                    </button>

                    {task.status !== 'Completed' ? (
                    <button className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center order-1 order-sm-2" onClick={markAsComplete} disabled={updating}>
                        <FaCheck className="me-2" /> {updating ? 'Updating...' : 'Mark as Complete'}
                    </button>
                    ) : (
                    <button className="btn btn-success px-4 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center disabled order-1 order-sm-2">
                        <FaCheck className="me-2" /> Completed
                    </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
};

export default TaskDetails;
