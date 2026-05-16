import { useEffect, useState } from "react";
import axios from "axios";

function Results() {

  const [elections, setElections] = useState([]);

  const [results, setResults] = useState([]);

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

  // FETCH RESULTS
  const fetchResults = async (electionId) => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/votes/results/${electionId}`
      );

      setResults(response.data);

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
        Election Results
      </h1>

      {/* SELECT ELECTION */}
      <div className="mb-10">

        <select
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-[300px]"
          onChange={(e) =>
            fetchResults(e.target.value)
          }
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

      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-2 gap-6">

        {results.length === 0 ? (

          <div className="text-gray-500 text-xl">
            No Results Available
          </div>

        ) : (
          results.map((candidate, index) => (

            <div
              key={candidate.candidate_id}
              className={`bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/30 hover:scale-[1.02] transition
              ${index === 0
                ? "border-4 border-green-500"
                : ""
              }`}
            >

              {index === 0 && (
                <div className="mb-3 text-green-600 font-bold text-lg">
                  🏆 Leading Candidate
                </div>
              )}

              <h2 className="text-2xl font-bold text-blue-600">
                {candidate.candidate_name}
              </h2>

              <p className="mt-3 text-gray-600">
                Party: {candidate.party_name}
              </p>

              <div className="mt-5">

                <div className="text-lg font-semibold">
                  Total Votes:
                </div>

                <div className="text-4xl font-bold text-green-600 mt-2">
                  {candidate.total_votes}
                </div>

              </div>

            </div>

          ))
        )}
      </div>
    </div>
  );
}

        

export default Results;