import { Box, Center, HStack, Text } from "@chakra-ui/layout";
import useFetch from "hooks/useFetch";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import widgetIsVisible from "services/widgets";

const UserActivityStatsWidget = () => {
    const [auditLogStats] = useFetch("/auditlog/stats");

    const visible = widgetIsVisible("user-activity-stats");
    if (!visible) return null;

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
                    User activity over time
                </Text>
            </HStack>
            <Center>
                <LineChart width={320} height={320} data={auditLogStats}>
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="var(--primary-color)"
                        strokeWidth="var(--borderWidth)"
                    />
                    <CartesianGrid stroke="var(--bg-color)" />
                    <XAxis dataKey="log_date" />
                    <YAxis dataKey="total" />
                </LineChart>
            </Center>
        </Box>
    );
};

export default UserActivityStatsWidget;
