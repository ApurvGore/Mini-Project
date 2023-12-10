import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../services/UserServices.js";

export function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(formData);
            localStorage.setItem("token", result.token);
           console.log(result);
            if(result.message=="LoginFailed" || result.message=="Invalid username or password"){
                console.log(result);
            setLoginError(true);
        }
            else{
                navigate("/myprofile");
           }
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    }
    return (
        <Container style={{ height:455 }} md={{ span: 3, offset: 5 }}>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} required/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                    {loginError ? <Alert variant="danger" className="mt-3">Invalid username or password</Alert> : null}
                </Col><br /><br />
                <Col md={{ span: 4, offset: 4 }}>

                    <p>Not a registered member yet?</p>

                    <Link to="/signup">Click Here to Sign Up</Link>
                </Col>
            </Row>
        </Container>
    );
}