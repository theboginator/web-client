import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { actionCompletedToast } from "components/ui/toast";
import { useState } from "react";
import secureApiFetch from "services/api";
import NotesForm from "./Form";

const NoteModalDialog = ({parentType, parent, isOpen, onClose}) => {
    const emptyNote = { visibility: 'private', content: '', parentType: parentType, parentId: parent.id };
    const [newNote, updateNewNote] = useState(emptyNote)

    const onCreateNoteFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote)
        }).then(() => {
            onClose();
            actionCompletedToast(`The note has been created.`);
        })
            .finally(() => {
                updateNewNote(emptyNote)
            })
    }

    return <Modal size="xl" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Notes</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <NotesForm note={newNote} onFormSubmit={onCreateNoteFormSubmit} noteSetter={updateNewNote} />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="blue" onClick={onCreateNoteFormSubmit}>Save</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default NoteModalDialog;