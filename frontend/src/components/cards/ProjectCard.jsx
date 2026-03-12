import { getBadgeClass, getInitials } from "../../utils/formatters";

const ProjectCard = ({ project }) => {
  return (
    <div className="custom-card h-100 d-flex flex-column border-0 shadow-sm">
      <div className="mb-3">
        <span className={`status-badge ${getBadgeClass(project.status)}`}>
          {project.status || "Active"}
        </span>
      </div>

      <h5 className="fw-bold mb-2 text-dark">{project.name}</h5>
      <p
        className="text-muted small mb-4 flex-grow-1"
        style={{ minHeight: "40px", lineHeight: "1.5" }}
      >
        {project.description || "No description provided."}
      </p>

      <div className="mt-auto d-flex align-items-center">
        <div className="avatar-group">
          {project.teamMembers && project.teamMembers.length > 0 ? (
            project.teamMembers.slice(0, 4).map((member, index) => (
              <div
                key={member._id || index}
                className="avatar-circle shadow-sm"
                style={{
                  backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"][
                    index % 4
                  ],
                  border: "2px solid white",
                  width: "32px",
                  height: "32px",
                  fontSize: "11px",
                  marginLeft: index === 0 ? 0 : "-10px",
                  cursor: "default",
                }}
                title={member.name}
              >
                {getInitials(member.name)}
              </div>
            ))
          ) : (
            <span
              className="text-muted extra-small"
              style={{ fontSize: "0.8rem" }}
            >
              No members
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
