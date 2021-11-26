import { MenuItem } from '@mui/material';
import { Row } from '../../../utilities/row/Row';
import { FC } from 'react';
import { useCommonStyles } from '../styles';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { useTranslation } from 'next-i18next';

type Props = {
  closeMenu: () => void;
};

export const ChangeLog: FC<Props> = ({ closeMenu }) => {
  const classes = useCommonStyles();
  const { t } = useTranslation('settings');

  return (
    <MenuItem onClick={closeMenu}>
      <Row alignVerticalCenter>
        <PublishedWithChangesOutlinedIcon fontSize={'small'} />
        <span className={classes.itemTitle}>{t('titles.changeLog')}</span>
      </Row>
    </MenuItem>
  );
};
