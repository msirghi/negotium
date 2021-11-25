import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { AccountInfo } from '../../../../../../common/types/account.types';
import { Avatar, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../utilities/row/Row';
import colors from '../../../../../../common/styles/colors';

const useStyles = makeStyles({
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  sectionBody: {
    marginTop: 10,
  },
  photoContent: {
    marginLeft: 10,
  },
  photoHelperText: {
    color: colors.greys['500'],
    fontSize: 12,
    marginTop: 5,
  },
});

export const AccountSettings = () => {
  const accountInfo: AccountInfo = useSelector(
    (state: RootState) => state.account.info
  );
  const classes = useStyles();

  return (
    <Box>
      <div>
        <Box className={classes.sectionTitle}>Photo</Box>
        <Box className={classes.sectionBody}>
          <Row alignVerticalCenter>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
              {accountInfo.name[0]}
            </Avatar>
            <Box className={classes.photoContent}>
              <Button size={'small'} variant={'outlined'}>
                Upload photo
              </Button>
              <Box className={classes.photoHelperText}>
                Pick a photo up to 4MB.
              </Box>
            </Box>
          </Row>
        </Box>

        <Box className={classes.sectionTitle}>Name</Box>
        <Box className={classes.sectionBody}>
          <TextField
            size={'small'}
            placeholder={'Name'}
            value={accountInfo.name}
          />
        </Box>

        <Box className={classes.sectionTitle}>Email</Box>
        <Box className={classes.sectionBody}>
          <Box>
            <span>{accountInfo.email}</span>
          </Box>
          <Button size={'small'} variant={'outlined'} sx={{ marginTop: 1 }}>
            Change email
          </Button>
        </Box>

        <Box className={classes.sectionTitle}>Password</Box>
        <Box className={classes.sectionBody}>
          <Button size={'small'} variant={'outlined'} sx={{ marginTop: 1 }}>
            Change Password
          </Button>
        </Box>
      </div>
    </Box>
  );
};
