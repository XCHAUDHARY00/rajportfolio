import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1D1D1F', color: '#FFFFFF', borderRadius: '12px' },
        }} />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/skills" element={<Portfolio />} />
          <Route path="/certificates" element={<Portfolio />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/projects/:categoryId" element={<Portfolio />} />
          <Route path="/category/:categoryId" element={<Portfolio />} />
          <Route path="/ability" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
