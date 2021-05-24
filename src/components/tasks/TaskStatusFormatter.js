import { CheckIcon } from '@chakra-ui/icons';
import {Flex, HStack, Text } from '@chakra-ui/layout';

const TaskStatusFormatter = ({task}) => {
    return <HStack spacing='2' alignItems='center' >
            <Flex rounded='full' w='22px' h='22px' bg='gray.900' alignItems='center' justifyContent='center'>{task.status === 'done' ? <CheckIcon fontSize='12px' /> : ''}</Flex>
            <Text fontSize='sm' fontWeight='medium' color='gray.500' textTransform='capitalize'>
            {task.status}
            </Text>
        </HStack>
}

export default TaskStatusFormatter;
