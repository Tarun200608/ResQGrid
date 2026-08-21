import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function RescueTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const response = await api.get("/rescue-teams");
                setTeams(response.data.teams || []);
            } catch (error) {
                console.error("Failed to load rescue teams:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load rescue teams"
                );
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <h1>Rescue Teams</h1>
                    <p>
                        Monitor rescue teams and their current availability.
                    </p>
                </div>

                {loading && <p>Loading rescue teams...</p>}

                {error && <p className="page-error">{error}</p>}

                {!loading && !error && (
                    <div className="team-grid">
                        {teams.map((team) => (
                            <div className="team-card" key={team._id}>
                                <div className="team-card-header">
                                    <h2>{team.name}</h2>

                                    <span
                                        className={`badge team-${team.status}`}
                                    >
                                        {team.status}
                                    </span>
                                </div>

                                <p>
                                    <strong>Type:</strong>{" "}
                                    {team.teamType}
                                </p>

                                <p>
                                    <strong>Members:</strong>{" "}
                                    {team.membersCount}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {team.phone}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {team.location?.address || "Not available"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default RescueTeams;