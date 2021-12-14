import { ThemeItem } from './item/ThemeItem';
import { siteThemes } from '../../../../../../common/constants/constants';
import { Grid } from '@mui/material';
import { useThemeSettingsStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { setSiteTheme } from '../../../../../../redux/account/accountSlice';
import AccountService from '../../../../../../services/AccountService';

export const ThemeSettings = () => {
  const classes = useThemeSettingsStyles();
  const siteTheme = useSelector(
    (state: RootState) => state.account.metadata.theme
  );
  const dispatch = useDispatch();

  const onThemeChange = async (theme: string) => {
    if (siteTheme !== theme) {
      dispatch(setSiteTheme(theme));
      await AccountService.updateUserTheme(theme);
    }
  };

  return (
    <div>
      <div className={classes.title}>
        Choose a theme that matches your preference.
      </div>
      <Grid container spacing={3}>
        {siteThemes.map((theme) => (
          <Grid key={theme.color} item>
            <ThemeItem
              theme={theme}
              selected={siteTheme === theme.internalKey}
              onClick={onThemeChange}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
