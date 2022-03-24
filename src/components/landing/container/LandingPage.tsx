import { HeroSection } from '../elements/hero/HeroSection';
import { FeaturesSection } from '../elements/features/FeaturesSection';
import { StartSection } from '../elements/start/StartSection';
import { LandingHeader } from '../elements/header/LandingHeader';
import { LandingFooter } from '../elements/footer/LandingFooter';

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#202731' }}>
      <LandingHeader>
        <>
          <HeroSection />
          <FeaturesSection />
          <StartSection />
          <LandingFooter />
        </>
      </LandingHeader>
    </div>
  );
};

export default LandingPage;
