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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-blue-600 text-xl">
          Loading transcripts...
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl bg-red-50 p-4 rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  if (transcripts.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 text-xl">
          You have no transcripts yet.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800 text-center md:text-left">
          Medical Transcripts
        </h1>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Transcription
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transcripts.map((item) => {
                  const createdDate = new Date(item.created);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {createdDate.toLocaleDateString()}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {createdDate.toLocaleTimeString()}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-sm text-gray-900">
                        <div className="line-clamp-3">{item.transcript}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            navigate(`/${userId}/summarize/${item.id}`)
                          }
                          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Bot className="w-4 h-4" />
                          <span className="font-medium text-sm">Summarize</span>
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
    </div>
  );
};

export default MyTranscripts;
