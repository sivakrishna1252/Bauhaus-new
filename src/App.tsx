import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import ModularKitchens from "./pages/ModularKitchens";
import Bathrooms from "./pages/Bathrooms";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CommercialProjects from "./pages/CommercialProjects";
import ResidentialProjects from "./pages/ResidentialProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Careers from "./pages/Careers";

const queryClient = new QueryClient();

// Component to handle redirecting to home on refresh/initial load
const HomeRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // On the very first render (refresh), if path is not home, redirect to home
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }

    // Ensure we are at the top of the page on refresh
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this only runs once on mount

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HomeRedirect />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          {/* <Route path="/modular-kitchens" element={<ModularKitchens />} /> */}
          <Route path="/bathrooms" element={<Bathrooms />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/commercial" element={<CommercialProjects />} />
          <Route path="/projects/residential" element={<ResidentialProjects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
