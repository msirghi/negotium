import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

type Props = {
  sx: object;
};

export const Copyright = (props: Props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Negotium
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
