import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ProjectCard from '../components/ProjectCard';
import SkillsManager from '../components/SkillsManager';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-gray-600 mb-8">Here's what's happening with your projects and connections</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Projects</h2>
                  <button className="inline-flex items-center px-3 py-1.5 bg-brand-100 text-brand-600 rounded-md hover:bg-brand-200">
                    <Plus size={18} className="mr-1" /> New Project
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProjectCard 
                    title="Task Management App" 
                    description="A React-based task management application with drag-and-drop functionality"
                    techStack={["React", "Redux", "Tailwind"]}
                    githubUrl="https://github.com/yourusername/task-app"
                  />
                  <ProjectCard 
                    title="Weather Dashboard" 
                    description="Weather forecasting application using OpenWeather API"
                    techStack={["JavaScript", "API", "CSS"]}
                    githubUrl="https://github.com/yourusername/weather-app"
                  />
                </div>
              </div>
              
              {/* Add Skills Manager Component */}
              <div className="mb-8">
                <SkillsManager />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              {user && (
                <ProfileCard
                  id={user.id}
                  name={user.name}
                  role={user.role}
                  techStack={user.techStack}
                  githubUrl={user.githubUrl}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
