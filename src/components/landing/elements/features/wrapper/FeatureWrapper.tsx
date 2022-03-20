import { makeStyles } from '@mui/styles';
import Image from 'next/image';

const useFeatureWrapperStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    ['@media (max-width:992px)']: {
      flexDirection: 'column',
    },
  },
  image: {
    borderRadius: 15,
    ['@media (max-width:992px)']: {
      width: '40vw',
    },
    ['@media (max-width:768px)']: {
      width: '80vw',
    },
  },
  textWrapper: {
    width: '40%',
    ['@media (max-width:992px)']: {
      width: '80%',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
});

type Props = {
  title: string;
  subtitle: string;
  image: string;
  revert?: boolean;
};

export const FeatureWrapper = ({ image, subtitle, title, revert }: Props) => {
  const classes = useFeatureWrapperStyles();

  if (revert) {
    return (
      <div className={classes.container}>
        <div className={classes.textWrapper}>
          <p className={classes.title}>{title}</p>
          <p className={classes.subtitle}>{subtitle}</p>
        </div>

        <div>
          <img className={classes.image} src={image} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div>
        <img className={classes.image} src={image} />
      </div>

      <div className={classes.textWrapper}>
        <p className={classes.title}>{title}</p>
        <p className={classes.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};
