import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import ProjectCard from '../components/ProjectCard';
import SkillsManager from '../components/SkillsManager';
import { Plus } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${user.id}`);
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [user]);

  const handleAddProject = async () => {
    try {
      const newProject = {
        user: user.id,
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(',').map(t => t.trim()),
        githubUrl: form.githubUrl,
      };

      const res = await axios.post('http://localhost:5000/api/projects', newProject);
      setProjects(prev => [...prev, res.data]);

      setForm({ title: '', description: '', techStack: '', githubUrl: '' });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  const handleRemoveProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(prev => prev.filter(project => project._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}</h1>
          <p className="text-gray-600 mb-8">Here's what's happening with your projects and connections</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Projects</h2>
                  <button
                    className="inline-flex items-center px-3 py-1.5 bg-brand-100 text-brand-600 rounded-md hover:bg-brand-200"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus size={18} className="mr-1" /> New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      title={project.title}
                      description={project.description}
                      techStack={project.techStack}
                      githubUrl={project.githubUrl}
                      onRemove={() => handleRemoveProject(project._id)}
                    />
                  ))}
                </div>
              </div>

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Tech Stack (comma-separated)"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
