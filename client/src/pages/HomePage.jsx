
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Users, Code, MessageSquare } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-700 to-brand-500 text-white">
          <div className="container mx-auto px-4 py-20 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Connect, Collaborate, Create with DevConnect
              </h1>
              <p className="text-lg sm:text-xl mb-8 opacity-90">
                The platform where developers meet, share ideas, and build amazing projects together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/signup"
                      className="px-8 py-3 bg-white text-brand-600 font-medium rounded-lg hover:bg-gray-100 transition"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition border border-white/20"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard"
                    className="px-8 py-3 bg-white text-brand-600 font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What DevConnect Offers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Developer Community</h3>
                <p className="text-gray-600">
                  Connect with developers from all over the world, with different skills and experience levels.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Showcase</h3>
                <p className="text-gray-600">
                  Share your projects, get feedback, and discover other developers' work to collaborate on.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Chat</h3>
                <p className="text-gray-600">
                  Message other developers directly, discuss ideas, and plan your collaborative projects.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Connect with Fellow Developers?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our growing community of developers, showcase your skills, and find your next collaboration partner.
            </p>
            {!isAuthenticated ? (
              <Link
                to="/signup"
                className="px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
              >
                Join DevConnect
              </Link>
            ) : (
              <Link
                to="/developers"
                className="px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition"
              >
                Explore Developers
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">DevConnect <span className="text-xs bg-gray-700 text-gray-300 px-1 rounded">Lite</span></h2>
              <p className="text-sm text-gray-400">Connect. Collaborate. Code.</p>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} DevConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
