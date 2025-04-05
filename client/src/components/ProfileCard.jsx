import { Link } from 'react-router-dom';
import { Github, MessageSquare, ExternalLink } from 'lucide-react';

const ProfileCard = ({
  id,
  name,
  role,
  techStack,
  githubUrl,
  showMessageButton = false,
  onMessageClick
}) => {
  const handleMessageClick = () => {
    if (onMessageClick) {
      onMessageClick(id);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
        <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Tech Stack</p>
          <div className="flex flex-wrap">
            {techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <Github size={16} className="mr-1" />
                GitHub
              </a>
            )}

            <Link
              to={`/profile/${id}`}
              className="text-sm inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ExternalLink size={16} className="mr-1" />
              View Profile
            </Link>
          </div>

          {showMessageButton && (
            <button
              onClick={handleMessageClick}
              className="inline-flex items-center px-3 py-1 rounded text-sm bg-brand-100 text-brand-600 hover:bg-brand-200"
            >
              <MessageSquare size={14} className="mr-1" />
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
