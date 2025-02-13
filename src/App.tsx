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
//         <Route
//           path="/register"
//           element={<Register onRegisterSuccess={() => {}} />}
//         />
//         {/* Optionally you can remove this duplicate MyTranscripts route if it’s handled below */}
//         <Route path="/my-transcripts" element={<MyTranscripts />} />

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
//                   {/* Adjusted the path here to be relative */}
//                   <Route
//                     path="summarize/:transcriptId"
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
        {/* You can optionally have a duplicate MyTranscripts route if needed */}
        <Route path="/my-transcripts" element={<MyTranscripts />} />

        {/* Authenticated Section */}
        <Route
          path="/:userId/*"
          element={
            <div className="relative min-h-screen">
              <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
              />
              {/* 
                  IMPORTANT UPDATE:
                  On mobile by default we use "ml-0" (no margin) so content spans full width.
                  On screens sm and above we add margin-left: either "ml-20" if sidebar is collapsed or "ml-64" if expanded.
              */}
              <div
                className={`${
                  sidebarCollapsed ? "ml-0 sm:ml-20" : "ml-0 sm:ml-64"
                } transition-all duration-300 p-4`}
              >
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="my-transcripts" element={<MyTranscripts />} />
                  <Route
                    path="summarize/:transcriptId"
                    element={<SummarizePage />}
                  />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route
                    path="logout"
                    element={<Logout handleLogout={logout} />}
                  />
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
