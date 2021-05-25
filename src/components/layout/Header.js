import { Box, HStack, Text , Link as ChakraLink, Flex} from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { ServerIssuesUrl, UserManualUrl } from 'ServerUrls';
import { AuthConsumer } from '../../contexts/AuthContext';
import NotificationsBadge from '../badges/NotificationsBadge';
import SearchBox from "../search/Box";
import HeaderUserMenu from '../ui/HeaderUserMenu';

const LINKS = [
    { title: "User Manual", to: { pathname: UserManualUrl } },
    { title: "Support", to: { pathname: ServerIssuesUrl } },
];

export default function Header() {

    return (
        <AuthConsumer>
            {({ isAuth, user }) => (
                <Box p={['2','3','4','5']} d="flex" justifyContent="space-between">
                    <Link to="/" style={{ cursor: "pointer" }} className="logo">
                        <HStack>
                            <img alt="logo" src="/logo.svg" />
                            <Flex display={["none", "none", "flex"]}>
                                <Text fontSize="2xl" fontWeight="bold">
                                    Recon
                                </Text>
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="red.300"
                                >
                                    map
                                </Text>
                            </Flex>
                        </HStack>
                    </Link>
                    <HStack spacing={['1','1',"2",'3']}>
                        {isAuth ? (
                            <>
                                <SearchBox />
                                <NotificationsBadge />
                                {user && <HeaderUserMenu email={user.email} />}
                            </>
                        ) : (
                            LINKS.map((link, index) => (
                                <ChakraLink key={index} href={link.to.pathname}>
                                    {link.title}
                                </ChakraLink>
                            ))
                        )}
                        <div id="progress"></div>
                    </HStack>
                </Box>
            )}
        </AuthConsumer>
    );
}
