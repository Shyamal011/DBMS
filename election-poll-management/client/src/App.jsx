import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Elections from "./pages/Elections";
import Candidates from "./pages/Candidates";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/elections"
          element={
            <ProtectedRoute>
              <Elections />
            </ProtectedRoute>}
        />

        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>}
        />

        <Route
          path="/vote"
          element={
            <ProtectedRoute>
              <Vote />
            </ProtectedRoute>}
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>}
        />

      </Routes>

    </div>
  );
}

export default App;