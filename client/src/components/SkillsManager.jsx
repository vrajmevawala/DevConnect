import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from '@/hooks/use-toast';

const SkillsManager = () => {
  const { user, addSkill, removeSkill } = useAuth();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (!newSkill.trim()) return;

    // Simple validation to prevent duplicates
    if (user?.techStack.map(s => s.toLowerCase()).includes(newSkill.toLowerCase())) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your profile",
        variant: "destructive",
      });
      return;
    }

    addSkill(newSkill.trim());
    toast({
      title: "Skill added",
      description: `${newSkill} has been added to your profile`,
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skill) => {
    removeSkill(skill);

    toast({
      title: "Skill removed",
      description: `${skill} has been removed from your profile`,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Your Skills</h3>

      <form onSubmit={handleAddSkill} className="flex mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill..."
          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
        />
        <button
          type="submit"
          className="bg-brand-600 text-white px-4 py-2 rounded-r-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <Plus size={18} />
        </button>
      </form>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Your Current Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {user?.techStack.map((skill) => (
            <div
              key={skill}
              className="flex items-center bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-brand-700 hover:text-brand-900 focus:outline-none"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsManager;
