import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  User, FolderOpen, Wrench, Briefcase, Award, Trophy, LogOut,
  Plus, Trash2, Edit2, Save, X, Upload, ChevronDown, ChevronUp,
} from 'lucide-react';
import {
  getProfile, updateProfile, uploadProfilePhoto, uploadResume,
  getProjects, createProject, updateProject, deleteProject, uploadProjectImage,
  uploadProjectImages, deleteProjectImage,
  getSkills, createSkill, deleteSkill,
  getExperience, createExperience, updateExperience, deleteExperience,
  uploadExperienceLetter, uploadExperienceLogo,
  getCertifications, createCertification, updateCertification, deleteCertification, uploadCertBadge,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
} from '../api/portfolio';

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'skills', label: 'Skills', icon: Wrench },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'certifications', label: 'Certifications', icon: Award },
  { key: 'achievements', label: 'Achievements', icon: Trophy },
];

const inputCls = 'w-full bg-[#0D0E14] border border-white/10 text-white font-sans text-sm px-3.5 py-2.5 outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors placeholder-white/20 rounded-xl';
const labelCls = 'block text-cream/70 font-sans text-xs uppercase tracking-wider font-semibold mb-1.5';
const btnPrimary = 'bg-gradient-to-r from-gold to-gold-dark text-black px-4 py-2 font-sans text-xs font-bold tracking-wide hover:shadow-glow-gold transition-all flex items-center gap-2 rounded-xl disabled:opacity-50 active:scale-95';
const btnOutline = 'border border-white/10 text-cream/80 px-3 py-1.5 font-sans text-xs hover:border-white/30 hover:text-white transition-colors flex items-center gap-1.5 rounded-xl bg-white/[0.03]';
const btnDanger = 'border border-red-500/30 text-red-400 px-3 py-1.5 font-sans text-xs hover:bg-red-500/10 transition-colors flex items-center gap-1.5 rounded-xl';

// ─────────────────────────────────────────────
// Profile Tab
// ─────────────────────────────────────────────
function ProfileTab() {
  const [data, setData] = useState({
    name: '', title: '', bio: '', cgpa: '', phone: '', location: '',
    github: '', linkedin: '', leetcode: '', email: '',
    hero_role: '', hero_status: '', hero_headline: '', hero_subtext: '',
    stat1_value: '', stat1_label: '', stat1_sub: '',
    stat2_value: '', stat2_label: '', stat2_sub: '',
    stat3_value: '', stat3_label: '', stat3_sub: '',
    stat4_value: '', stat4_label: '', stat4_sub: '',
    edu_degree: '', edu_college: '', edu_location: '', edu_class12: '',
    about_tag: '', about_headline: '', about_quote: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const photoRef = useRef();
  const resumeRef = useRef();

  useEffect(() => {
    getProfile().then((r) => {
      setData((prev) => ({ ...prev, ...r.data, photo_url: r.data.photo_url || r.data.profile_photo_url }));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(data);
      toast.success('All changes saved successfully!');
    } catch {
      toast.error('Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const r = await uploadProfilePhoto(file);
      const url = r.data.photo_url || r.data.profile_photo_url;
      setData((d) => ({ ...d, photo_url: url, profile_photo_url: url }));
      toast.success('Photo updated!');
    } catch {
      toast.error('Photo upload failed.');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const r = await uploadResume(file);
      setData((d) => ({ ...d, resume_url: r.data.resume_url }));
      toast.success('Resume uploaded!');
    } catch {
      toast.error('Resume upload failed.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-10 max-w-4xl pb-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <h2 className="font-serif text-2xl font-bold text-cream">Portfolio Content & Profile CMS</h2>
          <p className="text-xs text-cream/50 mt-1 font-sans">
            Every text, stat card, headline, tag, and quote is fully editable here.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          <Save size={14} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {/* ── Photo & Resume Uploads ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">Photo &amp; Resume</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy/50 overflow-hidden border border-white/10 flex items-center justify-center">
              {data.photo_url ? (
                <img src={data.photo_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-serif text-xl font-bold text-gold">{data.name?.[0] || 'R'}</span>
              )}
            </div>
            <div>
              <input type="file" accept="image/*" ref={photoRef} className="hidden" onChange={handlePhotoUpload} />
              <button onClick={() => photoRef.current?.click()} className={btnOutline}>
                <Upload size={12} /> Change Profile Photo
              </button>
              <p className="text-[11px] text-cream/40 mt-1">Appears in Hero portrait frame</p>
            </div>
          </div>

          <div className="border-l border-white/10 pl-8">
            <input type="file" accept="application/pdf" ref={resumeRef} className="hidden" onChange={handleResumeUpload} />
            <button onClick={() => resumeRef.current?.click()} className={btnOutline}>
              <Upload size={12} /> Upload Resume PDF
            </button>
            {data.resume_url && (
              <a href={data.resume_url} target="_blank" rel="noreferrer" className="text-gold text-xs font-sans underline block mt-1.5">
                View current uploaded PDF &rarr;
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── 1. Hero Section Content ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-5">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          1. Hero Section Content
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Role Tag (Top Label)</label>
            <input
              className={inputCls}
              placeholder="e.g. BACKEND DEVELOPER •"
              value={data.hero_role || ''}
              onChange={(e) => setData({ ...data, hero_role: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Status Pill (Green Badge)</label>
            <input
              className={inputCls}
              placeholder="e.g. Open to SDE & Backend roles"
              value={data.hero_status || ''}
              onChange={(e) => setData({ ...data, hero_status: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>
            Editorial Headline (Press Enter for new line breaks)
          </label>
          <textarea
            className={`${inputCls} resize-none font-mono text-xs`}
            rows={5}
            placeholder={`I build\nthoughtful backend\nsystems, from\nREST APIs to\ncloud scale.`}
            value={data.hero_headline || ''}
            onChange={(e) => setData({ ...data, hero_headline: e.target.value })}
          />
          <p className="text-[11px] text-cream/40 mt-1">
            Tip: Each new line in this box renders as an editorial line break on the site!
          </p>
        </div>

        <div>
          <label className={labelCls}>Hero Subtext (One-Liner Bio)</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={2}
            placeholder="Passionate about high-throughput Python backends..."
            value={data.hero_subtext || ''}
            onChange={(e) => setData({ ...data, hero_subtext: e.target.value })}
          />
        </div>
      </div>

      {/* ── 2. About Section — 4 Stat Cards ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-5">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          2. About Section &mdash; 4 Stat Cards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <p className="text-xs font-semibold text-cream/80">Stat Card 1 (e.g. CGPA)</p>
            <div>
              <label className={labelCls}>Value</label>
              <input
                className={inputCls}
                placeholder="7.86"
                value={data.stat1_value ?? (data.cgpa || '')}
                onChange={(e) => setData({ ...data, stat1_value: e.target.value, cgpa: parseFloat(e.target.value) || data.cgpa })}
              />
            </div>
            <div>
              <label className={labelCls}>Label</label>
              <input
                className={inputCls}
                placeholder="CGPA"
                value={data.stat1_label || ''}
                onChange={(e) => setData({ ...data, stat1_label: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Subtext</label>
              <input
                className={inputCls}
                placeholder="AKGEC CSIT"
                value={data.stat1_sub || ''}
                onChange={(e) => setData({ ...data, stat1_sub: e.target.value })}
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <p className="text-xs font-semibold text-cream/80">Stat Card 2 (e.g. Projects)</p>
            <div>
              <label className={labelCls}>Value</label>
              <input
                className={inputCls}
                placeholder="2+"
                value={data.stat2_value || ''}
                onChange={(e) => setData({ ...data, stat2_value: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Label</label>
              <input
                className={inputCls}
                placeholder="PROJECTS"
                value={data.stat2_label || ''}
                onChange={(e) => setData({ ...data, stat2_label: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Subtext</label>
              <input
                className={inputCls}
                placeholder="Production Grade"
                value={data.stat2_sub || ''}
                onChange={(e) => setData({ ...data, stat2_sub: e.target.value })}
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <p className="text-xs font-semibold text-cream/80">Stat Card 3 (e.g. DSA Practice)</p>
            <div>
              <label className={labelCls}>Value</label>
              <input
                className={inputCls}
                placeholder="150+"
                value={data.stat3_value || ''}
                onChange={(e) => setData({ ...data, stat3_value: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Label</label>
              <input
                className={inputCls}
                placeholder="DSA PRACTICE"
                value={data.stat3_label || ''}
                onChange={(e) => setData({ ...data, stat3_label: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Subtext</label>
              <input
                className={inputCls}
                placeholder="LeetCode & Beyond"
                value={data.stat3_sub || ''}
                onChange={(e) => setData({ ...data, stat3_sub: e.target.value })}
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <p className="text-xs font-semibold text-cream/80">Stat Card 4 (e.g. Certs &amp; Wins)</p>
            <div>
              <label className={labelCls}>Value</label>
              <input
                className={inputCls}
                placeholder="4+"
                value={data.stat4_value || ''}
                onChange={(e) => setData({ ...data, stat4_value: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Label</label>
              <input
                className={inputCls}
                placeholder="CERTS & WINS"
                value={data.stat4_label || ''}
                onChange={(e) => setData({ ...data, stat4_label: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Subtext</label>
              <input
                className={inputCls}
                placeholder="JPMorgan & Honors"
                value={data.stat4_sub || ''}
                onChange={(e) => setData({ ...data, stat4_sub: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Education Card ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-5">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          3. Education Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Degree &amp; Branch</label>
            <input
              className={inputCls}
              placeholder="B.Tech — Computer Science & IT"
              value={data.edu_degree || ''}
              onChange={(e) => setData({ ...data, edu_degree: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>College &amp; Years</label>
            <input
              className={inputCls}
              placeholder="Ajay Kumar Garg Engineering College (2024 – 2028)"
              value={data.edu_college || ''}
              onChange={(e) => setData({ ...data, edu_college: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Location</label>
            <input
              className={inputCls}
              placeholder="Ghaziabad, UP"
              value={data.edu_location || data.location || ''}
              onChange={(e) => setData({ ...data, edu_location: e.target.value, location: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Secondary Detail / Class 12</label>
            <input
              className={inputCls}
              placeholder="Class 12: 89.66%"
              value={data.edu_class12 || ''}
              onChange={(e) => setData({ ...data, edu_class12: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* ── 4. About Narrative & Quote ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-5">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          4. About Narrative &amp; Quote
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Section Tagline</label>
            <input
              className={inputCls}
              placeholder="ABOUT MY BACKGROUND"
              value={data.about_tag || ''}
              onChange={(e) => setData({ ...data, about_tag: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Section Headline</label>
            <input
              className={inputCls}
              placeholder="Engineering scalable systems with intent & speed."
              value={data.about_headline || ''}
              onChange={(e) => setData({ ...data, about_headline: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Detailed Bio Paragraph</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={4}
            value={data.bio || ''}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Featured Quote</label>
          <textarea
            className={`${inputCls} resize-none`}
            rows={3}
            placeholder="Writing clean backend code isn't just about making it work..."
            value={data.about_quote || ''}
            onChange={(e) => setData({ ...data, about_quote: e.target.value })}
          />
        </div>
      </div>

      {/* ── 5. Social Profiles & Direct Contact ── */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-5">
        <h3 className="text-sm font-semibold text-gold uppercase tracking-wider">
          5. Contact &amp; Social Profiles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Full Name</label>
            <input
              className={inputCls}
              value={data.name || ''}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Professional Title</label>
            <input
              className={inputCls}
              value={data.title || ''}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Email Address</label>
            <input
              className={inputCls}
              value={data.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>Phone Number</label>
            <input
              className={inputCls}
              value={data.phone || ''}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>GitHub URL</label>
            <input
              className={inputCls}
              value={data.github || ''}
              onChange={(e) => setData({ ...data, github: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>LinkedIn URL</label>
            <input
              className={inputCls}
              value={data.linkedin || ''}
              onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            />
          </div>

          <div>
            <label className={labelCls}>LeetCode URL</label>
            <input
              className={inputCls}
              value={data.leetcode || ''}
              onChange={(e) => setData({ ...data, leetcode: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          <Save size={14} /> {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Projects Tab
// ─────────────────────────────────────────────
const emptyProject = {
  title: '', description: '', stack: '', github_url: '', live_url: '',
  start_date: '', end_date: '', featured: false, bullets: '',
};

function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { getProjects().then((r) => setProjects(r.data)).catch(() => {}); }, []);

  const refresh = () => getProjects().then((r) => setProjects(r.data));

  const handleSubmit = async () => {
    const payload = {
      ...form,
      bullets: form.bullets ? form.bullets.split('\n').filter(Boolean) : [],
    };
    try {
      if (editId) {
        await updateProject(editId, payload);
        toast.success('Project updated!');
      } else {
        await createProject(payload);
        toast.success('Project created!');
      }
      setForm(emptyProject);
      setEditId(null);
      setShowForm(false);
      refresh();
    } catch {
      toast.error('Failed to save project.');
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p, bullets: Array.isArray(p.bullets) ? p.bullets.join('\n') : (p.bullets || '') });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); refresh(); toast.success('Deleted!'); }
    catch { toast.error('Delete failed.'); }
  };

  const handleMultipleImagesUpload = async (e, id) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !id) return;
    try {
      await uploadProjectImages(id, files);
      refresh();
      toast.success(`${files.length} screenshot(s) uploaded!`);
    } catch {
      toast.error('Multiple image upload failed.');
    }
  };

  const handleDeleteImage = async (projectId, imageUrl) => {
    try {
      await deleteProjectImage(projectId, imageUrl);
      refresh();
      toast.success('Screenshot removed!');
    } catch {
      toast.error('Failed to delete image.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-cream">Projects & Systems</h2>
          <p className="text-xs font-sans text-cream/40 mt-1">Upload multiple screenshots per project for carousel view.</p>
        </div>
        <button onClick={() => { setForm(emptyProject); setEditId(null); setShowForm(!showForm); }} className={btnPrimary}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111218] border border-white/10 p-6 space-y-4 rounded-2xl">
          <h3 className="font-serif text-lg text-cream">{editId ? 'Edit Project' : 'New Project'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['title', 'Title'], ['github_url', 'GitHub URL'], ['live_url', 'Live URL'], ['start_date', 'Start Date (e.g. 2026-01)'], ['end_date', 'End Date (e.g. 2026-04)']].map(([k, l]) => (
              <div key={k}>
                <label className={labelCls}>{l}</label>
                <input className={inputCls} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <div>
            <label className={labelCls}>Stack (comma-separated)</label>
            <input className={inputCls} value={form.stack || ''} onChange={(e) => setForm({ ...form, stack: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Bullet Points (one per line)</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.bullets || ''} onChange={(e) => setForm({ ...form, bullets: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-cream/70 text-sm font-sans cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Mark as Featured Platform
          </label>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className={btnPrimary}><Save size={12} /> Save Project</button>
            <button onClick={() => { setShowForm(false); setForm(emptyProject); setEditId(null); }} className={btnOutline}><X size={12} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((p) => {
          const imgs = (p.images && p.images.length > 0) ? p.images : (p.image_url ? [p.image_url] : []);
          return (
            <div key={p.id} className="bg-[#111218] border border-white/10 p-5 rounded-2xl flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#090A0E] border border-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {imgs[0]
                    ? <img src={imgs[0]} alt={p.title} className="w-full h-full object-cover" />
                    : <span className="text-gold font-serif font-bold text-xl">{p.title?.[0]}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-sans font-semibold text-cream text-base">{p.title}</p>
                    {p.featured && <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Featured</span>}
                  </div>
                  <p className="text-cream/50 text-xs font-sans mt-1 line-clamp-2">{p.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <label className={btnOutline + ' cursor-pointer text-gold'} title="Upload Multiple Screenshots">
                    <Upload size={13} />
                    <span>Upload Photos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleMultipleImagesUpload(e, p.id)} />
                  </label>
                  <button onClick={() => handleEdit(p)} className={btnOutline}><Edit2 size={13} /></button>
                  <button onClick={() => handleDelete(p.id)} className={btnDanger}><Trash2 size={13} /></button>
                </div>
              </div>

              {/* Multi-image thumbnails strip */}
              {imgs.length > 0 && (
                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-sans font-semibold text-cream/40 uppercase tracking-widest">
                      Screenshots Carousel ({imgs.length} uploaded)
                    </p>
                    <span className="text-[10px] font-sans text-cream/30">Hover image to remove</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {imgs.map((imgUrl, i) => (
                      <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/10 group bg-black/40">
                        <img src={imgUrl} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleDeleteImage(p.id, imgUrl)}
                          className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove this screenshot"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {projects.length === 0 && <p className="text-cream/40 text-sm font-sans">No projects yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Skills Tab
// ─────────────────────────────────────────────
const SKILL_CATEGORIES = ['Programming', 'Backend', 'Frontend', 'DevOps', 'AI', 'Tools', 'Other'];

function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Programming');

  const formatSkills = (data) => (Array.isArray(data) ? data : Object.values(data || {}).flat());

  useEffect(() => { getSkills().then((r) => setSkills(formatSkills(r.data))).catch(() => {}); }, []);

  const refresh = () => getSkills().then((r) => setSkills(formatSkills(r.data)));

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await createSkill({ name: name.trim(), category });
      setName('');
      refresh();
      toast.success('Skill added!');
    } catch {
      toast.error('Failed to add skill.');
    }
  };

  const handleDelete = async (id) => {
    try { await deleteSkill(id); refresh(); } catch { toast.error('Delete failed.'); }
  };

  const grouped = {};
  skills.forEach((s) => { if (!grouped[s.category]) grouped[s.category] = []; grouped[s.category].push(s); });

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-serif text-2xl font-bold text-cream">Skills</h2>

      <div className="flex gap-3">
        <input className={`${inputCls} flex-1`} placeholder="Skill name" value={name} onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
        <select className={inputCls + ' w-44'} value={category} onChange={(e) => setCategory(e.target.value)}>
          {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd} className={btnPrimary}><Plus size={14} /> Add</button>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <p className="text-cream/50 font-sans text-xs letter-wide uppercase tracking-widest mb-3">{cat}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((s) => (
                <span key={s.id} className="flex items-center gap-2 border border-white/20 text-cream text-sm font-sans px-3 py-1.5">
                  {s.name}
                  <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-300 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-cream/40 text-sm font-sans">No skills yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Experience Tab
// ─────────────────────────────────────────────
const emptyExp = {
  company: '', role: '', type: 'Internship', start_date: '', end_date: '',
  currently_working: false, location: '', description: '', responsibilities: '',
};

function ExperienceTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyExp);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { getExperience().then((r) => setItems(r.data)).catch(() => {}); }, []);
  const refresh = () => getExperience().then((r) => setItems(r.data));

  const handleSubmit = async () => {
    const payload = {
      ...form,
      responsibilities: form.responsibilities ? form.responsibilities.split('\n').filter(Boolean) : [],
    };
    try {
      if (editId) { await updateExperience(editId, payload); toast.success('Updated!'); }
      else { await createExperience(payload); toast.success('Created!'); }
      setForm(emptyExp); setEditId(null); setShowForm(false); refresh();
    } catch { toast.error('Save failed.'); }
  };

  const handleEdit = (item) => {
    setForm({ ...item, responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : (item.responsibilities || '') });
    setEditId(item.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await deleteExperience(id); refresh(); toast.success('Deleted!'); } catch { toast.error('Delete failed.'); }
  };

  const handleLetterUpload = async (e, id) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { await uploadExperienceLetter(id, file); refresh(); toast.success('Letter uploaded!'); } catch { toast.error('Upload failed.'); }
  };

  const handleLogoUpload = async (e, id) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { await uploadExperienceLogo(id, file); refresh(); toast.success('Logo uploaded!'); } catch { toast.error('Upload failed.'); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-cream">Experience</h2>
        <button onClick={() => { setForm(emptyExp); setEditId(null); setShowForm(!showForm); }} className={btnPrimary}>
          <Plus size={14} /> Add
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 space-y-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['company', 'Company'], ['role', 'Role'], ['location', 'Location'], ['start_date', 'Start Date'], ['end_date', 'End Date']].map(([k, l]) => (
              <div key={k}>
                <label className={labelCls}>{l}</label>
                <input className={inputCls} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {['Internship', 'Full-time', 'Part-time', 'Freelance', 'Contract'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-cream/70 text-sm font-sans cursor-pointer">
            <input type="checkbox" checked={form.currently_working} onChange={(e) => setForm({ ...form, currently_working: e.target.checked })} />
            Currently Working Here
          </label>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Responsibilities (one per line)</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.responsibilities || ''} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className={btnPrimary}><Save size={12} /> Save</button>
            <button onClick={() => { setShowForm(false); setForm(emptyExp); setEditId(null); }} className={btnOutline}><X size={12} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.logo_url
                    ? <img src={item.logo_url} alt={item.company} className="w-full h-full object-cover" />
                    : <span className="text-cream font-serif font-bold">{item.company?.[0]}</span>}
                </div>
                <div>
                  <p className="font-sans font-semibold text-cream text-sm">{item.role}</p>
                  <p className="text-cream/50 text-xs font-sans">{item.company} · {item.type}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <label className={btnOutline + ' cursor-pointer'} title="Upload Logo">
                  <Upload size={12} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogoUpload(e, item.id)} />
                </label>
                <label className={btnOutline + ' cursor-pointer'} title="Upload Letter">
                  <span className="text-xs">Letter</span>
                  <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => handleLetterUpload(e, item.id)} />
                </label>
                <button onClick={() => handleEdit(item)} className={btnOutline}><Edit2 size={12} /></button>
                <button onClick={() => handleDelete(item.id)} className={btnDanger}><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-cream/40 text-sm font-sans">No experience yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Certifications Tab
// ─────────────────────────────────────────────
const emptyCert = { name: '', issuer: '', issue_date: '', verify_url: '', description: '' };

function CertificationsTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyCert);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { getCertifications().then((r) => setItems(r.data)).catch(() => {}); }, []);
  const refresh = () => getCertifications().then((r) => setItems(r.data));

  const handleSubmit = async () => {
    try {
      if (editId) { await updateCertification(editId, form); toast.success('Updated!'); }
      else { await createCertification(form); toast.success('Created!'); }
      setForm(emptyCert); setEditId(null); setShowForm(false); refresh();
    } catch { toast.error('Save failed.'); }
  };

  const handleEdit = (item) => { setForm({ ...item }); setEditId(item.id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await deleteCertification(id); refresh(); toast.success('Deleted!'); } catch { toast.error('Delete failed.'); }
  };

  const handleBadgeUpload = async (e, id) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { await uploadCertBadge(id, file); refresh(); toast.success('Badge uploaded!'); } catch { toast.error('Upload failed.'); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-cream">Certifications</h2>
        <button onClick={() => { setForm(emptyCert); setEditId(null); setShowForm(!showForm); }} className={btnPrimary}>
          <Plus size={14} /> Add
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 space-y-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['name', 'Certificate Name'], ['issuer', 'Issuer'], ['issue_date', 'Issue Date'], ['verify_url', 'Verify URL']].map(([k, l]) => (
              <div key={k}>
                <label className={labelCls}>{l}</label>
                <input className={inputCls} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={2} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className={btnPrimary}><Save size={12} /> Save</button>
            <button onClick={() => { setShowForm(false); setForm(emptyCert); setEditId(null); }} className={btnOutline}><X size={12} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-4 flex items-center gap-4 rounded">
            <div className="w-12 h-12 rounded bg-navy/50 flex items-center justify-center overflow-hidden flex-shrink-0">
              {item.badge_url
                ? <img src={item.badge_url} alt={item.name} className="w-full h-full object-cover" />
                : <span className="text-gold font-serif font-bold">{item.issuer?.[0]}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans font-semibold text-cream text-sm">{item.name}</p>
              <p className="text-cream/50 text-xs font-sans">{item.issuer}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <label className={btnOutline + ' cursor-pointer'}>
                <Upload size={12} />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleBadgeUpload(e, item.id)} />
              </label>
              <button onClick={() => handleEdit(item)} className={btnOutline}><Edit2 size={12} /></button>
              <button onClick={() => handleDelete(item.id)} className={btnDanger}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-cream/40 text-sm font-sans">No certifications yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Achievements Tab
// ─────────────────────────────────────────────
const emptyAch = { title: '', description: '', date: '', category: '' };

function AchievementsTab() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyAch);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { getAchievements().then((r) => setItems(r.data)).catch(() => {}); }, []);
  const refresh = () => getAchievements().then((r) => setItems(r.data));

  const handleSubmit = async () => {
    try {
      if (editId) { await updateAchievement(editId, form); toast.success('Updated!'); }
      else { await createAchievement(form); toast.success('Created!'); }
      setForm(emptyAch); setEditId(null); setShowForm(false); refresh();
    } catch { toast.error('Save failed.'); }
  };

  const handleEdit = (item) => { setForm({ ...item }); setEditId(item.id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await deleteAchievement(id); refresh(); toast.success('Deleted!'); } catch { toast.error('Delete failed.'); }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-cream">Achievements</h2>
        <button onClick={() => { setForm(emptyAch); setEditId(null); setShowForm(!showForm); }} className={btnPrimary}>
          <Plus size={14} /> Add
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 space-y-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['title', 'Title'], ['category', 'Category'], ['date', 'Date (YYYY-MM-DD)']].map(([k, l]) => (
              <div key={k}>
                <label className={labelCls}>{l}</label>
                <input className={inputCls} value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
              </div>
            ))}
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSubmit} className={btnPrimary}><Save size={12} /> Save</button>
            <button onClick={() => { setShowForm(false); setForm(emptyAch); setEditId(null); }} className={btnOutline}><X size={12} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-4 flex items-start justify-between gap-4 rounded">
            <div>
              <p className="font-sans font-semibold text-cream text-sm">{item.title}</p>
              <p className="text-cream/50 text-xs font-sans">{item.category} · {item.date}</p>
              {item.description && <p className="text-cream/40 text-xs font-sans mt-1">{item.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} className={btnOutline}><Edit2 size={12} /></button>
              <button onClick={() => handleDelete(item.id)} className={btnDanger}><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-cream/40 text-sm font-sans">No achievements yet.</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Loader
// ─────────────────────────────────────────────
function Loader() {
  return (
    <div className="flex items-center gap-3 py-10">
      <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
      <span className="text-cream/50 text-sm font-sans">Loading…</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Admin Dashboard
// ─────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
    toast.success('Logged out.');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'projects': return <ProjectsTab />;
      case 'skills': return <SkillsTab />;
      case 'experience': return <ExperienceTab />;
      case 'certifications': return <CertificationsTab />;
      case 'achievements': return <AchievementsTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-cream flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#0B0C10] border-r border-white/[0.08] flex flex-col hidden md:flex">
        <div className="px-6 py-6 border-b border-white/[0.08]">
          <span className="font-serif text-2xl font-bold tracking-widest gold-gradient-text">RC</span>
          <p className="text-cream/40 text-xs font-sans mt-1">Portfolio CMS Panel</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-sans rounded-xl transition-all text-left uppercase tracking-wider
                ${activeTab === key ? 'bg-gold/15 text-gold font-bold border border-gold/30 shadow-sm' : 'text-cream/50 hover:text-cream hover:bg-white/[0.03]'}`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/[0.08] p-4">
          <a
            href="/"
            className="w-full flex items-center gap-3 text-cream/40 hover:text-cream transition-colors px-3 py-2 text-xs font-sans mb-1"
          >
            ← View Portfolio
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors px-3 py-2 text-xs font-sans rounded-lg hover:bg-red-500/10">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0B0C10] border-b border-white/10 flex items-center justify-between px-4 py-3">
        <span className="font-serif text-xl font-bold gold-gradient-text">RC Admin</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-cream">
          {sidebarOpen ? <X size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-[#0D0E14] border-b border-white/10 py-3 px-4 space-y-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { setActiveTab(key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-sans uppercase tracking-wider rounded-lg text-left
                ${activeTab === key ? 'bg-gold/20 text-gold font-bold' : 'text-cream/50'}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
          <a href="/" className="w-full flex items-center gap-3 text-cream/50 px-4 py-2.5 text-xs font-sans">
            ← View Portfolio
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-400 px-4 py-2.5 text-xs font-sans">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#08080A]">
        <div className="p-6 md:p-12 max-w-5xl mx-auto mt-12 md:mt-0">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

