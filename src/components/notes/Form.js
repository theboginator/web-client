import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

const NotesForm = ({note, onFormSubmit, noteSetter: setNote}) => {
    const onFormInputChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;

        setNote({
            ...note, [name]: value
        });
    };

    return <form onSubmit={onFormSubmit}>
        <FormControl as="fieldset" my='4'>

            <FormLabel>Visibility</FormLabel>
            <Select name="visibility" required value={note.visibility} onChange={onFormInputChange}>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </Select>
        </FormControl>
        <FormControl as="fieldset" mb='4'>

        <FormLabel>Content</FormLabel>

        <Textarea name="content" style={{width: '100%'}} required value={note.content}
                  onChange={onFormInputChange}/>
        </FormControl>

        <Button leftIcon={<AddIcon />}  type="submit">Create</Button>
    </form>
}

export default NotesForm;
