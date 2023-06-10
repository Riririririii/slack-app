import React, { useState } from "react";
import { Grid, Segment, Form, Icon, Header, Button, Message } from "semantic-ui-react";
import "../Form.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../server/firebase";
//import { addDoc, collection } from "@firebase/firestore";
//import { firestore } from "../../server/firebase";
import { Link } from "react-router-dom";


const Login = () => {
    
    const [userState, setUserState] = useState({
        email: "",
        password: "",
    });

    const [errorState, setErrorState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUserState((prevState) => ({
        ...prevState,
        [name]: value
        }));
        };

    const checkForm = () => {
        
            if (isFormEmpty()) {
                setErrorState((prevState) => [...prevState, { message: "Please fill in all fields" }]);
                return false;      
            } else  {
                return true;
            }
    };

    const isFormEmpty = () => {
        const { email, password  } = userState;
        return  !email.length || !password.length
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorState(() => []);

            if (checkForm()) {
                setIsLoading(true);
                await signInWithEmailAndPassword(auth, userState.email, userState.password)
                .then((userCredential) => {
                    setIsLoading(false);
                    console.log(userCredential)
                })
                .catch(servererror => {
                    setIsLoading(false);
                    setErrorState((prevState) => [...prevState, servererror]);
                })  
            }
    }

    const formatError = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    };

    return (
        <>
        <Grid verticalAlign="middle" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: "500px" }}>
            <Header icon as="h2">
                <Icon name="slack" />
                Login
            </Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                <Form.Input
                    name="email"
                    value={userState.email}
                    icon="mail"
                    iconPosition="left"
                    onChange={handleInput}
                    type="text"
                    placeholder="Email"
                />
                <Form.Input
                    name="password"
                    value={userState.password}
                    icon="lock"
                    iconPosition="left"
                    onChange={handleInput}
                    type="password"
                    placeholder="Password"
                />
                <Button disabled={isLoading} loading={isLoading}>Login</Button>
                </Segment>
                
            </Form>
            {errorState.length > 0 && (
                <Message error>
                <h4>Error</h4>
                {formatError()}
                </Message>
                
            )}
            <Message>
                Don't have an account? Signup <Link to="/signup">here</Link>
            </Message>
            </Grid.Column>
        </Grid>
    </>
    )
}

export default Login;