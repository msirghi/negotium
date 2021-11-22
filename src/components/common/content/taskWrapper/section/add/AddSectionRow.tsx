import styles from './AddSectionRow.module.scss';
import { FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { If } from '../../../../utilities/if/If';
import { Row } from '../../../../utilities/row/Row';
import { useTranslation } from 'next-i18next';

type Props = {
  onSectionSave: (title: string, orderNumber: number) => void;
};

export const AddSectionRow: FC<Props> = ({ onSectionSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');
  const { t } = useTranslation('common');

  const onTitleClick = () => {
    setEditMode(true);
  };

  const onCancelClick = () => {
    setEditMode(false);
  };

  const onSave = () => {
    onSectionSave(fieldValue, 1);
    setEditMode(false);
    setFieldValue('');
  };

  return (
    <div>
      <If condition={!editMode}>
        <div
          className={styles.adrTitleContainer}
          onClick={onTitleClick}
          data-testid={'title'}
        >
          <span className={styles.adrTitle}>Add section</span>
        </div>
      </If>
      <If condition={editMode}>
        <TextField
          onChange={(e) => setFieldValue(e.target.value)}
          fullWidth
          size={'small'}
          placeholder={t('inputPlaceholders.nameNewSection')}
          inputProps={{ 'data-testid': 'section-name-field' }}
          sx={{ marginTop: '1rem' }}
        />
        <Row className={styles.buttonRow}>
          <Button
            onClick={onSave}
            disabled={!fieldValue}
            data-testid={'save-button'}
            color={'primary'}
            variant={'contained'}
            size={'small'}
          >
            {t('buttonLabels.addSection')}
          </Button>
          <Button
            onClick={onCancelClick}
            size={'small'}
            data-testid={'cancel-button'}
          >
            {t('buttonLabels.cancel')}
          </Button>
        </Row>
      </If>
    </div>
  );
};
