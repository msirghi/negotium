import { ContentBox } from '../../common/boxes/content/ContentBox';
import { PageTitle } from '../../common/content/pageTitle/PageTitle';
import { NoteItem } from '../item/NoteItem';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useNotesContainer } from './styles';
import SmoothList from 'react-smooth-list';
import { NotesAddInput } from '../add/NotesAddInput';
import NoteService from '../../../services/NoteService';
import { Note, NoteUpdate } from '../../../common/types/notes.types';
import SortUtils from '../../../common/utils/sortUtils';
import { useSnackbar } from 'notistack';
import { NoteSkeleton } from '../../common/skeletons/noteSkeleton/NoteSkeleton';
import { useTranslation } from 'next-i18next';

export const NotesContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useNotesContainer();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('notes');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const notes = await NoteService.getNotes();
    setNotes(notes as Note[]);
    setLoading(false);
  };

  const onNoteAdd = async (note: NoteUpdate) => {
    await NoteService.createNote(note);
    await fetchNotes();
    enqueueSnackbar('Note added.');
  };

  const onNoteDelete = async (noteId: Note['id']) => {
    setNotes((prevState) => [...prevState.filter(({ id }) => id !== noteId)]);
    await NoteService.removeNoteById(noteId);
    enqueueSnackbar('Note removed.');
  };

  const onNoteUpdate = async (note: Note) => {
    note.updatedDate = new Date().toString();
    setNotes((prevState) => [
      ...prevState.map((n) => (n.id === note.id ? note : n)),
    ]);
    await NoteService.updateNoteById(note);
    await fetchNotes();
  };

  if (loading) {
    return <NoteSkeleton />;
  }

  return (
    <div>
      <ContentBox skipWidthChange>
        <PageTitle
          title={t('title')}
          showUpperHeader
          upperHeaderTitle={t('title')}
        />
        <NotesAddInput onNoteAdd={onNoteAdd} />
        <div className={classes.itemList}>
          <SmoothList>
            <Grid container spacing={2}>
              {SortUtils.sortNotesByUpdatedDate(notes)
                .reverse()
                .map((note) => (
                  <Grid
                    className={classes.noteItem}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    key={note.id}
                  >
                    <NoteItem
                      note={note}
                      onNoteRemove={onNoteDelete}
                      onNoteUpdate={onNoteUpdate}
                    />
                  </Grid>
                ))}
            </Grid>
          </SmoothList>
        </div>
      </ContentBox>
    </div>
  );
};
