import { useEffect, useState } from "react";
import axios from "axios";

function Elections() {

  const [elections, setElections] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "upcoming"
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // FETCH ELECTIONS
  const fetchElections = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/elections"
      );

      setElections(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // CREATE ELECTION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/elections",
        formData
      );

      alert(response.data.message);

      fetchElections();

    } catch (error) {
      console.log(error);
      alert("Election Creation Failed");
    }
  };

  // DELETE ELECTION
  const deleteElection = async (id) => {

    try {

      const response = await axios.delete(
        `http://localhost:5000/api/elections/${id}`
      );

      alert(response.data.message);

      fetchElections();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    elections.length === 0 ? (

      <div className="text-gray-500 text-xl">
        No Results Available
      </div>

    ) : (

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Election Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-6 rounded-xl mb-10"
        >

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="title"
              placeholder="Election Title"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="start_date"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="end_date"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            />

            <select
              name="status"
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

          </div>

          <button
            className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Create Election
          </button>

        </form>

        {/* ELECTION LIST */}
        <div className="grid grid-cols-2 gap-6">

          {elections.map((election) => (

            <div
              key={election.election_id}
              className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/30 hover:scale-[1.02] transition"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {election.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {election.description}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-semibold ml-2">
                  {election.status}
                </span>
              </p>

              <button
                onClick={() =>
                  deleteElection(election.election_id)
                }
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>
    )
  )

}

export default Elections;