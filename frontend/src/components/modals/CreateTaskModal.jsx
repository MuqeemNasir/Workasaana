import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { FaHashtag, FaTimes } from "react-icons/fa";

const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    project: "",
    name: "",
    team: "",
    status: "To Do",
    timeToComplete: 1,
    dueDate: "",
  });

  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [options, setOptions] = useState({
    projects: [],
    teams: [],
    users: [],
    tags: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, teamRes, userRes, tagRes] = await Promise.all([
          api.get("/projects"),
          api.get("/teams"),
          api.get("/users"),
          api.get("/tags"),
        ]);

        setOptions({
          projects: projRes.data.data || [],
          teams: teamRes.data || [],
          users: userRes.data || [],
          tags: tagRes.data || [],
        });
      } catch (error) {
        console.error("Failed to load dropdown options", error);
        toast.error("Could not load from data.");
      }
    };
    fetchData();
  }, []);

  const addOwner = (e) => {
    const userId = e.target.value;
    if (userId && !selectedOwners.includes(userId)) {
      setSelectedOwners([...selectedOwners, userId]);
    }
  };

  const removeOwner = (userId) => {
    setSelectedOwners(selectedOwners.filter((id) => id !== userId));
  };

  const addTag = (e) => {
    const tagName = e.target.value;
    if (tagName && !selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const removeTag = (tagName) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.project || !formData.team) {
      return toast.warning("Please fill in all required fields.");
    }

    if(selectedOwners.length === 0){
      return toast.warning("Please assign at least one owner.")
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        owners: selectedOwners,
        tags: selectedTags,
      };

      await api.post("/tasks", payload);
      toast.success("Task created successfully!");
      onTaskCreated();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create task";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (id) => {
    const user = options.users.find((u) => u._id === id);
    return user ? user.name : "Unknown";
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">New Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">
                  Task Name
                </label>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="e.g. Design Homepage"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  autoFocus
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted small">
                    Project
                  </label>
                  <select
                    className="form-select bg-light border-0"
                    value={formData.project}
                    onChange={(e) =>
                      setFormData({ ...formData, project: e.target.value })
                    }
                  >
                    <option value="">Select Project</option>
                    {options.projects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted small">
                    Team
                  </label>
                  <select
                    className="form-select bg-light border-0"
                    value={formData.team}
                    onChange={(e) =>
                      setFormData({ ...formData, team: e.target.value })
                    }
                  >
                    <option value="">Select Team</option>
                    {options.teams.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">
                  Assign To
                </label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {selectedOwners.map((id) => (
                    <span
                      key={id}
                      className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                    >
                      {getUserName(id)}
                      <FaTimes
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeOwner(id)}
                      />
                    </span>
                  ))}
                </div>

                <select
                  id=""
                  className="form-select bg-light border-0"
                  onChange={addOwner}
                  value=""
                >
                  <option value="" disabled>
                    + Add Person
                  </option>
                  {options.users.map((u) => (
                    <option
                      key={u._id}
                      value={u._id}
                      disabled={selectedOwners.includes(u._id)}
                    >
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-muted small">
                  Tags
                </label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-warning bg-opacity-10 text-dark d-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-warning border-opacity-25"
                    >
                      <FaHashtag />
                      {tag}
                      <FaTimes
                        className="cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  ))}
                </div>

                <select
                  className="form-select bg-light border-0"
                  onChange={addTag}
                  value=""
                >
                  <option value="" disabled>
                    + Add Tag
                  </option>
                  {options.tags.map((t) => (
                    <option
                      key={t._id}
                      value={t._id}
                      disabled={selectedTags.includes(t.name)}
                    >
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-muted small">
                    Status
                  </label>
                  <select
                    className="form-select bg-light border-0"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold text-muted small">
                    Estimated Time
                  </label>
                  <input
                    type="number"
                    className="form-control bg-light border-0"
                    min="0"
                    value={formData.timeToComplete}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        timeToComplete: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold text-muted small">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control bg-light border-0"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
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
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal