import Sidebar from "./Sidebar"

const Layout = ({children}) => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 d-none d-md-block p-0">
                    <Sidebar />
                </div>

                <div className="col-md-10 col-12 bg-light p-4" style={{minHeight: '100vh'}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout

