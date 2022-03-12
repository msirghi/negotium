import React from 'react';
import { makeStyles } from '@mui/styles';
import { Row } from '../../../utilities/row/Row';
import { ROW_DIRECTION } from '../../../../../common/constants/enums';
import BalloonsImage from '../../../../../assets/balloons.png';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Fade } from '@mui/material';

const useStyles = makeStyles({
  title: {
    fontSize: 18,
  },
});

export const NoTasks = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Fade in>
      <div>
        <Row alignVerticalCenter alignHorizontalCenter direction={ROW_DIRECTION.COLUMN}>
          <Image alt="no-tasks" src={BalloonsImage} width={150} height={150} />
          <p className={classes.title}>{t('enjoyFreeTime')}</p>
        </Row>
      </div>
    </Fade>
  );
};
