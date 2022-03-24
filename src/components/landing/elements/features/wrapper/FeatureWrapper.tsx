import { useFeatureWrapperStyles } from './styles';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  revert?: boolean;
  imageStyles?: object;
};

export const FeatureWrapper = ({ image, subtitle, title, revert, imageStyles = {} }: Props) => {
  const classes = useFeatureWrapperStyles();

  if (revert) {
    return (
      <div className={classes.container}>
        <div className={classes.textWrapper}>
          <p className={classes.title}>{title}</p>
          <p className={classes.subtitle}>{subtitle}</p>
        </div>

        <img className={classes.image} style={{ ...imageStyles }} src={image} />
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
