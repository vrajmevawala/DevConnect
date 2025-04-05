import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  FolderIcon,
  FileTextIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 space-y-6">
      <h1 className="text-2xl font-bold text-center">Dashboard</h1>

      <nav className="flex flex-col space-y-4">
        <Link to="/home" className="flex items-center space-x-3 hover:text-blue-400">
          <HomeIcon size={20} />
          <span>Home</span>
        </Link>
        <Link to="/projects" className="flex items-center space-x-3 hover:text-blue-400">
          <FolderIcon size={20} />
          <span>Projects</span>
        </Link>
        <Link to="/documents" className="flex items-center space-x-3 hover:text-blue-400">
          <FileTextIcon size={20} />
          <span>Documents</span>
        </Link>
        <Link to="/profile" className="flex items-center space-x-3 hover:text-blue-400">
          <UserIcon size={20} />
          <span>Profile</span>
        </Link>
        <Link to="/logout" className="flex items-center space-x-3 hover:text-red-400">
          <LogOutIcon size={20} />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
