import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {  Text, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { AuthConsumer } from "../../contexts/AuthContext";
import LoginContainer from "./LoginContainer";


const Login = () => {

    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ username: null, password: null })
    const [error, setError] = useState(null)

    useEffect(() => {
        // each time an error occurs
        error && setTimeout(() => {
            setError(null)
        }, 4000)
    }, [error])

    const handleUsername = ev => {
        setCredentials({ ...credentials, username: ev.target.value })
    }
    const handlePassword = ev => {
        setCredentials({ ...credentials, password: ev.target.value })
    }

    const onOk = () => {
        setLoading(false);
    }
    const onKo = (err) => {
        setLoading(false);
        setError(err)
    }

    const handleSubmit = (ev, login) => {
        setLoading(true);
        ev.preventDefault();
        login(credentials, onOk, onKo);
    }

    return <AuthConsumer>
        {
            ({ isAuth, login }) => (
                <LoginContainer>
                        <form onSubmit={ev => handleSubmit(ev, login)}>
                                <VStack spacing='5' alignItems='start'>

                                <Text color='gray.200'  fontSize='2xl'>Login</Text>
                                <FormControl id="inputUsername" >
                                    <FormLabel>Username</FormLabel>
                                    <Input  type="text" onChange={handleUsername}
                                    placeholder="Username" size='lg'
                                    required focusBorderColor='red.500' autoFocus />
                                </FormControl>
                                <FormControl id="inputPassword" >
                                    <FormLabel>Password</FormLabel>
                                    <Input focusBorderColor='red.500' type="password" onChange={handlePassword} size='lg'
                                        placeholder="Password" required />
                                </FormControl>
                                <Button isDisabled={credentials.username?.length< 3 || credentials.password?.length < 3} size='lg' width='full' colorScheme='red' type="submit">{!loading ? "Sign in" : "Processing..."}</Button>
                            
                            {error &&
                                <p className="loginform__error">{error} </p>}
                                </VStack>

                        </form>
                </LoginContainer>
            )
        }
    </AuthConsumer>
};

export default Login;
