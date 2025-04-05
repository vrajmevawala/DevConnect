import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock data for development
const mockUsers = [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@example.com',
    techStack: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/janesmith',
    role: 'Full-Stack Developer',
    password: 'password123',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    techStack: ['Vue', 'Python', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe',
    role: 'Backend Developer',
    password: 'password123',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const isAuthenticated = Boolean(user);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const signup = async (userData) => {
    if (mockUsers.some((u) => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
    };

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addSkill = (skill) => {
    if (!user) return;

    if (user.techStack.includes(skill)) return;

    const updatedUser = {
      ...user,
      techStack: [...user.techStack, skill],
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const removeSkill = (skill) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      techStack: user.techStack.filter((s) => s !== skill),
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        addSkill,
        removeSkill,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
