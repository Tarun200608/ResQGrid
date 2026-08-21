import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("resqgrid_token");
        localStorage.removeItem("resqgrid_user");
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="logo">
                🚨 ResQGrid
            </div>

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/incidents">Incidents</Link>
                <Link to="/teams">Rescue Teams</Link>
                <Link to="/alerts">Alerts</Link>
                <Link to="/resources">Resources</Link>
            </nav>

            <div className="sidebar-footer">
                <span>Authority Portal</span>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;