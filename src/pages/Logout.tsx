// Logout.tsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface LogoutProps {
  handleLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    handleLogout(); // Call the logout function

    if (userId) {
      navigate("/login");
    } else {
      navigate("/login");
    }
  }, [handleLogout, navigate, userId]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
