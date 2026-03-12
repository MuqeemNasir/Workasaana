import { calculateDueDate, getBadgeClass, getInitials } from "../../utils/formatters"
import { FaCalendarAlt } from 'react-icons/fa'

const TaskCard = ({task}) => {
    return (
        <div className="custom-card h-100 d-flex flex-column border-0 shadow-sm">
            <div className="mb-3">
                <span className={`status-badge ${getBadgeClass(task.status)}`}>{task.status}</span>
            </div>

            <h6 className="fw-bold mb-1 text-dark text-truncate" title={task.name}>{task.name}</h6>
            <p className="text-muted extra-small mb-3" style={{fontSize: '0.85rem'}}>{task.project?.name || "No Project"}</p>

            <div className="mt-auto pt-3 border-top border-light d-flex flex-column gap-2">
                <div className="d-flex align-items-center text-muted">
                    <FaCalendarAlt className="me-2" style={{fontSize: '0.8rem'}} />
                    <small className="fw-semibold" style={{fontSize: '0.8rem'}}>
                        {calculateDueDate(task.createdAt, task.timeToComplete)}
                    </small>
                </div>

                <div className="avatar-group pt-1">
                    {task.owners && task.owners.length > 0 ? (
                        task.owners.map((owner, index) => (
                            <div key={owner._id || index} className="avatar-circle shadow-sm bg-warning text-dark" style={{ border: '2px solid white', width: '28px', height: '28px', fontSize: '10px', marginLeft: index === 0 ? 0 : '-8px', cursor: 'default'}} title={owner.name}>
                                {getInitials(owner.name)}
                            </div>
                        ))
                    ) : (
                        <span className="text-muted extra-small">Unassigned</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskCard