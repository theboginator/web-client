import { Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

export default function Loading() {
    return ( <Center color='red.400'><Spinner size='xl' /></Center> )
}
