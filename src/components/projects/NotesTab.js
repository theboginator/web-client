
import { Box, Divider, Grid,  Text } from '@chakra-ui/layout';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import React, { useState } from 'react';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import secureApiFetch from '../../services/api';
import NotesForm from '../notes/Form';
import NotesTable from '../notes/Table';
import Loading from '../ui/Loading';
import { actionCompletedToast } from '../ui/toast';

const ProjectNotesTab = ({ project }) => {
  const [notes, reloadNotes] = useFetch(`/notes?parentType=project&parentId=${project.id}`);
  const deleteNoteById = useDelete('/notes/', reloadNotes);
  const emptyNote = { visibility: 'private', content: '', parentType: 'project', parentId: project.id };
  const [newNote, updateNewNote] = useState(emptyNote);

  const onDeleteButtonClick = (ev, note) => {
    ev.preventDefault();

    deleteNoteById(note.id);
  };

  const onCreateNoteFormSubmit = async (ev) => {
    ev.preventDefault();

    await secureApiFetch(`/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
    })
      .then(() => {
        reloadNotes();
        actionCompletedToast(`The note has been created."`);
      })
      .finally(() => {
        updateNewNote(emptyNote);
      });
  };

  if (!notes) {
    return <Loading />;
  }

  return (
    <Grid templateColumns={['1fr', '1fr', '1fr', 'repeat(2,1fr)']} gap='5'>
      <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
        <Text fontSize="xl" fontWeight="bold"  mb="4" >
          Project notes
        </Text>
        <Divider />
        <NotesTable notes={notes} onDeleteButtonClick={onDeleteButtonClick} />
      </Box>
      <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
            <Text fontSize="xl" fontWeight="bold"  mb="4" >
            New project note
            </Text>
        <Divider />

        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
        <NotesForm note={newNote} onFormSubmit={onCreateNoteFormSubmit} noteSetter={updateNewNote} />
        </RestrictedComponent>
      </Box>
    </Grid>
  );
};

export default ProjectNotesTab;
