import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Stack from "./pages/Stack";
import Music from "./pages/Music";
import SiteLayout from "./components/SiteLayout";
import { currentSub, isAbsolute, projectsHref } from "@/lib/site";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

/* the old /projects address hands over to the subdomain when there is one */
const ProjectsMoved = () => {
  const href = projectsHref();
  if (isAbsolute(href)) {
    window.location.replace(href);
    return null;
  }
  return <Projects />;
};

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {currentSub() === "projects" ? (
            /* projects.mrevds.online: the projects page is the whole site */
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Projects />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/stack" element={<Stack />} />
                <Route path="/projects" element={<ProjectsMoved />} />
                <Route path="/music" element={<Music />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
