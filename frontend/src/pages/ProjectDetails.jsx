import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaPlus } from "react-icons/fa"
import { calculateDueDate, getBadgeClass, getInitials } from "../utils/formatters"
import CreateTaskModal from "../components/modals/CreateTaskModal"
import { toast } from "react-toastify"
import FilterTabs from "../components/common/FilterTabs"
import SortDropdown from "../components/common/SortDropdown"

const ProjectDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [project, setProjects] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTaskModal, setShowTaskModal] = useState(false)

  const [taskFilter, setTaskFilter] = useState('All')
  const [sortType, setSortType] = useState('Newest First')

  const fetchDetails = async() => {
    try{
      const {data} = await api.get(`/projects/${id}`)
      setProjects(data.data)
      setTasks(data.tasks || [])
    }catch(error){
      console.error('Error: ', error)
      toast.error('Failed to load project details.')
      navigate('/projects')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id])

  const processedTasks = tasks.filter((t) => {
    if(taskFilter === 'All') return true
    return t.status === taskFilter
  })
  .sort((a, b) => {
    if(sortType === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt)
    if(sortType === 'Oldest First') return new Date(a.createdAt) - new Date(b.createdAt)
    return 0
  })


  if(loading) return <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border text-primary"></div>
  </div>

  return(
    <div className="container-fluid px-3 px-md-4 py-4">
        <div className="d-flex align-items-center gap-3 mb-5">
          <button className="btn btn-light rounded-circle shadow-sm flex-shrink-0" onClick={() => navigate('/projects')}>
            <FaArrowLeft />
          </button>
          <div className="text-truncate">
            <h3 className="fw-bold text-dark mb-1 text-truncate">{project?.name}</h3>
            <p className="text-muted small mb-0 text-truncate" style={{maxWidth: '800px'}}>{project?.description || 'No Description Provided.'}</p>
          </div>
        </div>
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3 bg-white p-3 rounded-3 shadow-sm border">
        <div className="overflow-auto pb-2 pb-md-0" style={{whiteSpace: 'nowrap'}}>
        <FilterTabs
          options={["In Progress", "Completed", "ToDo"]}
          selected={taskFilter}
          onSelect={setTaskFilter}
        />
        </div>

        <div className="d-flex align-items-center justify-content-between gap-3">
          <SortDropdown onSort={setSortType} />

          <button
            className="btn btn-primary btn-sm px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
            onClick={() => setShowTaskModal(true)}
          >
            <FaPlus size={11} />
            <span className="fw-semibold d-none d-sm-inline">New Task</span>
            <span className="fw-semibold d-sm-none">New</span>
          </button>
        </div>
      </div>


      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive text-nowrap">
          <table className="table table-hover align-middle mb-0" style={{minWidth: '700px'}}>
            <thead className="bg-light border-bottom">
              <tr>
                <th className="ps-4 py-3 text-secondary text-uppercase small" style={{width: '40%'}}>Tasks</th>
                <th className="text-secondary text-uppercase small">Owner</th>
                <th className="ps-4 text-secondary text-uppercase small">Due Date</th>
                <th className="ps-4 text-secondary text-uppercase small">Status</th>
                <th className="ps-4 text-secondary text-uppercase small">View</th>
              </tr>
            </thead>
            <tbody>
              {processedTasks.map((task) => (
                <tr key={task._id} style={{cursor: 'pointer'}} onClick={() => navigate(`/tasks/${task._id}`)} className="transition-all hover-bg-light">
                  <td className="ps-4 fw-semibold text-dark py-3">{task.name}</td>
                  <td>
                  <div className="avatar-group">
                    {task.owners && task.owners.length > 0 ? (
                      task.owners.slice(0, 3).map((owner, index) => (
                        <div key={owner._id || index} className="avatar-circle shadow-sm" style={{width: 30, height: 30, fontSize:'11px', backgroundColor: ['#f59e0b', '#10b981', '#6366f1'][index % 3], border: '2px solid white', marginLeft: index === 0 ? 0 : '-10px'}} title={owner.name}>
                          {getInitials(owner.name)}
                        </div>
                      ))
                    ) : <span className="extra=small text-muted">Unassigned</span> }
                    {task.owners?.length > 3 && (
                      <div className="avatar-circle bg-light text-secondary shadow-sm" style={{border: '2px solid white', width: '30px', height: '30px', fontSize: '10px', marginLeft: '-10px'}}>+{task.owner.length - 3}</div>
                    )}
                  </div>
                  </td>
                  <td>
                  <div className="d-flex align-items-center text-dark fw-bold gap-2">
                    <FaCalendarAlt size={12} />
                    {calculateDueDate(task.createdAt, task.timeToComplete)}
                  </div>
                  </td>
                  <td><span className={`status-badge ${getBadgeClass(task.status)}`}>{task.status}</span></td>
                  <td className="text-center text-muted"><FaArrowRight size={13} /></td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td className="text-center py-5 text-muted" colSpan="5">No tasks created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showTaskModal && (
        <CreateTaskModal onClose={() => setShowTaskModal(false)} onTaskCreated={fetchDetails} />
      )}
    </div>
  )
}

export default ProjectDetails