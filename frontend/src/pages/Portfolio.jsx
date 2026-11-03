import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../sections/Hero';
import AbilityCardModal from '../components/AbilityCardModal';
import CertificatesModal from '../sections/CertificatesModal';
import DoorsSection from '../sections/DoorsSection';
import ProjectCategoryView from '../sections/ProjectCategoryView';
import StoryTimeline from '../sections/StoryTimeline';
import ContactSection from '../sections/ContactSection';
import LoadingScreen from '../components/LoadingScreen';
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

  // 3D Ability Card Modal State
  const [isAbilityCardOpen, setIsAbilityCardOpen] = useState(false);

  // Certificates & Achievements Modal State
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);

  // Door view mode: null = 4 Doors overview, 'backend' | 'systems' | 'cloud' | 'fullstack' = Inside Door Project View
  const [insideDoorCategory, setInsideDoorCategory] = useState(null);

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

  const handleEnterCategory = (categoryId) => {
    setInsideDoorCategory(categoryId);
    setTimeout(() => {
      const doorsEl = document.querySelector('#doors') || document.querySelector('#category-projects');
      if (doorsEl) {
        doorsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleBackToDoors = () => {
    setInsideDoorCategory(null);
    setTimeout(() => {
      const doorsEl = document.querySelector('#doors');
      if (doorsEl) {
        doorsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#EFECE6] dark:bg-[#121212] text-[#1C1A18] dark:text-[#FAF7F2] transition-colors selection:bg-[#DDA74F] selection:text-[#121212]">
      {/* ── Fixed Header with Live Clock & Pull-Cord Light Switch ── */}
      <Header
        profile={profile}
        onSelectDoorCategory={handleEnterCategory}
        onOpenCertificates={() => setIsCertificatesOpen(true)}
        onOpenSkills={() => setIsAbilityCardOpen(true)}
        isInsideDoorCategory={Boolean(insideDoorCategory)}
        onBackToDoors={handleBackToDoors}
      />

      {/* ── 3D Colorful Ambient Loading Screen ── */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <main>
          {/* ── 1. Hero Section with 3D Spiral Notebook & Portrait ── */}
          <Hero
            profile={profile}
            onOpenAbilityCard={() => setIsAbilityCardOpen(true)}
          />

          {/* ── 2. "Magic happens behind the doors" ── */}
          {insideDoorCategory ? (
            <ProjectCategoryView
              projects={projects}
              activeCategoryId={insideDoorCategory}
              onSelectCategory={(id) => setInsideDoorCategory(id)}
              onBackToDoors={handleBackToDoors}
            />
          ) : (
            <DoorsSection
              profile={profile}
              projects={projects}
              onEnterCategory={handleEnterCategory}
            />
          )}

          {/* ── 3. "My story / Let's go back in time" (Timeline Dial) ── */}
          <StoryTimeline
            experience={experience}
            certifications={certifications}
            achievements={achievements}
            profile={profile || {}}
          />

          {/* ── 4. Bottom Call to Action, Contact Form & Footer ── */}
          <ContactSection profile={profile} />

          {/* ── 3D Holographic Ability Card Modal ── */}
          <AbilityCardModal
            isOpen={isAbilityCardOpen}
            onClose={() => setIsAbilityCardOpen(false)}
            profile={profile}
          />

          {/* ── Dedicated 3D Certificates & Achievements Modal ── */}
          <CertificatesModal
            isOpen={isCertificatesOpen}
            onClose={() => setIsCertificatesOpen(false)}
            certifications={certifications}
            achievements={achievements}
            profile={profile || {}}
          />
        </main>
    </div>
  );
}
