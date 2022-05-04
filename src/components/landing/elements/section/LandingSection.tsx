import { CSSProperties, FC, useEffect } from 'react';
import { useLandingSectionStyles } from './styles';
import { Box } from '@mui/system';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Curve } from '../curve/Curve';

const squareVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};

type Props = {
  backgroundColor: string;
  textColor?: string;
  styles?: object;
  className: string;
  disableAnimation?: boolean;
  curveColor?: string;
};

export const LandingSection: FC<Props> = ({
  curveColor,
  disableAnimation,
  className,
  styles = {},
  backgroundColor,
  children,
  textColor,
}) => {
  const classes = useLandingSectionStyles();
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const boxStyles = { background: backgroundColor, color: textColor || '#fff', ...styles } as CSSProperties;

  useEffect(() => {
    if (inView && !disableAnimation) {
      controls.start('visible');
    }
  }, [controls, inView]);

  if (disableAnimation) {
    return (
      // @ts-ignore
      <Box style={boxStyles} className={[className, classes.container]}>
        <>
          {/*{curveColor && <Curve fill={curveColor} />}*/}
          {children}
        </>
      </Box>
    );
  }

  return (
    <div>
      {/*// @ts-ignore*/}
      <Box style={boxStyles} className={[className, classes.container]}>
        <motion.div ref={ref} animate={controls} initial="hidden" variants={squareVariants}>
          {children}
        </motion.div>
        {/*{curveColor && <Curve fill={curveColor} />}*/}
      </Box>
    </div>
  );
};
