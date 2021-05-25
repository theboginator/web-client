import { Box, HStack, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import CommandBadge from "components/commands/Badge";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import widgetIsVisible from "services/widgets";

const PopularCommandsWidget = () => {
    const [commands] = useFetch('/commands?limit=5');

    const visible = widgetIsVisible('popular-commands');
    if (!visible) return null;

    if (!commands) return <Loading />

    return (
        <Box
            as="article"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="5"
        >
            <HStack mb="4">
                <Text fontSize="md" fontWeight="bold">
                    Popular commands
                </Text>
            </HStack>
            <Table variant="simple" size={"sm"}>
                <Thead>
                    <Tr>
                        <Th>Short name</Th>
                        <Th>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {commands.map((command) => (
                        <Tr>
                            <Td>
                                <CommandBadge command={command}>
                                    {command.short_name}
                                </CommandBadge>
                            </Td>
                            <Td fontSize="sm" color="gray.500">
                                {command.description}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default PopularCommandsWidget;
