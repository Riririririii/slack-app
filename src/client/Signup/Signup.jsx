import React, { useState } from "react";
import { Grid, Segment, Form, Icon, Header, Button, Message } from "semantic-ui-react";
import "../Form.css";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../server/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../server/firebase";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const [userState, setUserState] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorState, setErrorState] = useState([]);
    const [successState, setSuccessState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            } else if (!checkPassword()) {
                return false;
            }
            return true;
    };

    const isFormEmpty = () => {
        const { userName, email, password, confirmPassword } = userState;
        return !userName.length || !email.length || !password.length || !confirmPassword.length;
    };

    const checkPassword = () => {
        const { password, confirmPassword } = userState;

            if (password.length < 8) {
                setErrorState((prevState) => [...prevState, { message: "Password length should be greater than 8" }]);
                return false;
            } else if (password !== confirmPassword) {
                setErrorState((prevState) => [...prevState, { message: "Password and Confirm Password does not match" }]);
                return false;
            } else 
                return true;

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorState(() => []);
        setSuccessState(() => []);

            if (checkForm()) {
                setIsLoading(true);
                await createUserWithEmailAndPassword(auth, userState.email, userState.password)
                .then((userCredential) => {
                    setIsLoading(false);
                    updateUser(userCredential); 
                })
                .catch(servererror => {
                    setIsLoading(false);
                    setErrorState((prevState) => [...prevState, servererror]);
                })  
            } else {
            
            }

    };

    const updateUser = async (userCredential) => {

        const add = collection(db, "userInfo")
        const data = {
            displayName: userState.userName,
            photoURL: `http://gravatar.com/avatar/${userCredential.user.uid}?d=identicon`
        }

            if (userCredential) {
                setIsLoading(true);
                    try {
                    await updateProfile(userCredential.user, data);
                        setIsLoading(false);
                        console.log("Created Successfully");
                    } catch (serverError) {
                        setIsLoading(false);
                        setErrorState((prevState) => [...prevState, serverError]);
                    }
                    addDoc(add, data); 
                    setSuccessState((prevState) => [...prevState, { message: "Account Created Successfully" }]);   
                    setIsLoading(false);
                    navigate("/login");
                                 
            }
    
    }   

    const formatError = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    };

    const formatSuccess = () => {
        return successState.map((success, index) => <p key={index}>{success.message}</p>);
    };
    

    return (
        <>
        <Grid verticalAlign="middle" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: "500px" }}>
            <Header icon as="h2">
                <Icon name="slack" />
                Register
            </Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                <Form.Input
                    name="userName"
                    value={userState.userName}
                    icon="user"
                    iconPosition="left"
                    onChange={handleInput}
                    type="text"
                    placeholder="Username"
                />
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
                <Form.Input
                    name="confirmPassword"
                    value={userState.confirmPassword}
                    icon="lock"
                    iconPosition="left"
                    onChange={handleInput}
                    type="password"
                    placeholder="Confirm Password"
                />
                <Button disabled={isLoading} loading={isLoading}>Submit</Button>
                </Segment>
                
            </Form>
            {errorState.length > 0 && (
                <Message error>
                <h4>Error</h4>
                {formatError()}
                </Message>
                
            )}
            {successState.length > 0 && (
                <Message success>
                <h4>Success</h4>
                {formatSuccess()}
                </Message>
                
            )}
            <Message>
                Already an user? <Link to="/login">Login</Link>
            </Message>
            </Grid.Column>
        </Grid>
        </>
    );
    };

    export default Signup;
