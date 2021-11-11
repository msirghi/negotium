import styles from './AddSectionRow.module.scss';
import { FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { If } from '../../../../utilities/if/If';
import { Row } from '../../../../utilities/row/Row';

type Props = {
  onSectionSave: (title: string, orderNumber: number) => void;
};

export const AddSectionRow: FC<Props> = ({ onSectionSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

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
        <div className={styles.adrTitleContainer} onClick={onTitleClick}>
          <span className={styles.adrTitle}>Add section</span>
        </div>
      </If>
      <If condition={editMode}>
        <TextField
          onChange={(e) => setFieldValue(e.target.value)}
          fullWidth
          size={'small'}
          placeholder={'Name this section'}
          sx={{ marginTop: '1rem' }}
        />
        <Row className={styles.buttonRow}>
          <Button
            onClick={onSave}
            disabled={!fieldValue}
            color={'primary'}
            variant={'contained'}
            size={'small'}
          >
            Add section
          </Button>
          <Button onClick={onCancelClick} size={'small'}>
            Cancel
          </Button>
        </Row>
      </If>
    </div>
  );
};
