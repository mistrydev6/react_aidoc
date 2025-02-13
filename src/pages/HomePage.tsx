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

  const handleSave = async () => {
    if (!transcript) return;
    try {
      const record = await pb.collection("transcriptions").create({
        transcript: transcript,
        user: userId,
      });
      console.log("Transcription saved successfully:", record);
    } catch (error) {
      console.error("Failed to save transcription:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-blue-600 text-xl">Loading...</div>
      </div>
    );
  }
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <p className="text-red-600 text-lg">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 py-8">
      <header className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-4">
          {/* <img
            src="/medical-logo.png"
            alt="Medical Logo"
            className="h-12 w-auto"
          /> */}
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
            Aidoc
          </h1>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-gray-700">
            Welcome, Dr. {user?.email}
            <span className="text-sm text-gray-500 block mt-1">
              Session ID: {userId}
            </span>
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Recording Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                Voice Recording
              </h2>
              <p className="text-gray-600">
                {isRecording
                  ? "Recording in progress..."
                  : "Ready to record patient notes"}
              </p>
            </div>
            <button
              onClick={handleRecord}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white shadow-md`}
            >
              <Mic className="w-5 h-5" />
              <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
            </button>
          </div>
        </div>

        {/* Transcription Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all hover:shadow-xl">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Medical Transcription
          </h2>
          {isTranscribing ? (
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          ) : (
            <div className="relative min-h-[200px]">
              <div className="rounded-lg bg-gray-50 p-6 border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {transcript || "Begin recording to transcribe patient notes"}
                </p>
              </div>
              {transcript && (
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-md"
                    onClick={handleSave}
                  >
                    Save to Patient Record
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
