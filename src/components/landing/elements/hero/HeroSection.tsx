import { Curve } from '../curve/Curve';
import { LandingSection } from '../section/LandingSection';
import { Row } from '../../../common/utilities/row/Row';
import { makeStyles } from '@mui/styles';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { ROW_DIRECTION } from '../../../../common/constants/enums';

const useHeroSectionStyles = makeStyles({
  image: {
    width: '40%',
    height: '40%',
    ['@media (max-width:768px)']: {
      width: '80%',
      height: '80%',
    },
  },
  landingSection: {
    padding: '100px 10vw',
    ['@media (max-width:768px)']: {
      padding: '100px 3vw !important',
    },
  },
  container: {
    flexDirection: 'column',
  },
  textContent: {
    width: '50%',
    ['@media (max-width:768px)']: {
      width: '100%',
      textAlign: 'center',
    },
  },
});

export const HeroSection = () => {
  const classes = useHeroSectionStyles();
  const isMobile = useIsMobile();

  return (
    <LandingSection
      styles={{
        alignItems: 'flex-start',
      }}
      className={classes.landingSection}
      backgroundColor={'white'}
      textColor={'black'}
    >
      <Row alignVerticalCenter fullWidth direction={isMobile ? ROW_DIRECTION.COLUMN : ROW_DIRECTION.ROW}>
        <div className={classes.textContent}>
          <h1>Always stay on track.</h1>
          <p>The simplest todo and notes application.</p>
          <p>We kept it simple for you.</p>
        </div>
        <img className={classes.image} src={'https://miro.medium.com/max/1400/1*8ygFKYb0Yo6Hc-vnScGA9A.png'} />
      </Row>
      <Curve fill={'#fafafa'} />
    </LandingSection>
  );
};
