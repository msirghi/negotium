import { makeStyles } from '@mui/styles';

export const authStyles = {
  mobile: {
    container: {
      height: '100vh',
    },
    contentContainer: {
      width: '100%',
      height: '100%',
    },
    formContainer: {
      height: '100vh',
      my: 0,
    },
  },
  desktop: {
    container: {
      height: '20vh',
    },
    contentContainer: {
      width: '75%',
      height: '55%',
    },
    formContainer: {
      height: '75vh',
    },
  },
};

export const useAuthStyles = makeStyles({
  container: {
    background: 'linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%)',
    height: '100vh',
  },
  contentBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGridItem: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1589988279835-9c3a838716ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NzY5MDUyNA&ixlib=rb-1.2.1&q=80&w=1080)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  formGridItem: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenBox: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }
});
