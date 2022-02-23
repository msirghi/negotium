import { ContentBox } from '../../common/boxes/content/ContentBox';
import { PageTitle } from '../../common/content/pageTitle/PageTitle';
import { NoteItem } from '../item/NoteItem';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNotesContainerStyles } from './styles';
import SmoothList from 'react-smooth-list';
import { NotesAddInput } from '../add/NotesAddInput';
import NoteService from '../../../services/NoteService';
import { Note, NoteUpdate } from '../../../common/types/notes.types';
import SortUtils from '../../../common/utils/sortUtils';
import { useSnackbar } from 'notistack';
import { NoteSkeleton } from '../../common/skeletons/noteSkeleton/NoteSkeleton';
import useTranslation from 'next-translate/useTranslation';
import { EmptyListMessage } from '../../common/emptyListMessage/EmptyListMessage';
import { Row } from '../../common/utilities/row/Row';
import { ROW_DIRECTION } from '../../../common/constants/enums';
import { If } from '../../common/utilities/if/If';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setNotes } from '../../../redux/notes/notesSlice';
import { loadNotes } from '../../../redux/actions/loadNotes';

export const NotesContainer = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const classes = useNotesContainerStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('notes');

  const onNoteAdd = async (note: NoteUpdate) => {
    await NoteService.createNote(note);
    enqueueSnackbar('Note added.');
    dispatch(loadNotes());
  };

  const onNoteDelete = async (noteId: Note['id']) => {
    dispatch(setNotes(notes.filter(({ id }) => id !== noteId)));
    await NoteService.removeNoteById(noteId);
    enqueueSnackbar('Note removed.');
  };

  const onNoteUpdate = async (note: Note) => {
    note.updatedDate = new Date().toString();
    dispatch(setNotes(notes.map((n) => (n.id === note.id ? note : n))));
    await NoteService.updateNoteById(note);
  };

  return (
    <div data-testid={'content'}>
      <ContentBox skipWidthChange>
        <PageTitle title={t('title')} showUpperHeader upperHeaderTitle={t('title')} />
        <NotesAddInput onNoteAdd={onNoteAdd} />
        <div className={classes.itemList}>
          <If condition={!notes.length}>
            <Row fullWidth alignVerticalCenter direction={ROW_DIRECTION.COLUMN}>
              <EmptyListMessage imageSrc={'/static/clouds.png'} message={t('noNotesMessage')} />
            </Row>
          </If>
          <SmoothList>
            <Grid container spacing={2}>
              {SortUtils.sortNotesByUpdatedDate(notes)
                .reverse()
                .map((note) => (
                  <Grid className={classes.noteItem} item xs={12} sm={12} md={6} lg={3} key={note.id}>
                    <NoteItem note={note} onNoteRemove={onNoteDelete} onNoteUpdate={onNoteUpdate} />
                  </Grid>
                ))}
            </Grid>
          </SmoothList>
        </div>
      </ContentBox>
    </div>
  );
};
