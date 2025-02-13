// Sidebar.tsx
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Home,
  Settings,
  Menu,
  User,
  LogOut,
  GalleryVerticalEnd,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { userId } = useParams<{ userId: string }>();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-blue-900 rounded-lg text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          {!collapsed ? <ArrowLeft size={24} /> : <Menu size={24} />}
        </button>
      )}
      <div
        className={`transition-all duration-300 bg-blue-900 text-white fixed top-0 left-0 h-screen flex flex-col shadow-xl ${
          isMobile
            ? collapsed
              ? "-translate-x-full"
              : "translate-x-0"
            : collapsed
            ? "w-20"
            : "w-64"
        }`}
      >
        <div className="p-4 border-b border-blue-800">
          {!isMobile && (
            <button
              className="w-full p-2 hover:bg-blue-800 rounded-lg transition flex justify-center items-center group"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu
                size={24}
                className="text-blue-200 group-hover:text-white transition-colors"
              />
            </button>
          )}
        </div>

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
              text="Records"
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

        <div className="p-4 border-t border-blue-800">
          <ul className="list-none p-0 m-0 space-y-1">
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
    </>
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
          isActive ? "bg-blue-800" : "hover:bg-blue-800"
        }`}
      >
        <div
          className={`w-8 flex justify-center ${
            isActive ? "text-white" : "text-blue-200"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-sm font-medium transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-full opacity-100"
          } ${isActive ? "text-white" : "text-blue-200"}`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};

export default Sidebar;
