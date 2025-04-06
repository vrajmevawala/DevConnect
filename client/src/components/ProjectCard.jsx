// components/ProjectCard.js
import { X } from 'lucide-react';

const ProjectCard = ({ title, description, techStack, githubUrl, onRemove }) => {
  return (
    <div className="relative bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <button
        onClick={onRemove}
        aria-label="Remove project"
        className="absolute top-2 right-2 flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
      >
        <X size={14}/>Remove
      </button>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
      {techStack.map((tech) => (
          <span
            key={tech.toLowerCase()}
            className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs rounded-full"
          >
            {tech}
          </span>
      ))}

      </div>
      <a
  href={githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  title="Go to GitHub Repository"
  className="text-brand-600 text-sm hover:underline"
>
  View on GitHub
</a>

    </div>
  );
};

export default ProjectCard;
