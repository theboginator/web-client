import { Box, Grid } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import React from "react";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";

const SystemUsagePage = () => {
    const [usage] = useFetch('/system/usage');

    if (!usage) return <Loading />

    return <div>
        
        <Title type="System" title="Usage" icon={<IconDownloadDocument />} />
        <Grid templateColumns={['1fr', '1fr', 'repeat(2,1fr)']} gap='5'>
            <Box
                as="article"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="5"
                >
                <Stat>
                    <StatLabel>Attachments total count</StatLabel>
                    <StatNumber>{usage.attachments.total_count}</StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                </Stat>
            </Box>
            <Box
                as="article"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="5"
                >
                <Stat>
                    <StatLabel>Attachments total disk usage</StatLabel>
                    <StatNumber><FileSizeSpan fileSize={usage.attachments.total_file_size} /></StatNumber>
                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                </Stat>
            </Box>
        </Grid>
    

    </div>
};

export default SystemUsagePage;
