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
import type { ReactNode } from "react";
import { currentSub, isAbsolute, pageHref, SUBS, type Sub } from "@/lib/site";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/context/LanguageContext";

const queryClient = new QueryClient();

/* the old /stack, /projects and /music paths hand over to their subdomain when there is one */
const Moved = ({ sub, children }: { sub: Sub; children: ReactNode }) => {
  const href = pageHref(sub);
  if (isAbsolute(href)) {
    window.location.replace(href);
    return null;
  }
  return <>{children}</>;
};

const subPages: Record<Sub, ReactNode> = {
  stack: <Stack />,
  projects: <Projects />,
  music: <Music />,
};

const App = () => {
  const current = currentSub();
  const sub = SUBS.find((name) => name === current);
  return (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {sub ? (
            /* stack. / projects. / music.mrevds.online: that page is the whole site */
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={subPages[sub]} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                {SUBS.map((name) => (
                  <Route key={name} path={`/${name}`} element={<Moved sub={name}>{subPages[name]}</Moved>} />
                ))}
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
};

export default App;
