import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/select';
import { getAllTimezones } from 'countries-and-timezones';
import React, { useState } from 'react';
import useSetTitle from '../../hooks/useSetTitle';
import secureApiFetch from '../../services/api';
import { IconPreferences, IconSave } from '../ui/Icons';
import Title from '../ui/Title';

const UserPreferences = ({ history }) => {
    useSetTitle('Preferences')
    const user = JSON.parse(localStorage.getItem('user'));
    const timezones = getAllTimezones();
    const timezoneKeys = Object.keys(timezones).sort();
    const [timezone, setTimezone] = useState(user.timezone);

    const handleChange = ev => { setTimezone(ev.target.value); }

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ timezone: timezone })
        })
            .then(() => {
                user.timezone = timezone;
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/');
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Title type='User' title='Preferences' icon={<IconPreferences />} />
            <form onSubmit={onFormSubmit} required>
                <FormControl mb='4'>
                    <FormLabel>Timezone</FormLabel>
                    <Select onChange={handleChange} defaultValue={user.timezone}>
                        {timezoneKeys.map((key, index) =>
                            <option key={index} value={timezones[key].name}>{timezones[key].name}</option>
                        )}
                    </Select>
                </FormControl>
              
                <Button  type="submit" leftIcon={<IconSave styling={{ width: '16px'}} />}> Save</Button>
            </form>
        </>
    )
}

export default UserPreferences;
