import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Life from '@/pages/Life';
import Departments from '@/pages/Departments';
import Careers from '@/pages/Careers';
import JobDetail from '@/pages/JobDetail';
import Learning from '@/pages/Learning';
import Stories from '@/pages/Stories';
import Events from '@/pages/Events';
import Leadership from '@/pages/Leadership';
import Benefits from '@/pages/Benefits';
import Growth from '@/pages/Growth';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/login');

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/life" element={<Life />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetail />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
