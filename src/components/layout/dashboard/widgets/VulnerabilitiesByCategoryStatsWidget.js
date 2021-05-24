import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import useFetch from "hooks/useFetch";
import { Pie, PieChart } from "recharts";
import widgetIsVisible from "services/widgets";

const VulnerabilitiesByCategoryStatsWidget = () => {
    const [vulnerabilitiesByCategoryStats] = useFetch('/vulnerabilities/stats?groupBy=category')

    const visible = widgetIsVisible('vulnerability-by-category-stats');
    if (!visible) return null;

    return (
        <Box as='article' borderWidth="1px" borderRadius="lg" overflow="hidden" p='5'>
        <HStack mb='4'>
            <Text fontSize='md' fontWeight='bold'>Vulnerabilities by category</Text>
        </HStack>
        <Center>           
            <PieChart width={320} height={320}>
                <Pie
                    data={vulnerabilitiesByCategoryStats}
                    dataKey="total"
                    cx={160}
                    cy={160}
                    labelLine={true}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#82ca9d"
                    label={({ index }) =>
                        `${vulnerabilitiesByCategoryStats[index].category_name} (${vulnerabilitiesByCategoryStats[index].total})`
                    }
                    labelStyle={{ fill: '#ffffff' }}
                >
                </Pie>
            </PieChart>
        </Center>
        </Box>
    )
}

export default VulnerabilitiesByCategoryStatsWidget
