import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadResources = async () => {
            try {
                const response = await api.get("/resources");

                setResources(response.data.resources || []);
            } catch (error) {
                console.error("Failed to load resources:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load resources"
                );
            } finally {
                setLoading(false);
            }
        };

        loadResources();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <h1>Resources</h1>
                    <p>
                        Monitor emergency vehicles and available equipment.
                    </p>
                </div>

                {loading && <p>Loading resources...</p>}

                {error && (
                    <p className="page-error">
                        {error}
                    </p>
                )}

                {!loading && !error && resources.length === 0 && (
                    <div className="dashboard-panel">
                        <h2>No resources found</h2>
                        <p>
                            There are currently no emergency resources
                            registered in the system.
                        </p>
                    </div>
                )}

                {!loading && !error && resources.length > 0 && (
                    <div className="resource-grid">
                        {resources.map((resource) => (
                            <div
                                className="resource-card"
                                key={resource._id}
                            >
                                <div className="resource-card-header">
                                    <h2>{resource.name}</h2>

                                    <span
                                        className={`badge resource-${resource.status}`}
                                    >
                                        {resource.status}
                                    </span>
                                </div>

                                <p>
                                    <strong>Type:</strong>{" "}
                                    {resource.type}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>{" "}
                                    {resource.quantity}
                                </p>

                                <p>
                                    <strong>Location:</strong>{" "}
                                    {resource.location?.address ||
                                        "Not available"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Resources;