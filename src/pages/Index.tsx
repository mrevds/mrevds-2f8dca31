
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-emerald-50/20">
      <Navigation />
      <main className="ml-0 lg:ml-24">
        <div className="px-4 sm:px-6 lg:px-12 space-y-16 lg:space-y-20">
          <Header />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
