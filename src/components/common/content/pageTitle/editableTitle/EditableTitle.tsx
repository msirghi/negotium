import { TaskWrapperTitleOptions } from '../../types';
import { FC, useState } from 'react';
import { IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { If } from '../../../utilities/if/If';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Row } from '../../../utilities/row/Row';

type Props = {
  title: string;
  editableOptions: TaskWrapperTitleOptions;
  className?: string;
};

export const EditableTitle: FC<Props> = ({ title, editableOptions, className }) => {
  const [fieldValue, setFieldValue] = useState(title);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  const toggleEditMode = () => setEditMode(!editMode);

  const onSave = () => {
    setError('');
    if (!fieldValue) {
      setError('Field is mandatory.');
      return;
    }
    editableOptions.onSave(fieldValue);
    toggleEditMode();
  };

  const onCancel = () => {
    toggleEditMode();
    setFieldValue(title);
    setError('');
  };

  return (
    <div>
      <If condition={editMode}>
        <Row alignVerticalCenter>
          <TextField
            onChange={(e) => setFieldValue(e.target.value)}
            value={fieldValue}
            variant="standard"
            inputProps={{
              style: { fontSize: 34 },
              'data-testid': 'et-title-field',
            }}
            error={!!error}
            helperText={error}
          />
          <IconButton onClick={onSave} data-testid={'et-save-button'}>
            <Tooltip title={'Save'}>
              <CheckIcon color={'primary'} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={onCancel} data-testid={'et-cancel-button'}>
            <Tooltip title={'Cancel'}>
              <ClearIcon color={'error'} />
            </Tooltip>
          </IconButton>
        </Row>
      </If>

      <If condition={!editMode}>
        <Typography
          onClick={toggleEditMode}
          className={className}
          fontSize={34}
          data-testid="et-title"
        >
          {title}
        </Typography>
      </If>
    </div>
  );
};
