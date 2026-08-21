import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Incidents from "./pages/Incidents";
import RescueTeams from "./pages/RescueTeams";
import Alerts from "./pages/Alerts";
import Resources from "./pages/Resources";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

const authorityRoles = ["authority", "admin"];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute allowedRoles={authorityRoles}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/incidents"
                    element={
                        <ProtectedRoute allowedRoles={authorityRoles}>
                            <Incidents />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teams"
                    element={
                        <ProtectedRoute allowedRoles={authorityRoles}>
                            <RescueTeams />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute allowedRoles={authorityRoles}>
                            <Alerts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute allowedRoles={authorityRoles}>
                            <Resources />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;