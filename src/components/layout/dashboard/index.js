import { Box, Grid } from "@chakra-ui/layout";
import useSetTitle from "../../../hooks/useSetTitle";
import Header from "../Header";
import Sidebar from "../sidebar";
import DashboardPanels from "./DashboardPanels";

function Dashboard({ children }) {
    useSetTitle('Dashboard')
    return (
        <>
            <Header />
            <Grid templateColumns={["1fr", "1fr", "max-content 1fr"]} gap={['2','3','4','5']} >
                <Sidebar />
                <Box flex="1" px={['2','3','4','5']}>
                    {children || <DashboardPanels />}
                </Box>
            </Grid>
        </>
    );
}

export default Dashboard;
