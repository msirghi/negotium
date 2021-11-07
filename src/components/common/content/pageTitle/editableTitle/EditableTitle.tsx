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
};

export const EditableTitle: FC<Props> = ({ title, editableOptions }) => {
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
            inputProps={{ style: { fontSize: 34 } }}
            error={!!error}
            helperText={error}
          />
          <IconButton onClick={onSave}>
            <Tooltip title={'Save'}>
              <CheckIcon color={'primary'} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={'Cancel'}>
              <ClearIcon color={'secondary'} onClick={onCancel} />
            </Tooltip>
          </IconButton>
        </Row>
      </If>

      <If condition={!editMode}>
        <Typography onClick={toggleEditMode} fontSize={34}>
          {title}
        </Typography>
      </If>
    </div>
  );
};
