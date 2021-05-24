import { Box, Grid } from "@chakra-ui/layout";
import { useState } from "react";
import useSetTitle from "../../../hooks/useSetTitle";
import Header from "../Header";
import Sidebar from "../sidebar";
import DashboardPanels from "./DashboardPanels";

function Dashboard({ children }) {
    useSetTitle('Dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <>
            <Header />
            <Grid className={sidebarCollapsed ? 'collapsed' : ''} templateColumns="max-content 1fr" gap={6}>
                <Sidebar sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                <Box flex='1'>
                    {children || <DashboardPanels />}
                </Box>
            </Grid>
        </>
    );
}

export default Dashboard;
