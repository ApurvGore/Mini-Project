import { Alert, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { saveUser } from '../services/UserServices';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", us_name: "", email: "", password: "", dob: new Date("2020-03-25"), gender: "", city: "", state: "", phone: "" });

    const [isSubmitted, setIsSubmitted] = useState(false);

    //cp
    const [errors, setErrors] = useState({
        username: '', us_name: '', email: '', password: '', dob: '', gender: '', city: '', state: '', phone: '',
    });
    //

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {       //cp
            try {
                const result = await saveUser(formData);
                setFormData({ username: "", us_name: "", email: "", password: "", dob: "", gender: "", city: "", state: "", phone: "" });
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    navigate("/signin");
                }, 1500);
                console.log(result.message);
            } catch (error) {
                console.log(error);
            }
        }
    }
    //cp
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      //

    return (
        <Container >
            <Col md={{ span: 3, offset: 5 }}>
                <h3 >Sign Up Here !</h3>
            </Col>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            {/* <Form.Control type="text" value={formData.us_name}  name="us_name" placeholder="Enter full name" onChange={handleChange}/> */}
                            <Form.Control type="text" value={isSubmitted ? formData.us_name : null} name="us_name" placeholder="Enter full name" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            {/* <Form.Control type="email"  name="email" value={formData.email} placeholder="Enter email" onChange={handleChange}/> */}
                            <Form.Control type="email" value={isSubmitted ? formData.email : null} name="email" placeholder="Enter email" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" value={isSubmitted ? formData.phone : null} name="phone" placeholder="Enter Contact Number" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pick a Username</Form.Label>
                            {/* <Form.Control type="text" name="username" value={formData.username}placeholder="Enter Username" onChange={handleChange}/> */}
                            <Form.Control type="text" value={isSubmitted ? formData.username : null} name="username" placeholder="Enter Username" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            {/* <Form.Control type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} /> */}
                            <Form.Control type="password" value={isSubmitted ? formData.password : null} name="password" placeholder="Password" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Of Birth</Form.Label>
                            {/* <Form.Control type="date" name="dob" value={formData.dob} placeholder="date of birth" onChange={handleChange}/> */}
                            <Form.Control type="date" name="dob" value={isSubmitted ? formData.dob : null} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            {/* <Form.Control type="text" name="city"  value={formData.city} placeholder="Enter the city you live in" onChange={handleChange} /> */}
                            <Form.Control type="text" name="city" value={isSubmitted ? formData.city : null} placeholder="Enter the city you live in" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>States</Form.Label>
                            {/* <Form.Control type="text" name="state" value={formData.state} placeholder="Enter the state you live in" onChange={handleChange} /> */}
                            <Form.Control type="text" name="state" value={isSubmitted ? formData.state : null} placeholder="Enter the state you live in" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Col md={{ span: 3, offset: 6 }}>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Col>
            </Form>
            <Row className="mt-3">
                <Col lg={4}>
                    {isSubmitted ? <Alert variant="success">Sign Up Successfully Completed!</Alert> : null}
                </Col>
            </Row>
        </Container>
    );
}