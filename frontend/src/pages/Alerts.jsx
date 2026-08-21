import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const response = await api.get("/alerts");
                setAlerts(response.data.alerts || []);
            } catch (error) {
                console.error("Failed to load alerts:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load alerts"
                );
            } finally {
                setLoading(false);
            }
        };

        loadAlerts();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <h1>Alerts</h1>
                    <p>Monitor emergency notifications and system alerts.</p>
                </div>

                {loading && <p>Loading alerts...</p>}

                {error && <p className="page-error">{error}</p>}

                {!loading && !error && alerts.length === 0 && (
                    <div className="dashboard-panel">
                        <h2>No alerts</h2>
                        <p>
                            There are currently no emergency alerts in the
                            system.
                        </p>
                    </div>
                )}

                {!loading && !error && alerts.length > 0 && (
                    <div className="alert-list">
                        {alerts.map((alert) => (
                            <div className="alert-card" key={alert._id}>
                                <div className="alert-card-header">
                                    <h2>{alert.title}</h2>

                                    <span
                                        className={`badge severity-${alert.severity}`}
                                    >
                                        {alert.severity}
                                    </span>
                                </div>

                                <p>{alert.message}</p>

                                <div className="alert-meta">
                                    <span>
                                        Type: {alert.type}
                                    </span>

                                    <span>
                                        Target: {alert.targetRole}
                                    </span>

                                    <span>
                                        {alert.isRead ? "Read" : "Unread"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Alerts;