import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../sections/Hero';
import AbilityCardModal from '../components/AbilityCardModal';
import CertificatesModal from '../sections/CertificatesModal';
import SkillsModal from '../sections/SkillsModal';
import Skills from '../sections/Skills';
import Certifications from '../sections/Certifications';
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

  const navigate = useNavigate();
  const location = useLocation();

  // ── URL-Synced Dynamic Route States ──
  // Keeps browser history intact so browser back button closes modal without leaving the website
  const isSkillsOpen = location.pathname === '/skills';
  const isCertificatesOpen = location.pathname === '/certificates';
  const isAbilityCardOpen = location.pathname === '/ability';

  // Extract category from URL: /projects/:categoryId or /category/:categoryId
  const insideDoorCategory = location.pathname.startsWith('/projects/')
    ? location.pathname.replace('/projects/', '').trim()
    : location.pathname.startsWith('/category/')
    ? location.pathname.replace('/category/', '').trim()
    : null;

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
    navigate(`/projects/${categoryId}`);
    setTimeout(() => {
      const doorsEl = document.querySelector('#doors') || document.querySelector('#category-projects');
      if (doorsEl) {
        doorsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleBackToDoors = () => {
    navigate('/');
    setTimeout(() => {
      const doorsEl = document.querySelector('#doors');
      if (doorsEl) {
        doorsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleOpenSkills = () => {
    const el = document.querySelector('#skills');
    if (el && !insideDoorCategory) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/skills');
    }
  };
  const handleOpenSkillsModal = () => navigate('/skills');
  const handleCloseSkills = () => navigate('/');

  const handleOpenCertificates = () => {
    const el = document.querySelector('#certificates');
    if (el && !insideDoorCategory) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/certificates');
    }
  };
  const handleOpenCertificatesModal = () => navigate('/certificates');
  const handleCloseCertificates = () => navigate('/');

  const handleOpenAbilityCard = () => navigate('/ability');
  const handleCloseAbilityCard = () => navigate('/');

  return (
    <div className="min-h-screen bg-[#EFECE6] dark:bg-[#121212] text-[#1C1A18] dark:text-[#FAF7F2] transition-colors selection:bg-[#DDA74F] selection:text-[#121212]">
      {/* ── Fixed Header with Live Clock & Pull-Cord Light Switch ── */}
      <Header
        profile={profile}
        onSelectDoorCategory={handleEnterCategory}
        onOpenCertificates={handleOpenCertificates}
        onOpenSkills={handleOpenSkills}
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
            onOpenAbilityCard={handleOpenAbilityCard}
          />

          {/* ── 2. "Magic happens behind the doors" ── */}
          {insideDoorCategory ? (
            <ProjectCategoryView
              projects={projects}
              activeCategoryId={insideDoorCategory}
              onSelectCategory={(id) => navigate(`/projects/${id}`)}
              onBackToDoors={handleBackToDoors}
            />
          ) : (
            <>
              <DoorsSection
                profile={profile}
                projects={projects}
                onEnterCategory={handleEnterCategory}
              />

              {/* ── 3. Skills Section (Single Page Application Flow) ── */}
              <Skills
                skills={skills}
                onOpenFullSkills={handleOpenSkillsModal}
              />

              {/* ── 4. Verified Certifications & Credentials Section ── */}
              <Certifications
                certifications={certifications}
                onOpenFullCertificates={handleOpenCertificatesModal}
              />
            </>
          )}

          {/* ── 5. "My story / Let's go back in time" (Timeline Dial) ── */}
          <StoryTimeline
            experience={experience}
            certifications={certifications}
            achievements={achievements}
            profile={profile || {}}
          />

          {/* ── 6. Bottom Call to Action, Contact Form & Footer ── */}
          <ContactSection profile={profile} />

          {/* ── 3D Holographic Ability Card Modal ── */}
          <AbilityCardModal
            isOpen={isAbilityCardOpen}
            onClose={handleCloseAbilityCard}
            profile={profile}
          />

          {/* ── Dedicated 3D Certificates & Achievements Modal ── */}
          <CertificatesModal
            isOpen={isCertificatesOpen}
            onClose={handleCloseCertificates}
            certifications={certifications}
            achievements={achievements}
            profile={profile || {}}
          />

          {/* ── Dedicated Skills & Technologies Modal ── */}
          <SkillsModal
            isOpen={isSkillsOpen}
            onClose={handleCloseSkills}
            skills={skills}
          />
        </main>
    </div>
  );
}
