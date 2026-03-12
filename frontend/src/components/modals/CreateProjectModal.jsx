import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const CreateProjectModal = ({ onClose, onProjectCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warning("Project name is required");

    setLoading(true);
    try {
      await api.post("/projects", { name, description });
      toast.success("Project created successfully.");
      onProjectCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">New Project</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="form-label fw-bold text-muted small"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="e.g. Website Redesign"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label
                  className="form-label fw-bold text-muted small"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  Description
                </label>
                <textarea
                  className="form-control bg-light border-0"
                  rows="3"
                  placeholder="Briefly describe the project goals..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-light text-muted fw-semibold"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Creating Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
