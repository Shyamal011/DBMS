import { Link, useNavigate }
from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Election Poll Management
      </h1>

      <div className="space-x-6 flex items-center">

        <Link to="/">
          Home
        </Link>

        {!user && (
          <>
            <Link to="/register">
              Register
            </Link>

            <Link to="/login">
              Login
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/elections">
              Elections
            </Link>

            <Link to="/candidates">
              Candidates
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/vote">
              Vote
            </Link>

            <Link to="/results">
              Results
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;