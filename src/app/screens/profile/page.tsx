"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Make sure path is correct
import { useRouter } from "next/navigation";
import {
  Award, Star, Settings, Github, Linkedin, Globe, Zap, Target, TrendingUp,
  BookOpen, Users, Mail, MapPin, Calendar, Edit, Save, Plus, Trash2
} from "lucide-react";

// Helper to map icon names from DB to actual React components
const iconMap = {
  Award: Award, Star: Star, Target: Target, Zap: Zap,
};

export default function ProfilePage() {
  // State for displaying data
  const [profile, setProfile]       = useState<any>(null);
  const [projects, setProjects]     = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [activities, setActivities]   = useState<any[]>([]);
  
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData]   = useState<any>({});
  const [tempProject, setTempProject] = useState({ title: "", description: "", tech_stack: [] });
  const [tempAchievement, setTempAchievement] = useState({ title: "", date: "" });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/screens/login');
        return;
      }

      // Fetch all data in parallel
      const [profileRes, projectsRes, achievementsRes, activitiesRes] = await Promise.all([
        supabase.from('profiles').select('*, mentor:mentor_id (id, name, subtitle)').eq('id', user.id).single(),
        supabase.from('projects').select('*').eq('user_id', user.id),
        supabase.from('achievements').select('*').eq('user_id', user.id),
        supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
      ]);

      setProfile(profileRes.data);
      setProjects(projectsRes.data || []);
      setAchievements(achievementsRes.data || []);
      setActivities(activitiesRes.data || []);
      
      // Initialize form data for editing
      setFormData({
        profile: profileRes.data || {},
        projects: projectsRes.data || [],
        achievements: achievementsRes.data || [],
      });
      
      setLoading(false);
    };

    fetchData();
  }, [router]);

  // --- Handlers for editing ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value }
    }));
  };

  const addAchievement = () => {
    if (tempAchievement.title && tempAchievement.date) {
      setFormData((prev: any) => ({ ...prev, achievements: [...prev.achievements, tempAchievement] }));
      setTempAchievement({ title: "", date: "" });
    }
  };
  const removeAchievement = (index: number) => {
    setFormData((prev: any) => ({ ...prev, achievements: prev.achievements.filter((_: any, i: number) => i !== index) }));
  };
  
  const addProject = () => {
    if (tempProject.title && tempProject.description) {
      setFormData((prev: any) => ({ ...prev, projects: [...prev.projects, tempProject] }));
      setTempProject({ title: "", description: "", tech_stack: [] });
    }
  };
  const removeProject = (index: number) => {
    setFormData((prev: any) => ({ ...prev, projects: prev.projects.filter((_: any, i: number) => i !== index) }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // 1. Upsert profile data
      const { id, mentor, ...profileData } = formData.profile; // Exclude related table data
      await supabase.from('profiles').update(profileData).eq('id', user.id);

      // 2. Clear and re-insert projects
      await supabase.from('projects').delete().eq('user_id', user.id);
      if (formData.projects.length > 0) {
        await supabase.from('projects').insert(formData.projects.map((p: any) => ({ ...p, user_id: user.id })));
      }

      // 3. Clear and re-insert achievements
      await supabase.from('achievements').delete().eq('user_id', user.id);
      if (formData.achievements.length > 0) {
        await supabase.from('achievements').insert(formData.achievements.map((a: any) => ({ ...a, user_id: user.id })));
      }
      
      // Refresh local state with saved data
      setProfile(formData.profile);
      setProjects(formData.projects);
      setAchievements(formData.achievements);
      
      setIsEditing(false);

    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
        case "Expert": return "bg-green-500/20 text-green-400 border-green-500/30";
        case "Advanced": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        case "Intermediate": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
        default: return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    }
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    return Math.floor(seconds / 60) + "m ago";
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen relative bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-purple-950 opacity-50"></div>
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>

      <header className="relative backdrop-blur-xl border-b border-white/5 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/screens/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
              <Image src="/connect.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Connect Sphere</span>
          </Link>
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" /> Account Settings
          </button>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* --- MAIN PROFILE CARD --- */}
        <div className="backdrop-blur-xl rounded-3xl p-8 bg-white/5 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
              {profile?.name?.charAt(0) || '?'}
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                <div className="mb-4 sm:mb-0">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input type="text" name="name" value={formData.profile?.name || ''} onChange={handleInputChange} className="text-4xl font-bold text-white bg-transparent border-b border-blue-500 focus:outline-none w-full" />
                      <input type="text" name="subtitle" value={formData.profile?.subtitle || ''} onChange={handleInputChange} className="text-lg text-gray-400 bg-transparent border-b border-purple-500 focus:outline-none w-full" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-4xl font-bold text-white mb-1">{profile?.name || 'Your Name'}</h1>
                      <p className="text-lg text-gray-400">{profile?.subtitle || 'Your subtitle here'}</p>
                    </>
                  )}
                </div>
                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2 flex-shrink-0">
                  {isEditing ? <><Save size={16} />Save Changes</> : <><Edit size={16} />Edit Profile</>}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 mb-6">
                 <div className="flex items-center gap-2"><Mail size={16} className="text-blue-400" />{profile?.email}</div>
                 {isEditing ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto"><MapPin size={16} className="text-purple-400" /><input type="text" name="location" value={formData.profile?.location || ''} onChange={handleInputChange} className="bg-transparent border-b border-gray-500 focus:outline-none w-full" placeholder="Location"/></div>
                 ) : (
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-purple-400" />{profile?.location || 'Not set'}</div>
                 )}
                 <div className="flex items-center gap-2"><Calendar size={16} className="text-indigo-400" />Joined {new Date(profile?.created_at).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-4">
                  {isEditing ? (
                      <>
                        <input type="text" name="github_url" value={formData.profile?.github_url || ''} onChange={handleInputChange} placeholder="GitHub URL" className="bg-transparent border-b text-sm w-1/3"/>
                        <input type="text" name="linkedin_url" value={formData.profile?.linkedin_url || ''} onChange={handleInputChange} placeholder="LinkedIn URL" className="bg-transparent border-b text-sm w-1/3"/>
                        <input type="text" name="website_url" value={formData.profile?.website_url || ''} onChange={handleInputChange} placeholder="Website URL" className="bg-transparent border-b text-sm w-1/3"/>
                      </>
                  ) : (
                      <>
                        {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github/></a>}
                        {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin/></a>}
                        {profile?.website_url && <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Globe/></a>}
                      </>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
              {isEditing ? (
                <textarea name="bio" value={formData.profile?.bio || ''} onChange={handleInputChange} rows={4} className="w-full bg-white/10 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profile?.bio || 'No bio provided.'}</p>
              )}
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">My Projects</h2>
              <div className="space-y-4">
                {(isEditing ? formData.projects : projects).map((proj: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{proj.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{proj.description}</p>
                    </div>
                    {isEditing && <button onClick={() => removeProject(idx)} className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button>}
                  </div>
                ))}
                {isEditing && (
                    <div className="space-y-2 p-4 border-t border-white/10 mt-4">
                        <input type="text" placeholder="Project Title" value={tempProject.title} onChange={e => setTempProject(p => ({...p, title: e.target.value}))} className="w-full bg-white/10 p-2 rounded focus:outline-none"/>
                        <textarea placeholder="Description" value={tempProject.description} onChange={e => setTempProject(p => ({...p, description: e.target.value}))} className="w-full bg-white/10 p-2 rounded focus:outline-none" rows={3}/>
                        <button onClick={addProject} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors"><Plus size={16}/>Add Project</button>
                    </div>
                )}
              </div>
            </div>
            
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isEditing ? formData.achievements : achievements).map((ach: any, idx: number) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-white">{ach.title}</span>
                    {isEditing ? <button onClick={() => removeAchievement(idx)} className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button> : <span className="text-xs text-gray-500">{new Date(ach.date).toLocaleDateString()}</span>}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 p-4 border-t border-white/10 mt-4">
                    <input type="text" placeholder="Achievement Title" value={tempAchievement.title} onChange={e => setTempAchievement(a => ({...a, title: e.target.value}))} className="w-full bg-white/10 p-2 rounded"/>
                    <input type="date" value={tempAchievement.date} onChange={e => setTempAchievement(a => ({...a, date: e.target.value}))} className="bg-white/10 p-2 rounded"/>
                    <button onClick={addAchievement} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex-shrink-0"><Plus size={16}/></button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Stats</h2>
              <div className="space-y-5">
                 <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"><BookOpen className="w-5 h-5 text-blue-400" /></div><div><div className="text-2xl font-bold">{profile?.sessions_count || 0}</div><div className="text-xs text-gray-400">Sessions</div></div></div>
                 <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Users className="w-5 h-5 text-purple-400" /></div><div><div className="text-2xl font-bold">{profile?.mentors_count || 0}</div><div className="text-xs text-gray-400">Mentors</div></div></div>
                 <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center"><Award className="w-5 h-5 text-indigo-400" /></div><div><div className="text-2xl font-bold">{achievements.length}</div><div className="text-xs text-gray-400">Badges</div></div></div>
              </div>
            </div>
            
            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
               <h2 className="text-xl font-bold text-white mb-6">My Mentor</h2>
               {profile?.mentor ? (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                     <div className="w-12 h-12 text-xl rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold">{profile.mentor.name?.charAt(0)}</div>
                     <div>
                       <h3 className="text-white font-semibold">{profile.mentor.name}</h3>
                       <p className="text-xs text-gray-400">{profile.mentor.subtitle}</p>
                     </div>
                   </div>
               ) : <p className="text-sm text-gray-400">You are not currently assigned to a mentor.</p>}
            </div>

            <div className="backdrop-blur-xl rounded-3xl p-6 bg-white/5 border border-white/10">
               <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
               <div className="space-y-4">
                 {activities.map((activity) => (
                   <div key={activity.id} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      <div>
                         <p className="text-white font-medium text-sm">{activity.action}: <span className="text-gray-300">{activity.detail}</span></p>
                         <span className="text-xs text-gray-500">{timeAgo(activity.created_at)}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

