import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/layout";

const Title = ({ type, title, icon }) => {
    return (
        <HStack p="5" spacing="5" alignItems='center'>
            <Box rounded='full' p='3' color='red.300' w='48px' h='48px' display='flex' alignItems='center' justifyContent='center' bg='gray.900'>{icon && icon}</Box>
            <VStack  spacing='-1' alignItems='start'>
                {type && (
                    <Text color="red.300" isTruncated>
                        {type}
                    </Text>
                )}
                <Heading as="h2" >{title}</Heading>
            </VStack>
        </HStack>
    );
};

export default Title;
