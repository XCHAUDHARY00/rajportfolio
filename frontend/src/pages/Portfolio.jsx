import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Achievements from '../sections/Achievements';
import Certifications from '../sections/Certifications';
import Contact from '../sections/Contact';
import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getCertifications,
  getAchievements,
} from '../api/portfolio';

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, pr, sk, ex, ce, ac] = await Promise.allSettled([
          getProfile(),
          getProjects(),
          getSkills(),
          getExperience(),
          getCertifications(),
          getAchievements(),
        ]);
        if (p.status === 'fulfilled') setProfile(p.value.data);
        if (pr.status === 'fulfilled') setProjects(pr.value.data);
        if (sk.status === 'fulfilled') setSkills(sk.value.data);
        if (ex.status === 'fulfilled') setExperience(ex.value.data);
        if (ce.status === 'fulfilled') setCertifications(ce.value.data);
        if (ac.status === 'fulfilled') setAchievements(ac.value.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1A18] selection:bg-[#E6DFC5] selection:text-[#1C1A18]">
      <Navbar profile={profile} />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="text-center">
            <div className="w-9 h-9 border-2 border-[#1C1A18] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <span className="font-semibold text-lg tracking-wider text-[#1C1A18] block mb-1">RC</span>
            <p className="text-[#8C877D] text-xs tracking-wider uppercase">Loading systems…</p>
          </div>
        </div>
      ) : (
        <main>
          <Hero profile={profile} />
          <About profile={profile} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Skills skills={skills} />
          <Certifications certifications={certifications} />
          <Achievements achievements={achievements} />
          <Contact profile={profile} />
          <Footer />
        </main>
      )}
    </div>
  );
}
