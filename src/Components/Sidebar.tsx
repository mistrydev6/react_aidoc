// Sidebar.tsx
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Home,
  Settings,
  Menu,
  User,
  LogOut,
  GalleryVerticalEnd,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { userId } = useParams<{ userId: string }>(); // Get userId from the URL

  return (
    <div
      className={`sidebar-transition h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col shadow-xl ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-800">
        <button
          className="w-full p-2 hover:bg-gray-800 rounded-lg transition flex justify-center items-center group"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu
            size={24}
            className="text-gray-400 group-hover:text-white transition-colors"
          />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            to={`/${userId}`}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<GalleryVerticalEnd size={20} />}
            text="My Transcripts"
            to={`/${userId}/my-transcripts`}
            collapsed={collapsed}
          />

          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            to={`/${userId}/settings`}
            collapsed={collapsed}
          />
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <ul className="list-none p-0 m-0">
          <SidebarItem
            icon={<User size={20} />}
            text="Profile"
            to={`/${userId}/profile`}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
            to={`/${userId}/logout`}
            collapsed={collapsed}
          />
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  to: string;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  to,
  collapsed,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${
          isActive ? "bg-gray-800" : "hover:bg-gray-800"
        }`}
      >
        <div
          className={`w-8 flex justify-center ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-full opacity-100"
          } ${isActive ? "text-white" : "text-gray-400"}`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
