import { Button } from '@mui/material';
import { useNotesAddFormStyles } from './styles';
import { Box } from '@mui/system';
import { FC, useState } from 'react';
import { BorderlessInput } from '../../../common/form/input/borderlessInput/BorderlessInput';
import { TextInputChangeEvent } from '../../../../common/constants/types';
import SlateUtils from '../../../../common/utils/slateUtils';
import RichTextField from '../../../common/form/input/richText/RichTextField';
import { Descendant } from 'slate';

type Props = {
  onClose: () => void;
};

export const NotesAddForm: FC<Props> = ({ onClose }) => {
  const classes = useNotesAddFormStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(
    SlateUtils.getInitialValueForSlate(undefined)
  );

  const onTitleChange = () => {
    return (e: TextInputChangeEvent) => setTitle(e.target.value);
  };

  const onDescriptionChange = () => {
    return (e: Descendant[]) => setDescription(e);
  };

  return (
    <Box className={classes.container}>
      <BorderlessInput
        autoFocus
        value={title}
        className={classes.input}
        size={'small'}
        placeholder={'Title'}
        variant={'standard'}
        InputProps={{ style: { fontWeight: 'bold' } }}
        onChange={onTitleChange()}
      />

      <RichTextField value={description} setValue={onDescriptionChange()} />

      <Box className={classes.actions}>
        <Button onClick={onClose} className={classes.closeButton}>
          Close
        </Button>
      </Box>
    </Box>
  );
};
