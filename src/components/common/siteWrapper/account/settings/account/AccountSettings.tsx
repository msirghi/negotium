import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { AccountInfo } from '../../../../../../common/types/account.types';
import { Avatar, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../../utilities/row/Row';
import colors from '../../../../../../common/styles/colors';
import { useCommonStyles } from '../../styles';
import { useTranslation } from 'next-i18next';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { useState } from 'react';
import { If } from '../../../../utilities/if/If';
import AccountService from '../../../../../../services/AccountService';
import { LoadingButton } from '@mui/lab';
import { setUserName } from '../../../../../../redux/account/accountSlice';

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
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { t } = useTranslation('settings');
  const [isSubmitting, setSubmitting] = useState(false);

  const [name, setName] = useState(accountInfo.name);

  const onNameChange = (e: { target: { value: string } }) => {
    setName(e.target.value);
  };

  const updateName = async () => {
    setSubmitting(true);
    const response = await AccountService.updateUserName(name);
    dispatch(setUserName(name));
    setSubmitting(false);
  };

  const onCancelNameClick = () => {
    setName(accountInfo.name);
  }

  return (
    <Box>
      <div>
        <Box className={commonClasses.sectionTitle}>{t('photo.title')}</Box>
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

        <Box className={commonClasses.sectionTitle}>{t('name')}</Box>
        <Box className={commonClasses.sectionBody}>
          <TextField
            id={'name-field'}
            size={'small'}
            placeholder={t('name')}
            inputProps={{'data-testid': 'name-field'}}
            value={name}
            onChange={onNameChange}
            fullWidth={isMobile}
          />
          <If condition={accountInfo.name !== name}>
            <LoadingButton data-testid={'name-save-button'} color={'primary'} loading={isSubmitting} onClick={updateName}>
              {t('save')}
            </LoadingButton>
            <Button data-testid={'name-cancel-button'} disabled={isSubmitting} onClick={onCancelNameClick}>
              {t('cancel')}
            </Button>
          </If>
        </Box>

        <Box className={commonClasses.sectionTitle}>{t('email')}</Box>
        <Box className={commonClasses.sectionBody}>
          <Box>
            <span>{accountInfo.email}</span>
          </Box>
          <Button
            size={'small'}
            variant={'outlined'}
            sx={{ marginTop: 1 }}
            fullWidth={isMobile}
          >
            {t('changeEmail')}
          </Button>
        </Box>

        <Box className={commonClasses.sectionTitle}>{t('password')}</Box>
        <Box className={commonClasses.sectionBody}>
          <Button
            size={'small'}
            variant={'outlined'}
            sx={{ marginTop: 1 }}
            fullWidth={isMobile}
          >
            {t('changePassword')}
          </Button>
        </Box>
      </div>
    </Box>
  );
};
