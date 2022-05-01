import { Box } from '@mui/system';
import { SettingsMenuListItem } from './item/SettingsMenuListItem';
import {
  AccountCircleOutlined,
  PaletteOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { FC } from 'react';
import { SETTINGS_OPTIONS } from '../../../../../../common/types/enums';
import useTranslation from 'next-translate/useTranslation';
import { useIsMobile } from '../../../../../../common/hooks/common/useIsMobile';
import { Row } from '../../../../utilities/row/Row';
import { RowDirection } from '../../../../../../common/constants/enums';
import { useSettingsDialogMenuStyles } from './styles';

type Props = {
  setSelectedItem: (option: SETTINGS_OPTIONS) => void;
  selectedItem: SETTINGS_OPTIONS;
};

export const SettingsDialogMenu: FC<Props> = ({
  selectedItem,
  setSelectedItem,
}) => {
  const classes = useSettingsDialogMenuStyles();
  const { t } = useTranslation('settings');
  const isMobile = useIsMobile();

  const onOptionSelect = (option: SETTINGS_OPTIONS) => {
    setSelectedItem(option);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.title}>Settings</Box>

        <Box className={classes.menuContainer}>
          <Row direction={isMobile ? RowDirection.ROW : RowDirection.COLUMN}>
            <SettingsMenuListItem
              onClick={() => onOptionSelect(SETTINGS_OPTIONS.ACCOUNT)}
              isActive={selectedItem === SETTINGS_OPTIONS.ACCOUNT}
              Icon={AccountCircleOutlined}
              title={t('titles.account')}
            />

            <SettingsMenuListItem
              onClick={() => onOptionSelect(SETTINGS_OPTIONS.GENERAL)}
              isActive={selectedItem === SETTINGS_OPTIONS.GENERAL}
              Icon={SettingsOutlined}
              title={t('titles.general')}
            />

            <SettingsMenuListItem
              onClick={() => onOptionSelect(SETTINGS_OPTIONS.THEMES)}
              Icon={PaletteOutlined}
              isActive={selectedItem === SETTINGS_OPTIONS.THEMES}
              title={t('titles.themes')}
            />
          </Row>
        </Box>
      </Box>
    </Box>
  );
};
