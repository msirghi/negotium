import { HeroSection } from '../elements/hero/HeroSection';
import { FeaturesSection } from '../elements/features/FeaturesSection';
import { StartSection } from '../elements/start/StartSection';
import { LandingHeader } from '../elements/header/LandingHeader';

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#202731' }}>
      <LandingHeader>
        <HeroSection />
        <FeaturesSection />
        <StartSection />
      </LandingHeader>
    </div>
  );
};

export default LandingPage;
