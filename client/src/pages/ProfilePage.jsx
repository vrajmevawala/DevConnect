import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { id: userId } = useParams();
  const [developer, setDeveloper] = useState(null);
  const { user } = useAuth();
  const { setActiveChat } = useChat();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
  let isMounted = true;

  const fetchDeveloper = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();

      if (isMounted) {
        setDeveloper(data);
        setIsCurrentUser(user?.id === parseInt(userId));
      }
    } catch (err) {
      if (isMounted) {
        toast({
          title: "Developer not found",
          description: "Could not find the requested developer profile.",
          variant: "destructive",
        });

        setTimeout(() => {
          navigate('/developers');
        }, 2000); // delay so toast is visible
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  if (userId) fetchDeveloper();

  return () => {
    isMounted = false;
  };
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

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-brand-600 hover:underline mb-4"
            >
              ← Back
            </button>

            {/* Profile Header */}
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

            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
              <p className="text-gray-600">{developer.about}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {developer.techStack?.map(tech => (
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
