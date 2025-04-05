import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { Search } from 'lucide-react';

// Mock developer data
const mockDevelopers = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Full-Stack Developer',
    techStack: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/janesmith'
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Backend Developer',
    techStack: ['Vue', 'Python', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    techStack: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/alexj'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'DevOps Engineer',
    techStack: ['Docker', 'Kubernetes', 'AWS'],
    githubUrl: 'https://github.com/sarahw'
  },
  {
    id: 5,
    name: 'Mike Chen',
    role: 'Mobile Developer',
    techStack: ['React Native', 'Flutter', 'Firebase'],
    githubUrl: 'https://github.com/mikechen'
  },
  {
    id: 6,
    name: 'Emma Rodriguez',
    role: 'UI/UX Designer',
    techStack: ['Figma', 'Adobe XD', 'HTML/CSS'],
    githubUrl: 'https://github.com/emmar'
  }
];

const DevelopersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const { user } = useAuth();
  const { setActiveChat } = useChat();
  const navigate = useNavigate();

  // Filter out current user and apply search/filter
  const filteredDevelopers = mockDevelopers
    .filter(dev => dev.id !== user?.id)
    .filter(dev => {
      const matchesSearch =
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTech = techFilter
        ? dev.techStack.some(tech =>
            tech.toLowerCase().includes(techFilter.toLowerCase())
          )
        : true;

      return matchesSearch && matchesTech;
    });

  // Extract unique tech stack items for filter dropdown
  const allTechStacks = Array.from(
    new Set(mockDevelopers.flatMap(dev => dev.techStack))
  ).sort();

  const handleMessageClick = (developerId) => {
    setActiveChat(developerId);
    navigate('/chat');
  };

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Browse Developers</h1>

          {/* Search and Filter */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search developers by name or role..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="w-full md:w-64">
                <select
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 rounded-md"
                >
                  <option value="">All Technologies</option>
                  {allTechStacks.map((tech) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Developers Grid */}
          {filteredDevelopers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((developer) => (
                <ProfileCard
                  key={developer.id}
                  id={developer.id}
                  name={developer.name}
                  role={developer.role}
                  techStack={developer.techStack}
                  githubUrl={developer.githubUrl}
                  showMessageButton={true}
                  onMessageClick={handleMessageClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No developers match your search criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DevelopersPage;
