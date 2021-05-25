import {useHistory} from 'react-router-dom'
import {createRef, useCallback, useEffect} from "react";
import isInputElement from "../../utilities/domUtils";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Kbd } from '@chakra-ui/layout';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = () => {
    const history = useHistory();
    const inputRef = createRef();

    const onKeyDownListener = useCallback((ev) => {
        if (!isInputElement(document.activeElement) && ev.key === '/') {
            ev.preventDefault();

            inputRef.current.select();
            inputRef.current.focus();
        }
    }, [inputRef]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    const handleSearchKeyDown = ev => {
        const inputField = ev.target;
        const trimmedValue = inputField.value.trim();
        if (ev.key === 'Enter' && trimmedValue.length > 0) {
            history.push('/search/' + encodeURIComponent(trimmedValue));
        }
    }

    return (
        <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.600" children={<SearchIcon />} />
        <Input
            variant="filled"
            ref={inputRef}
            type="search"
            focusBorderColor="red.300"
            placeholder="Search..."
            onKeyDown={handleSearchKeyDown}
            />
            <InputRightElement children={<Kbd>/</Kbd>}/>
        
            </InputGroup>
    );
}

export default SearchBox;
