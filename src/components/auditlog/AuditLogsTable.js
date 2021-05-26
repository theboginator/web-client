import { Badge } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import UserRoleBadge from 'components/badges/UserRoleBadge';
import Ipv4Link from 'components/ui/Ipv4Link';
import NoResultsTableRow from 'components/ui/NoResultsTableRow';
import UserAgentLabel from 'components/ui/UserAgentLabel';
import UserLink from 'components/users/Link';

const AuditLogsTable = ({ auditLog, hideUserColumns = false }) => {
  const numColumns = hideUserColumns ? 4 : 6;
  return (
    <Table size='sm' variant='simple' mt='5'>
      <Thead>
        <Tr>
          <Th>Action</Th>
          <Th>IP address</Th>
          <Th>User agent</Th>
          <Th>Date/Time</Th>
          {!hideUserColumns && (
            <>
              <Th>User</Th>
              <Th>Role</Th>
            </>
          )}
          <Th>Object</Th>
        </Tr>
      </Thead>
      <Tbody>
        {auditLog.length === 0 && <NoResultsTableRow numColumns={numColumns} />}
        {auditLog.map((entry, index) => {
          return (
            <Tr key={index}>
              <Td>
                <Badge>{entry.action}</Badge>
              </Td>
              <Td>
                <Ipv4Link value={entry.client_ip} />
              </Td>
              <Td color='gray.500'>{entry.user_agent ? <UserAgentLabel userAgent={entry.user_agent} /> : '-'}</Td>
              <Td color='gray.500'>{entry.insert_ts}</Td>
              {!hideUserColumns && (
                <>
                  <Td>{entry.user_name ? <UserLink userId={entry.user_id}>{entry.user_name}</UserLink> : '-'}</Td>
                  <Td>
                    <UserRoleBadge role={entry.user_role} />
                  </Td>
                </>
              )}
              <Td color='gray.500'>{entry.object}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default AuditLogsTable;
