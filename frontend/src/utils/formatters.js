export const getInitials = (name) => {
    if(!name) return "U"
    const parts = name.trim().split(' ')
    if(parts.length === 1){
        return parts[0].charAt(0).toUpperCase()
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}


export const calculateDueDate = (createdAt, daysToComplete) => {
    if(!createdAt || !daysToComplete) return "N/A"

    const date = new Date(createdAt)
    date.setDate(date.getDate() + daysToComplete)

    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

export const getBadgeClass = (status) => {
    const normalized = status ? status.toLowerCase().replace(' ', '') : 'active'

    switch(normalized){
        case 'todo': return 'badge-todo';
        case 'inprogress': return 'badge-inprogress';
        case 'completed': return 'badge-completed';
        case 'blocked': return 'badge-blocked';
        default: return 'badge-active'
    }
}

export const calculateTimeRemaining = (createdAt, daysToComplete, status) => {
    if(status === 'Completed') return 'Completed'

    const due = new Date(createdAt)
    due.setDate(due.getDate() + daysToComplete)

    const today = new Date()

    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if(diffDays < 0) return `${Math.abs(diffDays)} Days Overdue`
    if(diffDays === 0) return 'Due Today'
    return `${diffDays} Days Remaining`
}