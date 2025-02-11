// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import Register from "./pages/Register";
// import Sidebar from "./Components/Sidebar";
// import Logout from "./pages/Logout";
// import useAuth from "./hooks/useAuth";
// import LandingPage from "./pages/LandingPage";
// import ProfilePage from "./pages/Profile";
// import SettingsPage from "./pages/Settings";
// import MyTranscripts from "./pages/MyTranscripts";
// import SummarizePage from "./pages/SummarizePage";

// const App: React.FC = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const { logout } = useAuth();

//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page shown on the root */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         {/* New Register route */}
//         <Route
//           path="/register"
//           element={<Register onRegisterSuccess={() => {}} />}
//         />
//         <Route path="my-transcripts" element={<MyTranscripts />} />

//         <Route
//           path="/:userId/*"
//           element={
//             <div className="relative min-h-screen">
//               <Sidebar
//                 collapsed={sidebarCollapsed}
//                 setCollapsed={setSidebarCollapsed}
//               />
//               <div
//                 className={`${
//                   sidebarCollapsed ? "ml-20" : "ml-64"
//                 } transition-all duration-300 p-4`}
//               >
//                 <Routes>
//                   <Route index element={<HomePage />} />
//                   <Route path="profile" element={<ProfilePage />} />
//                   <Route path="my-transcripts" element={<MyTranscripts />} />
//                   <Route
//                     path="/:userId/summarize/:transcriptId"
//                     element={<SummarizePage />}
//                   />
//                   <Route path="settings" element={<SettingsPage />} />
//                   <Route
//                     path="logout"
//                     element={<Logout handleLogout={logout} />}
//                   />
//                   {/* Other nested routes (profile, settings, etc.) */}
//                 </Routes>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Sidebar from "./Components/Sidebar";
import Logout from "./pages/Logout";
import useAuth from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import MyTranscripts from "./pages/MyTranscripts";
import SummarizePage from "./pages/SummarizePage";

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Landing Page shown on the root */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register onRegisterSuccess={() => {}} />}
        />
        {/* Optionally you can remove this duplicate MyTranscripts route if it’s handled below */}
        <Route path="/my-transcripts" element={<MyTranscripts />} />

        <Route
          path="/:userId/*"
          element={
            <div className="relative min-h-screen">
              <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
              />
              <div
                className={`${
                  sidebarCollapsed ? "ml-20" : "ml-64"
                } transition-all duration-300 p-4`}
              >
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="my-transcripts" element={<MyTranscripts />} />
                  {/* Adjusted the path here to be relative */}
                  <Route
                    path="summarize/:transcriptId"
                    element={<SummarizePage />}
                  />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route
                    path="logout"
                    element={<Logout handleLogout={logout} />}
                  />
                  {/* Other nested routes (profile, settings, etc.) */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
