import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pb from "../pocketbase";

const SummarizePage: React.FC = () => {
  const { userId, transcriptId } = useParams<{
    userId: string;
    transcriptId: string;
  }>();

  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        if (!transcriptId) {
          throw new Error("Transcript ID is missing.");
        }
        const record = await pb
          .collection("transcriptions")
          .getOne(transcriptId);
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
    setSummarizing(true);
    try {
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
      setSummary(data.llm_generation || "No summary returned.");
      setError("");
    } catch (err) {
      console.error("Error summarizing transcript:", err);
      setError("Error generating summary.");
    } finally {
      setSummarizing(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
          Medical Transcript Summary
        </h1>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Medical Transcript
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{transcript}</p>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSummarize}
            disabled={summarizing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {summarizing ? (
              <>
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Generating...
              </>
            ) : (
              "Generate Medical Summary"
            )}
          </button>
        </div>
        {summary && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Medical Summary
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizePage;
