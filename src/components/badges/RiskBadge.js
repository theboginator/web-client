import { Tag } from '@chakra-ui/tag';
import { IconExclamation, IconInformation, IconShieldExclamation } from '../ui/Icons'

const RiskBadge = ({ risk, fontSize = 'fontSizeXsmall' }) => {
    const RISKS = {
        none: { color: 'green', icon: <IconInformation styling={{ marginRight : '6px', width:'14px'}} /> },
        low: { color: 'green', icon: <IconInformation styling={{ marginRight : '6px', width:'14px'}} /> },
        medium: { color: 'yellow', icon: <IconExclamation styling={{ marginRight : '6px', width:'14px'}} /> },
        high: { color: 'red', icon: <IconShieldExclamation styling={{ marginRight : '6px', width:'14px'}} /> },
        critical: { color: 'red', icon: <IconShieldExclamation styling={{ marginRight : '6px', width:'14px'}} /> }
    }
   

    return (
        <Tag colorScheme={RISKS[risk].color} variant='outline'>
            {RISKS[risk].icon}
            {risk}
        </Tag>
    )
}

export default RiskBadge;
