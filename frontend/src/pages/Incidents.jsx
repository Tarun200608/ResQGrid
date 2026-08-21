import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeams, setSelectedTeams] = useState({});

  const loadData = async () => {
    try {
      const [incidentsResponse, teamsResponse] = await Promise.all([
        api.get("/incidents"),
        api.get("/rescue-teams"),
      ]);

      setIncidents(incidentsResponse.data.incidents || []);
      setTeams(teamsResponse.data.teams || []);
    } catch (error) {
      console.error("Failed to load data:", error);
      setError(error.response?.data?.message || "Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTeamChange = (incidentId, teamId) => {
    setSelectedTeams((current) => ({
      ...current,
      [incidentId]: teamId,
    }));
  };

  const assignTeam = async (incidentId) => {
    const teamId = selectedTeams[incidentId];

    if (!teamId) {
      alert("Please select a rescue team.");
      return;
    }

    try {
      await api.patch(`/incidents/${incidentId}/assign`, {
        teamId,
      });

      await loadData();
      alert("Rescue team assigned successfully.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign rescue team");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <div className="page-header">
          <h1>Incidents</h1>
          <p>Monitor and manage reported emergencies.</p>
        </div>

        {loading && <p>Loading incidents...</p>}

        {error && <p className="page-error">{error}</p>}

        {!loading && !error && (
          <div className="incident-table-container">
            <table className="incident-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Response</th>
                  <th>Rescue Team</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident._id}>
                    <td>{incident.title}</td>
                    <td>{incident.type}</td>
                    <td>
                        <span className={`badge severity-${incident.severity}`}>
                            {incident.severity}
                        </span>
                    </td>

                    <td>
                        <span className={`badge status-${incident.status}`}>
                            {incident.status}
                        </span>
                    </td>

                    <td>
                        <span className={`badge response-${incident.responseStatus}`}>
                            {incident.responseStatus}
                        </span>
                    </td>

                    <td>{incident.assignedTeam ? "Assigned" : "Unassigned"}</td>

                    <td>
                      {incident.responseStatus === "resolved" ? (
                        <span>Resolved</span>
                      ) : (
                        <div className="assignment-control">
                          <select
                            value={selectedTeams[incident._id] || ""}
                            onChange={(event) =>
                              handleTeamChange(incident._id, event.target.value)
                            }
                          >
                            <option value="">Select team</option>

                            {teams.map((team) => (
                              <option key={team._id} value={team._id}>
                                {team.name}
                              </option>
                            ))}
                          </select>

                          <button onClick={() => assignTeam(incident._id)}>
                            Assign
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Incidents;
