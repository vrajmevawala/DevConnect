import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

// Mock data for development
const mockProjects = [
  {
    id: 1,
    userId: 1,
    title: 'DevConnect',
    description: 'A platform for developers to connect and collaborate on projects',
    githubUrl: 'https://github.com/janesmith/devconnect',
    techStack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    userId: 1,
    title: 'Code Reviewer',
    description: 'AI-powered code review tool',
    githubUrl: 'https://github.com/janesmith/code-reviewer',
    techStack: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 3,
    userId: 2,
    title: 'Task Manager',
    description: 'Simple task management application',
    githubUrl: 'https://github.com/johndoe/task-manager',
    techStack: ['Vue', 'Express', 'PostgreSQL'],
  },
];

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(mockProjects);
  const { user } = useAuth();

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: projects.length + 1,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter(project => project.id !== id));
  };

  const getUserProjects = (userId) => {
    return projects.filter(project => project.userId === userId);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject, getUserProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
