import { Box,  Container, Flex, HStack, Text } from "@chakra-ui/layout";
import Header from "../layout/Header";

const LoginContainer = ({ children }) => {
    return (
        <Flex direction='column' bgColor={"gray.800"} minHeight='100vh' textColor='gray.500'>
            <Header />
            <Container p='5' flex='1' minHeight='full' >
                 {children} 
            </Container>
            <Box p='5'>
                <HStack spacing='2'> 
                     <Text>Version </Text>
                     <Text fontWeight='bold'> {process.env.REACT_APP_VERSION}</Text> 
                     <Text >({process.env.REACT_APP_GIT_COMMIT_HASH})</Text> 
                </HStack>
            </Box>
        </Flex>
    )
}

export default LoginContainer
