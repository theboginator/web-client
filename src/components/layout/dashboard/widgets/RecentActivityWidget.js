import { Badge, Box, HStack, Text } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import Loading from "components/ui/Loading";
import UserLink from "components/users/Link";
import useFetch from "hooks/useFetch";
import widgetIsVisible from "services/widgets";

const RecentActivityWidget = () => {
    const [auditLog] = useFetch('/auditlog?limit=5');

    const visible = widgetIsVisible('recent-activity');
    if (!visible) return null;

    if (!auditLog) return <Loading />

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
                    Recent activity
                </Text>
            </HStack>

            <Table variant="simple" size={"sm"}>
                <Thead>
                    <Tr>
                        <Th>Action</Th>
                        <Th>User</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {auditLog.map((log) => (
                        <Tr>
                            <Td>
                                <Badge>{log.action}</Badge>
                            </Td>
                            <Td>
                                {log.user_name ? (
                                    <UserLink userId={log.user_id}>
                                        {log.user_name}
                                    </UserLink>
                                ) : (
                                    "-"
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default RecentActivityWidget;
