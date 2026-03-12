import { useEffect, useState } from 'react';
import api from '../services/api';
import CreateTeamModal from '../components/modals/CreateTeamModal';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/teams');
      setTeams(data || []);
    } catch (error) {
      console.error("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container-fluid px-4 py-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0">Teams</h2>
        <button 
          className="btn btn-primary btn-sm px-3 rounded-pill shadow-sm"
          onClick={() => setShowModal(true)}
        >
          + New Team
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5 text-muted">Loading...</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div className="col-md-4 mb-4" key={team._id}>
              <div className="custom-card h-100 text-center p-4">
                
                <div className="mx-auto bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{width: 60, height: 60, fontSize: '1.5rem'}}>
                  <i className="bi bi-people-fill"></i> {/* Requires Bootstrap Icons */}
                </div>

                <h5 className="fw-bold mb-2">{team.name}</h5>
                <p className="text-muted small mb-0">{team.description || "No description."}</p>
                
              </div>
            </div>
          ))}
          {teams.length === 0 && <div className="col-12 text-center text-muted">No teams found.</div>}
        </div>
      )}

      {showModal && (
        <CreateTeamModal 
          onClose={() => setShowModal(false)} 
          onTeamCreated={fetchTeams} 
        />
      )}
    </div>
  );
};

export default Team;