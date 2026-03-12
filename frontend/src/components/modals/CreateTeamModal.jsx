import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const CreateTeamModal = ({ onClose, onTeamCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.warning("Team name is required");

    setLoading(true);
    try {
      await api.post('/teams', { name, description });
      toast.success("Team created successfully!");
      onTeamCreated(); 
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">New Team</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted small">TEAM NAME</label>
                <input 
                  type="text" className="form-control bg-light border-0 py-2" 
                  placeholder="e.g. Marketing"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold text-muted small">DESCRIPTION</label>
                <textarea 
                  className="form-control bg-light border-0" rows="3"
                  placeholder="What does this team do?"
                  value={description} onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light text-muted" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary px-4" disabled={loading}>Create Team</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;