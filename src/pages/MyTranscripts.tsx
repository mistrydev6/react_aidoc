// MyTranscripts.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pb from "../pocketbase";
import { Bot } from "lucide-react";

interface Transcript {
  id: string;
  transcript: string;
  created: string;
}

const MyTranscripts: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        if (!userId) throw new Error("User ID is missing.");
        const result = await pb.collection("transcriptions").getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: "-created",
        });
        setTranscripts(
          result.items.map((item) => ({
            id: item.id,
            transcript: item.transcript,
            created: item.created,
          }))
        );
        setError("");
      } catch (err) {
        console.error("Error fetching transcripts:", err);
        setError("Error fetching transcripts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, [userId]);

  if (loading)
    return <div className="p-6 text-center">Loading transcripts...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (transcripts.length === 0)
    return <div className="p-6 text-center">You have no transcripts yet.</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">My Transcripts</h1>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Transcription
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transcripts.map((item) => {
                const createdDate = new Date(item.created);
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {createdDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {createdDate.toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.transcript}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() =>
                          navigate(`/${userId}/summarize/${item.id}`)
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <Bot className="w-5 h-5" />
                        <span className="font-semibold">Summarize</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTranscripts;
