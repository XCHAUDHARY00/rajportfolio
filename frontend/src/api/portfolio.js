import { api } from './client';

// ---------- Profile ----------
export const getProfile = () => api.get('/api/profile');
export const updateProfile = (data) => api.put('/api/profile', data);
export const uploadProfilePhoto = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/api/profile/photo', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const uploadResume = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/api/profile/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// ---------- Projects ----------
export const getProjects = () => api.get('/api/projects');
export const createProject = (data) => api.post('/api/projects', data);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);
export const uploadProjectImage = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post(`/api/projects/${id}/image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const uploadProjectImages = (id, files) => {
  const fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append('files', files[i]);
  }
  return api.post(`/api/projects/${id}/images`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const deleteProjectImage = (id, imageUrl) => {
  return api.delete(`/api/projects/${id}/images`, { params: { image_url: imageUrl } });
};

// ---------- Skills ----------
export const getSkills = () => api.get('/api/skills');
export const createSkill = (data) => api.post('/api/skills', data);
export const deleteSkill = (id) => api.delete(`/api/skills/${id}`);

// ---------- Experience ----------
export const getExperience = () => api.get('/api/experience');
export const createExperience = (data) => api.post('/api/experience', data);
export const updateExperience = (id, data) => api.put(`/api/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/api/experience/${id}`);
export const uploadExperienceLetter = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post(`/api/experience/${id}/letter`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const uploadExperienceLogo = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post(`/api/experience/${id}/logo`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// ---------- Certifications ----------
export const getCertifications = () => api.get('/api/certifications');
export const createCertification = (data) => api.post('/api/certifications', data);
export const updateCertification = (id, data) => api.put(`/api/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/api/certifications/${id}`);
export const uploadCertBadge = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post(`/api/certifications/${id}/badge`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// ---------- Achievements ----------
export const getAchievements = () => api.get('/api/achievements');
export const createAchievement = (data) => api.post('/api/achievements', data);
export const updateAchievement = (id, data) => api.put(`/api/achievements/${id}`, data);
export const deleteAchievement = (id) => api.delete(`/api/achievements/${id}`);

// ---------- Contact ----------
export const sendContact = (data) => api.post('/api/contact', data);

// ---------- Auth ----------
export const loginAdmin = (username, password) => api.post('/api/auth/login', { username, password });


