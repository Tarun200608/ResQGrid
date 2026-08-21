import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Access Denied</h1>

                <p>
                    You do not have permission to access this page.
                </p>

                <Link to="/" className="login-link">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default Unauthorized;