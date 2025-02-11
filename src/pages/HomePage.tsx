// HomePage.tsx
import React, { useState, useRef, useEffect } from "react";
import { Mic } from "lucide-react";
import { Loading } from "./Loading";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import pb from "../pocketbase";

interface TranscriptionResponse {
  transcript?: string;
  error?: string;
}

const HomePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isLoggedIn, user, isLoading } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [, setRecordingBlob] = useState<Blob | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    console.log("User ID from URL:", userId);
  }, [userId]);

  const handleRecord = async () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    setIsRecording(!isRecording);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        setRecordingBlob(audioBlob);
        audioChunks.current = [];
        await sendAudioToServer(audioBlob);
      };

      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  const sendAudioToServer = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    try {
      const response = await fetch(
        "https://fsforreal.pythonanywhere.com/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${pb.authStore.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: TranscriptionResponse = await response.json();
      if (data.transcript) {
        setTranscript(data.transcript);
      } else if (data.error) {
        setTranscript(
          `Error processing audio. Please try again. ${data.error}`
        );
      }
    } catch (error) {
      console.error("Failed to send audio:", error);
      setTranscript("Error processing audio. Please try again.");
    } finally {
      setIsTranscribing(false);
    }
  };

  // New function to save the transcript to PocketBase under this user’s unique ID
  const handleSave = async () => {
    if (!transcript) return;
    try {
      // If your relation field is named "user", assign it here.
      // If it expects an array (in case of single-item relation it still can be an array),
      // you might need to pass user: [userId]
      const record = await pb.collection("transcriptions").create({
        transcript: transcript,
        user: userId, // Ensure your collection's field name matches; if it's "user", not "userId"
        // Alternatively, if your field expects an array: user: [userId]
      });
      console.log("Transcription saved successfully:", record);
    } catch (error) {
      console.error("Failed to save transcription:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">AIDOC</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your audio recordings and sessions. Welcome, {user?.email}!
          <br />
          Your User ID (from URL): {userId}
        </p>
      </header>

      {/* Recording Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              New Recording
            </h2>
            <p className="text-gray-500">
              {isRecording ? "Recording in progress..." : "Ready to record"}
            </p>
          </div>
          <button
            onClick={handleRecord}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            <Mic className="w-5 h-5" />
            <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
          </button>
        </div>
      </div>

      {/* Transcription Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 w-full relative">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Transcription
        </h2>
        {isTranscribing ? (
          <Loading />
        ) : (
          <div className="relative min-h-[200px]">
            <p className="text-gray-600 whitespace-pre-wrap p-4 rounded-lg bg-gray-50">
              {transcript || "Start recording to see live transcription"}
            </p>
            {transcript && (
              <div className="absolute bottom-4 right-4">
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
