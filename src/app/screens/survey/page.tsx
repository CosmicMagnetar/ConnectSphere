"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from "lucide-react";

// ✅ Mock Supabase client to resolve the import error in this environment.
const supabase = {
  auth: {
    getUser: async () => {
      // Simulate a logged-in user for the survey to proceed.
      return {
        data: {
          user: {
            id: 'mock-user-123',
            email: 'test@example.com',
            user_metadata: { full_name: 'Alex Johnson' },
          },
        },
        error: null,
      };
    },
  },
  from: (tableName: string) => ({
    upsert: async (data: Record<string, unknown>) => {
      console.log(`[MOCK] Upserting to ${tableName}:`, data);
      return { error: null };
    },
    delete: () => ({
      eq: async (column: string, value: string) => {
        console.log(`[MOCK] Deleting from ${tableName} where ${column} = ${value}`);
        return { error: null };
      },
    }),
    insert: async (data: Record<string, unknown> | Array<Record<string, unknown>>) => {
      console.log(`[MOCK] Inserting into ${tableName}:`, data);
      return { error: null };
    },
  }),
};


// --- Data Structures for the Form ---
type TechStackItem = { name: string; level: string };

type ProfileData = {
  full_name: string;
  subtitle: string;
  tech_stack: TechStackItem[];
  level: string;
  interests: string;
  goals: string;
};
type Project = { title: string; description: string; tech_stack: string[] };
type Achievement = { title: string; date: string; };

type FormState = {
  profile: ProfileData;
  achievements: Achievement[];
  projects: Project[];
};

interface Particle {
  id: number;
  left: string;
  top: string;
  background: string;
  animationDelay: string;
  opacity: number;
}

type ProfileValue = string | TechStackItem[];


export default function ProfileSurvey() {
  // ✅ Mock useRouter to resolve the Next.js dependency error.
  const router = {
    push: (path: string) => {
      console.log(`Redirecting to: ${path}`);
      // Use an alert for clear user feedback in this environment.
      alert(`Survey complete! You would now be redirected to ${path}.`);
    }
  };

  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const [formState, setFormState] = useState<FormState>({
    profile: { full_name: "", subtitle: "", tech_stack: [], level: "", interests: "", goals: "" },
    achievements: [],
    projects: [],
  });
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tempAchievement, setTempAchievement] = useState<Achievement>({ title: "", date: "" });
  const [tempProject, setTempProject] = useState<Project>({ title: "", description: "", tech_stack: [] });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const checkUserAndPrefill = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // In a real app, this would redirect. Here, we'll just log it.
        console.log("No user found, redirecting to login.");
        router.push("/login");
        return;
      }
      setFormState(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          full_name: user.user_metadata?.full_name || user.email || ""
        }
      }));
      setLoading(false);
    };
    checkUserAndPrefill();

    const generated: Particle[] = [...Array(30)].map((_, i) => ({
      id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      background: i % 3 === 0 ? "#3B82F6" : i % 3 === 1 ? "#8B5CF6" : "#6366F1",
      animationDelay: `${Math.random() * 2}s`, opacity: 0.6,
    }));
    setParticles(generated);
  }, [router]);

  const techOptions = ["JavaScript","Python","Java","C++","React","Node.js","Django","Go","Rust","TypeScript", "Next.js", "Tailwind CSS", "SQL"];
  const levelOptions = ["Beginner","Intermediate","Advanced","Expert"];

  const questions = [
    { id: "full_name", title: "What's your name?", subtitle: "This will be your display name on the platform.", type: "text", placeholder: "Enter your full name" },
    { id: "subtitle", title: "What's your professional subtitle?", subtitle: "A short bio that appears under your name.", type: "text", placeholder: "e.g., Aspiring Full-Stack Developer" },
    { id: "tech_stack", title: "What's your primary tech stack?", subtitle: "Select the technologies you are most comfortable with.", type: "multiselect", options: techOptions },
    { id: "level", title: "What's your overall experience level?", subtitle: "This helps us match you with the right opportunities.", type: "select", options: levelOptions },
    { id: "interests", title: "What are your interests?", subtitle: "Tell us about your passions in the tech world.", type: "textarea", placeholder: "e.g., Web development, AI/ML, DevOps..." },
    { id: "goals", title: "What are your mentorship goals?", subtitle: "What do you hope to achieve?", type: "textarea", placeholder: "e.g., Contribute to a major project..." },
    { id: "projects", title: "Describe a project you've worked on", subtitle: "It can be personal, academic, or professional (optional).", type: "dynamic-list" },
    { id: "achievements", title: "Share any achievements", subtitle: "List things you're proud of (optional).", type: "dynamic-list" },
  ];

  const addAchievement = () => {
    if (tempAchievement.title && tempAchievement.date) {
      setFormState(prev => ({ ...prev, achievements: [...prev.achievements, tempAchievement] }));
      setTempAchievement({ title: "", date: "" });
    }
  };
  const removeAchievement = (index: number) => {
    setFormState(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };
  
  const addProject = () => {
    if (tempProject.title && tempProject.description) {
      setFormState(prev => ({ ...prev, projects: [...prev.projects, tempProject] }));
      setTempProject({ title: "", description: "", tech_stack: [] });
    }
  };
  const removeProject = (index: number) => {
    setFormState(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleInputChange = (field: keyof ProfileData, value: ProfileValue) => {
    setFormState(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const handleTechToggle = (tech: string) => {
    const currentStack = formState.profile.tech_stack;
    const isSelected = currentStack.some(item => item.name === tech);
    const newStack = isSelected 
      ? currentStack.filter(item => item.name !== tech) 
      : [...currentStack, { name: tech, level: 'Beginner' }];
    handleInputChange("tech_stack", newStack);
  };
  
  const handleProjectTechToggle = (tech: string) => {
    const currentStack = tempProject.tech_stack;
    const newStack = currentStack.includes(tech)
      ? currentStack.filter(t => t !== tech)
      : [...currentStack, tech];
    setTempProject(prev => ({ ...prev, tech_stack: newStack }));
  };

  const canProceed = () => {
    const currentQuestion = questions[currentStep];

    if (currentQuestion.id === 'achievements' || currentQuestion.id === 'projects') {
      return true;
    }

    const fieldId = currentQuestion.id as keyof ProfileData;

    if (currentQuestion.type === "multiselect" && fieldId === 'tech_stack') {
        return formState.profile.tech_stack.length > 0;
    }
    
    const value = formState.profile[fieldId];
    if (typeof value === "string") {
        return value.trim() !== "";
    }
    
    return false;
  };

  const handleNext = () => currentStep < questions.length - 1 && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 0 && setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found. Please log in again.");

      const { full_name, ...profileData } = formState.profile;
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: user.id, role: 'mentee', email: user.email, name: full_name, ...profileData });
      if (profileError) throw profileError;

      const { error: deleteAchievementsError } = await supabase.from('achievements').delete().eq('user_id', user.id);
      if (deleteAchievementsError) throw deleteAchievementsError;

      if (formState.achievements.length > 0) {
        const achievementsToInsert = formState.achievements.map(ach => ({ ...ach, user_id: user.id }));
        const { error: achievementsError } = await supabase.from('achievements').insert(achievementsToInsert);
        if (achievementsError) throw achievementsError;
      }

      const { error: deleteProjectsError } = await supabase.from('projects').delete().eq('user_id', user.id);
      if (deleteProjectsError) throw deleteProjectsError;

      if (formState.projects.length > 0) {
        const projectsToInsert = formState.projects.map(proj => ({ ...proj, user_id: user.id }));
        const { error: projectsError } = await supabase.from('projects').insert(projectsToInsert);
        if (projectsError) throw projectsError;
      }
      
      console.log("Profile data saved successfully!");
      router.push("/screens/dashboard");

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Submission error:", err);
      } else {
        setError("An unexpected error occurred during submission.");
        console.error("Submission error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];

  if (loading && !formState.profile.full_name) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Verifying session...</div>
  }

  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => <div key={p.id} className="absolute w-1 h-1 rounded-full" style={{...p, animation: `float 5s ease-in-out infinite`}} />)}
      </div>

      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-400 text-sm font-medium">Question {currentStep + 1} of {questions.length}</span>
                <span className="text-gray-400 text-sm">{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
            </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{currentQuestion.title}</h2>
          <p className="text-gray-400 mb-8">{currentQuestion.subtitle}</p>

          <div className="mb-8 min-h-[280px]">
            {currentQuestion.type === 'text' && <input type="text" value={formState.profile[currentQuestion.id as keyof ProfileData] as string} onChange={e => handleInputChange(currentQuestion.id as keyof ProfileData, e.target.value)} placeholder={currentQuestion.placeholder} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500" />}
            {currentQuestion.type === 'textarea' && <textarea value={formState.profile[currentQuestion.id as keyof ProfileData] as string} onChange={e => handleInputChange(currentQuestion.id as keyof ProfileData, e.target.value)} placeholder={currentQuestion.placeholder} rows={5} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white resize-none focus:outline-none focus:border-cyan-500" />}
            {currentQuestion.type === 'select' && <div className="grid grid-cols-2 gap-3">{currentQuestion.options?.map(o => <button key={o} onClick={() => handleInputChange('level', o)} className={`px-4 py-3 rounded-lg border transition-all ${formState.profile.level === o ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white" : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-500"}`}>{o}</button>)}</div>}
            {currentQuestion.type === 'multiselect' && <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{currentQuestion.options?.map(o => <button key={o} onClick={() => handleTechToggle(o)} className={`px-4 py-3 rounded-lg border transition-all ${formState.profile.tech_stack.some(item => item.name === o) ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white" : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-500"}`}>{o}</button>)}</div>}
            
            {currentQuestion.id === 'projects' && (
              <div>
                <div className="space-y-2 mb-4 p-4 bg-gray-900 rounded-lg">
                  <input type="text" placeholder="Project Title" value={tempProject.title} onChange={e => setTempProject(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2 bg-gray-800 border-gray-700 rounded-lg text-white" />
                  <textarea placeholder="Project Description" value={tempProject.description} onChange={e => setTempProject(p => ({ ...p, description: e.target.value }))} className="w-full px-4 py-2 bg-gray-800 border-gray-700 rounded-lg text-white resize-none" rows={2} />
                  <p className="text-sm text-gray-400 pt-2">Tech Stack for this project:</p>
                  <div className="flex flex-wrap gap-2">
                    {techOptions.slice(0, 6).map(opt => (
                       <button key={opt} onClick={() => handleProjectTechToggle(opt)} className={`px-3 py-1 text-xs rounded-full border ${tempProject.tech_stack.includes(opt) ? "bg-cyan-500 text-white border-cyan-500" : "bg-gray-800 text-gray-300 border-gray-700"}`}>{opt}</button>
                    ))}
                  </div>
                  <button onClick={addProject} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white mt-2"><Plus size={16} /> Add Project</button>
                </div>
                 <div className="space-y-2 max-h-24 overflow-y-auto pr-2">{formState.projects.map((proj, i) => (<div key={i} className="flex justify-between items-center p-2 bg-gray-800 rounded"><span className="text-white">{proj.title}</span><button onClick={() => removeProject(i)} className="text-red-500"><Trash2 size={16} /></button></div>))}</div>
              </div>
            )}
            
            {currentQuestion.id === 'achievements' && (
              <div>
                <div className="flex flex-col md:flex-row gap-2 mb-4">
                  <input type="text" placeholder="Achievement Title" value={tempAchievement.title} onChange={e => setTempAchievement(p => ({ ...p, title: e.target.value }))} className="flex-grow px-4 py-2 bg-gray-800 border-gray-700 rounded-lg text-white" />
                  <input type="date" value={tempAchievement.date} onChange={e => setTempAchievement(p => ({ ...p, date: e.target.value }))} className="px-4 py-2 bg-gray-800 border-gray-700 rounded-lg text-white" />
                  <button onClick={addAchievement} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white"><Plus size={16} /> Add</button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">{formState.achievements.map((ach, i) => (<div key={i} className="flex justify-between items-center p-2 bg-gray-800 rounded"><span className="text-white">{ach.title} ({ach.date})</span><button onClick={() => removeAchievement(i)} className="text-red-500"><Trash2 size={16} /></button></div>))}</div>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          
          <div className="flex justify-between items-center">
            <button onClick={handlePrev} disabled={currentStep === 0} className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${currentStep === 0 ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}><ChevronLeft className="w-5 h-5" />Back</button>
            {currentStep === questions.length - 1 ? (
              <button onClick={handleSubmit} disabled={loading} className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${!loading ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "bg-gray-800 text-gray-600 cursor-not-allowed"}`}>
                {loading ? "Saving..." : "Submit"}<Check className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleNext} disabled={!canProceed()} className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${canProceed() ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white" : "bg-gray-800 text-gray-600 cursor-not-allowed"}`}>Next<ChevronRight className="w-5 h-5" /></button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

