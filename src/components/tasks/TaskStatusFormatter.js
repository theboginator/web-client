import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';

const TaskStatusFormatter = ({ task }) => {
  return (
    <Tag colorScheme={task.status === 'done' ? 'green' : 'gray'}>
      {task.status === 'done' ? <CheckIcon fontSize="12px" /> : <CloseIcon fontSize="10px" />}
      <Text fontSize="sm" ml="1.5" fontWeight="medium" textTransform="capitalize">
        {task.status}
      </Text>
    </Tag>
  );
};

export default TaskStatusFormatter;
