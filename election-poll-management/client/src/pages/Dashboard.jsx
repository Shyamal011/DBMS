function Dashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <div className="max-w-5xl mx-auto p-10">

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10">

        <h1 className="text-5xl font-bold text-blue-600">
          Welcome {user?.full_name}
        </h1>

        <p className="mt-6 text-2xl text-gray-700">
          Role:
          <span className="font-bold ml-3">
            {user?.role}
          </span>
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6">

          <div className="bg-blue-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Secure Voting
            </h2>

            <p className="mt-3">
              Vote securely using relational database constraints.
            </p>
          </div>

          <div className="bg-green-100 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Real-time Results
            </h2>

            <p className="mt-3">
              Live election analytics and vote counting.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;