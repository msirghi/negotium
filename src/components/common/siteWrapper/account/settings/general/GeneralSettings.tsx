import { makeStyles } from '@mui/styles';
import { Divider, MenuItem, TextField } from '@mui/material';
import {
  HOME_VIEW_LIST,
  SUPPORTED_LANGUAGES,
  TIME_FORMATS,
} from '../../../../../../common/constants/constants';
import { useState } from 'react';
import { i18n } from 'next-i18next';
import { Box } from '@mui/system';
import { useCommonStyles } from '../../styles';

const useStyles = makeStyles({
  dropdown: {
    minWidth: '50%',
  },
});

export const GeneralSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n?.language);
  const commonClasses = useCommonStyles();
  const classes = useStyles();

  return (
    <div>
      <Box className={commonClasses.sectionTitle}>Language</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={selectedLanguage}
          size={'small'}
          className={classes.dropdown}
        >
          {SUPPORTED_LANGUAGES.map(({ code, title }) => {
            return (
              <MenuItem key={code} value={code}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      <Box className={commonClasses.sectionTitle}>Home view</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={'Inbox'}
          size={'small'}
          className={classes.dropdown}
        >
          {HOME_VIEW_LIST.map(({ title }) => {
            return (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>

      <Box className={commonClasses.sectionTitle}>
        <Divider />
      </Box>

      <Box className={commonClasses.sectionTitle}>Time format</Box>
      <Box className={commonClasses.sectionBody}>
        <TextField
          select
          value={'24h'}
          size={'small'}
          className={classes.dropdown}
        >
          {TIME_FORMATS.map(({ title, key }) => {
            return (
              <MenuItem key={key} value={key}>
                {title}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
    </div>
  );
};
