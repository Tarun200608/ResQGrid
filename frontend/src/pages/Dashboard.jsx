import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

function Dashboard() {
    const [stats, setStats] = useState({
        incidents: 0,
        activeIncidents: 0,
        rescueTeams: 0,
        alerts: 0,
        resources: 0
    });
    const [recentIncidents, setRecentIncidents] = useState([]);
    const [recentAlerts, setRecentAlerts] = useState([]);
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    incidentsResponse,
                    teamsResponse,
                    alertsResponse,
                    resourcesResponse
                ] = await Promise.all([
                    api.get("/incidents"),
                    api.get("/rescue-teams"),
                    api.get("/alerts"),
                    api.get("/resources")
                ]);

                const incidents =
                    incidentsResponse.data.incidents || [];
                setRecentIncidents(incidents.slice(0, 5));

                const teams =
                    teamsResponse.data.teams || [];

                const alerts =
                    alertsResponse.data.alerts || [];
                setRecentAlerts(alerts.slice(0, 3));
                const resources =
                    resourcesResponse.data.resources || [];

                setStats({
                    incidents: incidents.length,
                    activeIncidents: incidents.filter(
                        (incident) =>
                            incident.status !== "resolved"
                    ).length,
                    rescueTeams: teams.length,
                    alerts: alerts.length,
                    resources: resources.length
                });
            } catch (error) {
                console.error(
                    "Failed to load dashboard:",
                    error
                );
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div>
                        <h1>Authority Dashboard</h1>
                        <p>
                            ResQGrid Disaster Response Control Center
                        </p>
                    </div>
                </header>

                <section className="stats-grid">
                    <StatCard
                        title="Total Incidents"
                        value={stats.incidents}
                        description="Reported incidents"
                    />

                    <StatCard
                        title="Active Incidents"
                        value={stats.activeIncidents}
                        description="Require attention"
                    />

                    <StatCard
                        title="Rescue Teams"
                        value={stats.rescueTeams}
                        description="Registered teams"
                    />

                    <StatCard
                        title="Alerts"
                        value={stats.alerts}
                        description="Emergency alerts"
                    />

                    <StatCard
                        title="Resources"
                        value={stats.resources}
                        description="Registered resources"
                    />
                </section>
                <section className="dashboard-panel recent-incidents">
                    <div className="panel-header">
                        <div>
                            <h2>Recent Incidents</h2>
                            <p>Latest reported emergencies</p>
                        </div>

                        <a href="/incidents">View all</a>
                    </div>

                    <div className="recent-incident-list">
                        {recentIncidents.map((incident) => (
                            <div
                                className="recent-incident-item"
                                key={incident._id}
                            >
                                <div>
                                    <h3>{incident.title}</h3>
                                    <p>
                                        {incident.type} •{" "}
                                        {incident.location?.address ||
                                            "Location unavailable"}
                                    </p>
                                </div>

                                <div className="recent-incident-status">
                                    <span
                                        className={`badge severity-${incident.severity}`}
                                    >
                                        {incident.severity}
                                    </span>

                                    <span
                                        className={`badge status-${incident.status}`}
                                    >
                                        {incident.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="dashboard-panel recent-alerts">
                    <div className="panel-header">
                        <div>
                            <h2>Recent Alerts</h2>
                            <p>Latest emergency notifications</p>
                        </div>

                        <a href="/alerts">View all</a>
                    </div>

                    <div className="recent-alert-list">
                        {recentAlerts.map((alert) => (
                            <div className="recent-alert-item" key={alert._id}>
                                <div>
                                    <h3>{alert.title}</h3>
                                    <p>{alert.message}</p>
                                </div>

                                <span
                                    className={`badge severity-${alert.severity}`}
                                >
                                    {alert.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="dashboard-panel quick-actions-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Emergency Operations</h2>
                            <p>Quick access to critical response operations.</p>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <a href="/incidents" className="quick-action">
                            <div className="quick-action-icon">🚨</div>
                            <div>
                                <h3>Manage Incidents</h3>
                                <p>View and assign reported emergencies.</p>
                            </div>
                        </a>

                        <a href="/teams" className="quick-action">
                            <div className="quick-action-icon">🚑</div>
                            <div>
                                <h3>Rescue Teams</h3>
                                <p>Monitor teams and availability.</p>
                            </div>
                        </a>

                        <a href="/alerts" className="quick-action">
                            <div className="quick-action-icon">🔔</div>
                            <div>
                                <h3>View Alerts</h3>
                                <p>Monitor emergency notifications.</p>
                            </div>
                        </a>

                        <a href="/resources" className="quick-action">
                            <div className="quick-action-icon">🧰</div>
                            <div>
                                <h3>Manage Resources</h3>
                                <p>Track emergency vehicles and equipment.</p>
                            </div>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;