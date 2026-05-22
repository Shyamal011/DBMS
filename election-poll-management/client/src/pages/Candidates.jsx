import { useEffect, useState } from "react";
import axios from "axios";

function Candidates() {

  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [candidates, setCandidates] = useState([]);

  const [formData, setFormData] = useState({
    election_id: "",
    candidate_name: "",
    party_name: "",
    manifesto: ""
  });

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

  // FETCH CANDIDATES
  const fetchCandidates = async (electionId) => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/candidates/${electionId}`
      );

      setCandidates(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ADD CANDIDATE
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/candidates",
        formData
      );

      alert(response.data.message);

      fetchCandidates(formData.election_id);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Candidate Creation Failed"
      );
    }
  };

  // DELETE CANDIDATE
  const deleteCandidate = async (id) => {

    try {

      const response = await axios.delete(
        `http://localhost:5000/api/candidates/${id}`
      );

      alert(response.data.message);

      fetchCandidates(selectedElection);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Candidate Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <select
            name="election_id"
            value={formData.election_id}
            className="border p-3 rounded-xl"
            onChange={handleChange}
          >

            <option value="">
              Select Election
            </option>

            {elections.map((election) => (

              <option
                key={election.election_id}
                value={election.election_id}
              >
                {election.title}
              </option>

            ))}

          </select>

          <input
            type="text"
            name="candidate_name"
            placeholder="Candidate Name"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="text"
            name="party_name"
            placeholder="Party Name"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="text"
            name="manifesto"
            placeholder="Manifesto"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

        </div>

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Add Candidate
        </button>

      </form>

      {/* SELECT ELECTION */}
      <div className="mb-8">

        <select
          className="border p-3 rounded-xl"
          onChange={(e) => {

            setSelectedElection(e.target.value);

            fetchCandidates(e.target.value);

          }}
        >

          <option value="">
            View Candidates By Election
          </option>

          {elections.map((election) => (

            <option
              key={election.election_id}
              value={election.election_id}
            >
              {election.title}
            </option>

          ))}

        </select>

      </div>

      {/* NO RESULTS */}
      {candidates.length === 0 ? (

        <div className="text-gray-500 text-xl">
          No Candidates Found
        </div>

      ) : (

        <div className="grid grid-cols-2 gap-6">

          {candidates.map((candidate) => (

            <div
              key={candidate.candidate_id}
              className="bg-white shadow-xl rounded-2xl p-6"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {candidate.candidate_name}
              </h2>

              <p className="mt-3 text-gray-600">
                Party: {candidate.party_name}
              </p>

              <p className="mt-2">
                {candidate.manifesto}
              </p>

              <button
                onClick={() =>
                  deleteCandidate(candidate.candidate_id)
                }
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Candidates;