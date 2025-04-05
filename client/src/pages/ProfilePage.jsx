import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { toast } from '@/hooks/use-toast';

// Mock developer data
const mockDevelopers = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Full-Stack Developer',
    techStack: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/janesmith',
    about: 'Passionate full-stack developer with 5 years of experience building web applications.'
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Backend Developer',
    techStack: ['Vue', 'Python', 'PostgreSQL'],
    githubUrl: 'https://github.com/johndoe',
    about: 'Backend developer focused on building scalable APIs and database solutions.'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    techStack: ['React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/alexj',
    about: 'UI/UX enthusiast who loves creating beautiful user interfaces using modern frameworks.'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'DevOps Engineer',
    techStack: ['Docker', 'Kubernetes', 'AWS'],
    githubUrl: 'https://github.com/sarahw',
    about: 'Cloud infrastructure expert specializing in containerization and CI/CD pipelines.'
  },
  {
    id: 5,
    name: 'Mike Chen',
    role: 'Mobile Developer',
    techStack: ['React Native', 'Flutter', 'Firebase'],
    githubUrl: 'https://github.com/mikechen',
    about: 'Mobile app developer with a passion for creating seamless cross-platform experiences.'
  },
  {
    id: 6,
    name: 'Emma Rodriguez',
    role: 'UI/UX Designer',
    techStack: ['Figma', 'Adobe XD', 'HTML/CSS'],
    githubUrl: 'https://github.com/emmar',
    about: 'Designer who bridges the gap between beautiful interfaces and functional user experiences.'
  }
];

const ProfilePage = () => {
  const { id: userId } = useParams();
  const [developer, setDeveloper] = useState(null);
  const { user } = useAuth();
  const { setActiveChat } = useChat();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const developerData = mockDevelopers.find(dev => dev.id === parseInt(userId));

    if (developerData) {
      setDeveloper(developerData);
      setIsCurrentUser(user?.id === parseInt(userId));
    } else {
      toast({
        title: "Developer not found",
        description: "Could not find the requested developer profile",
        variant: "destructive",
      });
      navigate('/developers');
    }

    setLoading(false);
  }, [userId, user, navigate]);

  const handleMessageClick = () => {
    if (developer) {
      setActiveChat(developer.id);
      navigate('/chat');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Developer not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            
            {/* Profile header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-20 w-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-2xl font-bold mr-6">
                  {developer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{developer.name}</h1>
                  <p className="text-gray-600">{developer.role}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                {developer.githubUrl && (
                  <a
                    href={developer.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Github size={18} className="mr-2" />
                    GitHub Profile
                  </a>
                )}

                {!isCurrentUser && (
                  <button
                    onClick={handleMessageClick}
                    className="inline-flex items-center justify-center px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700"
                  >
                    Message
                  </button>
                )}
              </div>
            </div>

            {/* About section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
              <p className="text-gray-600">{developer.about}</p>
            </div>

            {/* Tech Stack section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {developer.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
