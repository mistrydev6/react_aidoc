import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pb from "../pocketbase";

console.log("SummarizePage is rendering");

const SummarizePage: React.FC = () => {
  const { userId, transcriptId } = useParams<{
    userId: string;
    transcriptId: string;
  }>();

  console.log("SummarizePage mounted");
  console.log("Params from URL:", { userId, transcriptId });

  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        if (!transcriptId) {
          throw new Error("Transcript ID is missing.");
        }
        console.log("Fetching transcript with ID:", transcriptId);
        const record = await pb
          .collection("transcriptions")
          .getOne(transcriptId);
        console.log("Fetched transcript record:", record);
        setTranscript(record.transcript);
        setError("");
      } catch (err) {
        console.error("Error fetching transcript:", err);
        setError("Error fetching transcript.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, [transcriptId]);

  const handleSummarize = async () => {
    try {
      console.log("Sending transcript for summarization:", transcript);
      const response = await fetch(
        "https://fsforreal.pythonanywhere.com/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }
      const data = await response.json();
      console.log("Received summary:", data);
      setSummary(data.llm_generation || "No summary returned.");
      setError("");
    } catch (err) {
      console.error("Error summarizing transcript:", err);
      setError("Error generating summary.");
    }
  };

  if (loading)
    return <div className="p-6 text-center">Loading transcript...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Transcript Summary</h1>
      <div className="bg-white rounded-xl shadow-md border p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Transcript</h2>
        <p className="text-gray-700">{transcript}</p>
      </div>
      <button
        onClick={handleSummarize}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Generate Summary
      </button>
      {summary && (
        <div className="bg-gray-100 rounded-xl shadow-md border p-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizePage;
