import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Incidents from "./pages/Incidents";
import RescueTeams from "./pages/RescueTeams";
import Alerts from "./pages/Alerts";
import Resources from "./pages/Resources";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/incidents"
                    element={
                        <ProtectedRoute>
                            <Incidents />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teams"
                    element={
                        <ProtectedRoute>
                            <RescueTeams />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute>
                            <Alerts />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resources"
                    element={
                        <ProtectedRoute>
                            <Resources />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;