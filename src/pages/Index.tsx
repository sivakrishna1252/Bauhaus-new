import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { BrandPartners } from '@/components/sections/BrandPartners';
import { TermsSection } from '@/components/sections/TermsSection'; // Imported
import { ContactPopup } from '@/components/ui/ContactPopup'; // Imported
import Faq from '@/components/sections/Faq';


const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Faq />

      <TermsSection />
      <BrandPartners />

      <ContactPopup />
    </Layout>
  );
};

export default Index;
