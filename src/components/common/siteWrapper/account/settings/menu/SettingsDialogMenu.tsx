import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { SettingsMenuListItem } from './item/SettingsMenuListItem';
import {
  AccountCircleOutlined,
  PaletteOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { FC } from 'react';
import { SETTINGS_OPTIONS } from '../../../../../../common/types/enums';

const useStyles = makeStyles({
  container: {
    marginRight: 10,
  },
  content: {
    paddingRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
  },
});

type Props = {
  setSelectedItem: (option: SETTINGS_OPTIONS) => void;
  selectedItem: SETTINGS_OPTIONS;
};

export const SettingsDialogMenu: FC<Props> = ({
  selectedItem,
  setSelectedItem,
}) => {
  const classes = useStyles();

  const onOptionSelect = (option: SETTINGS_OPTIONS) => {
    setSelectedItem(option);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.title}>Settings</Box>

        <Box className={classes.menuContainer}>
          <SettingsMenuListItem
            onClick={() => onOptionSelect(SETTINGS_OPTIONS.ACCOUNT)}
            isActive={selectedItem === SETTINGS_OPTIONS.ACCOUNT}
            Icon={AccountCircleOutlined}
            title={'Account'}
          />

          <SettingsMenuListItem
            onClick={() => onOptionSelect(SETTINGS_OPTIONS.GENERAL)}
            isActive={selectedItem === SETTINGS_OPTIONS.GENERAL}
            Icon={SettingsOutlined}
            title={'General'}
          />

          <SettingsMenuListItem
            onClick={() => onOptionSelect(SETTINGS_OPTIONS.THEMES)}
            Icon={PaletteOutlined}
            isActive={selectedItem === SETTINGS_OPTIONS.THEMES}
            title={'Themes'}
          />
        </Box>
      </Box>
    </Box>
  );
};
