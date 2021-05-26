import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Text } from "@chakra-ui/layout";
import { useCallback, useEffect } from 'react';
import isInputElement from "../../utilities/domUtils";

const Pagination = ({ page, total, handleNext, handlePrev }) => {
    const previousEnabled = page + 1 > 1;
    const nextEnabled = page + 1 < total;

    const onKeyDownListener = useCallback((ev) => {
        if (isInputElement(document.activeElement)) {
            return;
        }

        if (previousEnabled && ev.key === 'p') {
            ev.preventDefault();
            handlePrev();
        } else if (nextEnabled && ev.key === 'n') {
            ev.preventDefault();
            handleNext();
        }
    }, [previousEnabled, nextEnabled, handlePrev, handleNext]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDownListener);
        return () => {
            document.removeEventListener('keydown', onKeyDownListener);
        };
    }, [onKeyDownListener]);

    return <ButtonGroup isAttached variant="outline" colorScheme='gray'>
        <IconButton disabled={!previousEnabled} onClick={handlePrev} aria-label="Add to friends" icon={<ChevronLeftIcon />} />
        <Button disabled variant='outline'>{page + 1} <Text mx='5px' > of </Text> {total} </Button>
        <IconButton disabled={!nextEnabled} onClick={handleNext} aria-label="Add to friends" icon={<ChevronRightIcon />} />
    </ButtonGroup>
}

export default Pagination
