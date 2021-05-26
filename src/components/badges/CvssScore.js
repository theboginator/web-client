import {  Box, HStack } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';

export default function CvssScore({ score, fontSize = 'fontSizeXsmall' }) {
  const color = Math.floor(score) <= 3 ? 'green' : Math.floor(score) <= 6 ? 'yellow' : 'red';

  if (score === null) {
    return '-';
  }

  return (
    <Tag display='flex ' justifyContent='space-between' colorScheme={color} variant="outline" width='100%' maxWidth='90px'>
        <HStack spacing='3px'>
          {Array.from({ length: Math.floor(score) }).map((s, index) => (
            <Box key={index} rounded='sm' w="2px" h="10px" bgColor={color+'.500'} />
          ))}
        </HStack>
        {score}
    </Tag>
  );
}
