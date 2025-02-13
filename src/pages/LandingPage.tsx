// // pages/LandingPage.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LandingPage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 p-4">
//       <div className="space-y-8 flex flex-col items-center bg-white p-8 md:p-16 rounded-3xl shadow-2xl transform transition duration-500 hover:scale-102 w-full max-w-lg border border-gray-100">
//         <div className="mb-6">
//           <svg
//             className="w-16 h-16 md:w-20 md:h-20 text-blue-600 mx-auto"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             ></path>
//           </svg>
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center leading-tight">
//           Welcome to <span className="text-blue-600">HealthCare Plus</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-600 mb-10 text-center leading-relaxed max-w-md">
//           Experience exceptional medical care with our team of dedicated
//           healthcare professionals.
//         </p>
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full">
//           <button
//             onClick={() => navigate("/login")}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full text-lg"
//           >
//             Sign In
//           </button>
//           <button
//             onClick={() => navigate("/register")}
//             className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full text-lg border-2 border-blue-600"
//           >
//             Register
//           </button>
//         </div>
//         <p className="text-sm text-gray-500 mt-8 text-center">
//           Your health is our priority
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-4 md:p-6">
      {/* Header Section */}
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">AiDoc</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Providing exceptional healthcare services with compassion and
          expertise.
        </p>
      </header>

      {/* Call-to-Actions */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md px-4">
        <button
          onClick={() => navigate("/login")}
          className="w-full px-6 py-3 md:py-4 bg-blue-600 text-white text-base md:text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-full px-6 py-3 md:py-4 bg-white text-blue-600 border-2 border-blue-600 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
        >
          Create Account
        </button>
      </div>

      {/* Features Section */}
      <section className="mt-12 md:mt-16 max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Transcriptions
            </h3>
            <p className="text-gray-600 text-center">
              Convert your audio files into accurate text
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Summaries
            </h3>
            <p className="text-gray-600 text-center">
              Generate concise summaries for quick insights
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105">
            <div className="flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Speaker Diarization
            </h3>
            <p className="text-gray-600 text-center">
              Identify speakers in conversations with advanced AI
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-gray-500 w-full border-t border-gray-200">
        <p className="text-sm">
          © {new Date().getFullYear()} MediCare | Caring for Your Health
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
