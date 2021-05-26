import { Avatar } from '@chakra-ui/avatar';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { CheckIcon, CloseIcon, DeleteIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Grid, HStack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Tr } from '@chakra-ui/table';
import { Tag } from '@chakra-ui/tag';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import TimestampsSection from 'components/ui/TimestampsSection';
import { Link, useHistory } from 'react-router-dom';
import MD5 from 'services/md5';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import AuditLogsTable from '../auditlog/AuditLogsTable';
import UserRoleBadge from '../badges/UserRoleBadge';
import Title from '../ui/Title';

const UserProfile = ({ match }) => {
  useSetTitle('User');

  const history = useHistory();

  const userId = match.params.userId;
  const [user] = useFetch(`/users/${userId}`);
  const [auditLog] = useFetch(`/users/${userId}/activity`);
  const deleteUser = useDelete('/users/');

  const onDeleteButtonClick = (ev) => {
    ev.preventDefault();

    deleteUser(userId).then(() => {
      history.push('/users');
    });
  };

  if (!user) return <Spinner />;

  return (
    <>
      <HStack justifyContent="space-between">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/users">Users</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <ButtonGroup size="sm" isAttached variant="outline">
          <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
            <Button colorScheme="yellow" href={`/users/${user.id}/edit`}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={onDeleteButtonClick} leftIcon={<DeleteIcon />}>
              Delete
            </Button>
          </RestrictedComponent>
        </ButtonGroup>
      </HStack>
      <div>
        {user ? (
          <>
            <Title
              type="User profile"
              title={user.full_name}
              icon={
                <Avatar
                  email={user.email}
                  src={`https://www.gravatar.com/avatar/${MD5(user.email)}?s=200&d=robohash`}
                />
              }
            />
            <Grid gap="5" templateColumns={['1fr', '1fr', '1fr', '1fr .6fr']}>
              <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
                <Text fontSize="md" fontWeight="bold" mb='4'> Details </Text>
                <Table>
                  <Tbody>
                    <Tr>
                      {user.short_bio && <Td colSpan="2">{user.short_bio}</Td> }
                    </Tr>
                    <Tr>
                      <Th>Role</Th>
                      <Td>
                        <UserRoleBadge role={user.role} />
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Timezone</Th>
                      <Td>{user.timezone}</Td>
                    </Tr>
                    <Tr>
                      <Th>Status</Th>
                      <Td>
                        <Tag colorScheme={user.active ? 'green' : 'gray'}>
                          {user.active ? <CheckIcon /> : <CloseIcon />}
                          <Text fontSize="sm" ml="1.5" fontWeight="medium" textTransform="capitalize">
                            {user.active ? 'Active' : 'Suspended'}
                          </Text>
                        </Tag>
                      </Td>
                    </Tr>

                    <Tr>
                      <Th>2FA</Th>
                      <Td>
                        <Tag colorScheme={user.mfa_enabled ? 'green' : 'red'}>
                          {user.mfa_enabled ? <LockIcon /> : <UnlockIcon />}
                          <Text fontSize="sm" ml="1.5" fontWeight="medium" textTransform="capitalize">
                            {user.mfa_enabled ? 'Enabled' : 'Not Enabled'}
                          </Text>
                        </Tag>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
              <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
                <Text fontSize="md" fontWeight="bold" mb='4'> Timestamps </Text>
                <TimestampsSection entity={user} />
              </Box>
            </Grid>

            <Box as="article" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" mt='5'>
               <HStack mb='4' justifyContent='space-between'>
                <Text fontSize="md" fontWeight="bold" > Activity</Text>
                <Button variant='outline' size='sm' to="/auditlog">View full audit log</Button>
               </HStack>
                {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true" /> : <Spinner />}
            </Box>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default UserProfile;
