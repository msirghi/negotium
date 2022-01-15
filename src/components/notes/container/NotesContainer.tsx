import { ContentBox } from '../../common/boxes/content/ContentBox';
import { PageTitle } from '../../common/content/pageTitle/PageTitle';
import { NoteItem } from '../item/NoteItem';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { useNotesContainer } from './styles';
import SmoothList from 'react-smooth-list';
import { NotesMock } from '../../../common/tests/mockData/notes-mock';
import { NotesAddInput } from '../add/NotesAddInput';

export const NotesContainer = () => {
  const [notes, setNotes] = useState(NotesMock);
  const classes = useNotesContainer();

  return (
    <div>
      <ContentBox skipWidthChange>
        <PageTitle title={'Notes'} showUpperHeader upperHeaderTitle={'Notes'} />
        <div>Notes</div>
        <NotesAddInput />
        <div style={{ marginTop: '2rem' }}>
          <SmoothList>
            <Grid container spacing={2}>
              {notes.map((note) => {
                return (
                  <Grid
                    className={classes.noteItem}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    key={note.id}
                  >
                    <NoteItem note={note} />
                  </Grid>
                );
              })}
            </Grid>
          </SmoothList>
        </div>
      </ContentBox>
    </div>
  );
};
