import { Github } from 'lucide-react';

const ProjectCard = ({ 
  id, 
  title, 
  description, 
  techStack, 
  githubUrl,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {onDelete && (
          <button 
            onClick={() => onDelete(id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Remove
          </button>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
      
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-1">Tech Stack</p>
        <div className="flex flex-wrap">
          {techStack.map((tech) => (
            <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center text-sm text-brand-600 hover:text-brand-700"
      >
        <Github size={16} className="mr-1" />
        View on GitHub
      </a>
    </div>
  );
};

export default ProjectCard;
