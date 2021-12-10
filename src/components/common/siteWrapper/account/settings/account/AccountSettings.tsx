import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { AccountInfo } from '../../../../../../common/types/account.types';
import { Avatar, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../utilities/row/Row';
import colors from '../../../../../../common/styles/colors';
import { useCommonStyles } from '../../styles';
import { useTranslation } from 'next-i18next';
import {useIsMobile} from "../../../../../../common/hooks/common/useIsMobile";

const useStyles = makeStyles({
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
  const isMobile = useIsMobile();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { t } = useTranslation('settings');

  return (
    <Box>
      <div>
        <Box className={commonClasses.sectionTitle}>Photo</Box>
        <Box className={commonClasses.sectionBody}>
          <Row alignVerticalCenter>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
              {accountInfo.name[0]}
            </Avatar>
            <Box className={classes.photoContent}>
              <Button size={'small'} variant={'outlined'}>
                {t('photo.upload')}
              </Button>
              <Box className={classes.photoHelperText}>
                {t('photo.helperText')}
              </Box>
            </Box>
          </Row>
        </Box>

        <Box className={commonClasses.sectionTitle}>Name</Box>
        <Box className={commonClasses.sectionBody}>
          <TextField
            id={'name-field'}
            size={'small'}
            placeholder={'Name'}
            value={accountInfo.name}
            fullWidth={isMobile}
          />
        </Box>

        <Box className={commonClasses.sectionTitle}>Email</Box>
        <Box className={commonClasses.sectionBody}>
          <Box>
            <span>{accountInfo.email}</span>
          </Box>
          <Button size={'small'} variant={'outlined'} sx={{ marginTop: 1 }} fullWidth={isMobile}>
            Change email
          </Button>
        </Box>

        <Box className={commonClasses.sectionTitle}>Password</Box>
        <Box className={commonClasses.sectionBody}>
          <Button size={'small'} variant={'outlined'} sx={{ marginTop: 1 }} fullWidth={isMobile}>
            Change Password
          </Button>
        </Box>
      </div>
    </Box>
  );
};
