import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/Public/PublicLayout';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Platform from './pages/public/Platform';
import HowItWorks from './pages/public/HowItWorks';
import Pricing from './pages/public/Pricing';
import Executives from './pages/public/Executives';
import Careers from './pages/public/Careers';
import Newsroom from './pages/public/Newsroom';
import NewsArticle from './pages/public/NewsArticle';
import CompanyTimeline from './pages/public/CompanyTimeline';
import CaseStudies from './pages/public/CaseStudies';
import Security from './pages/public/Security';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Onboarding from './pages/public/Onboarding';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Simulation from './pages/Simulation';
import Agent from './pages/Agent';
import Charts from './pages/Charts';
import Email from './pages/Email';
import Insights from './pages/Insights';
import NewsFeed from './pages/NewsFeed';
import Events from './pages/Events';
import SupplyTree from './pages/SupplyTree';
import ERP from './pages/ERP';
import Settings from './pages/Settings';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/chainmind">
                <Routes>
                    {/* Public marketing site */}
                    <Route element={<PublicLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="platform" element={<Platform />} />
                        <Route path="how-it-works" element={<HowItWorks />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="executives" element={<Executives />} />
                        <Route path="careers" element={<Careers />} />
                        <Route path="newsroom" element={<Newsroom />} />
                        <Route path="newsroom/:slug" element={<NewsArticle />} />
                        <Route path="timeline" element={<CompanyTimeline />} />
                        <Route path="case-studies" element={<CaseStudies />} />
                        <Route path="security" element={<Security />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="login" element={<Login />} />
                        <Route path="onboarding" element={<Onboarding />} />
                    </Route>
                    {/* Authenticated app */}
                    <Route path="/app" element={<AppLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="suppliers" element={<Suppliers />} />
                        <Route path="supply-tree" element={<SupplyTree />} />
                        <Route path="events" element={<Events />} />
                        <Route path="simulation" element={<Simulation />} />
                        <Route path="agent" element={<Agent />} />
                        <Route path="charts" element={<Charts />} />
                        <Route path="email" element={<Email />} />
                        <Route path="insights" element={<Insights />} />
                        <Route path="news-feed" element={<NewsFeed />} />
                        <Route path="erp" element={<ERP />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
